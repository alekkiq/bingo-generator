from flask import request, jsonify, make_response, Response, g
from typing import Optional
from urllib.parse import urlparse
from api.model.generator import Card, CardGenerator
import html


def parse_boolean(value, default = False) -> bool:
    """Parses possible boolean values from `value`

    Args:
        value (Any): value to parse boolean from
        default (bool, optional): fallback default boolean value. Defaults to False.
    
    Returns:
        bool: parsed boolean or `false`
    """
    if value is None:
        return default
    
    v = str(value).strip().lower()
    return v in ("1", "true", "yes", "on")

def parse_integer(value, default = 1) -> int:
    """Parses possible integer values from `value`

    Args:
        value (Any): value to parse integer from
        default (int, optional): fallback default integer value. Defaults to 1.

    Returns:
        int: parsed integer or `1`
    """
    try:
        return int(value)
    except (TypeError, ValueError):
        return default
    
def _is_allowed_image_url(url: str, allowed_hosts: set) -> bool:
    """Checks if an URL is of allowed format

    Args:
        url (str): the URL to check
        allowed_hosts (set): set of allowed hosts

    Returns:
        bool: whether the URL is valid
    """
    try:
        parsed = urlparse(url)
    except Exception:
        return False
    
    if not parsed.scheme and not parsed.netloc and parsed.path.startswith('/static/'):
        return True
    
    if parsed.scheme in ("http", "https") and parsed.netloc:
        host = parsed.netloc.split(':')[0].lower()
        return host in allowed_hosts
    
    return False
    
class CardsController:
    def __init__(self, generator: CardGenerator):
        self.generator = generator
        
    def get_params(self) -> dict:
        """Gets params from a query and normalizes/validates them accordinly

        Returns:
            dict: normalized and validated parameters for the engine
        """
        cards_amount = parse_integer(request.values.get("amount"), 8)
        cards_amount = max(1, min(cards_amount, 500))

        free_center = parse_boolean(request.values.get("free_center"), False)

        free_center_value = request.values.get("free_center_value", None)
        free_center_image = request.values.get("free_center_image", None)

        if getattr(g, "uploaded_free_center", None):
            fc = f'<img src="{html.escape(g.uploaded_free_center)}" alt="free" style="max-width:100%;max-height:100%;display:block;margin:0 auto;">'
        elif free_center_image:
            fc = f'<img src="{html.escape(free_center_image)}" alt="free" style="max-width:100%;max-height:100%;display:block;margin:0 auto;">'
        else:
            fc = free_center_value

        game_number = request.values.get("game_number", None)
        try:
            game_number = int(game_number) if game_number is not None else None
        except (TypeError, ValueError):
            game_number = None

        seed = request.values.get("seed", None)
        try:
            seed = int(seed) if seed is not None else None
        except ValueError:
            seed = None

        unique = parse_boolean(request.values.get("unique"), True)
        cards_per_page = parse_integer(request.values.get("cards_per_page"), 4)
        if cards_per_page not in (1, 2, 4, 6):
            cards_per_page = 4

        title = request.values.get("title", None)
        footer = request.values.get("footer", None)

        return {
            "num": cards_amount,
            "free_center": free_center,
            "free_center_value": fc,
            "unique": unique,
            "seed": seed,
            "cards_per_page": cards_per_page,
            "game_number": game_number,
            "title": title,
            "footer": footer
        }
        
    def json_cards(self) -> Response:
        """Generates cards and returns them in JSON format

        Returns:
            Response: jsonified cards output
        """
        params = self.get_params()
        prev_game_number = getattr(self.generator, "game_number", None)
        prev_title = getattr(self.generator, "title", None)
        prev_footer = getattr(self.generator, "footer", None)

        self.generator.game_number = params.get("game_number", None)
        if params.get("title") is not None:
            self.generator.title = params["title"]
        if params.get("footer") is not None:
            self.generator.footer = params["footer"]

        try:
            cards = self.generator.generate_cards(
                count = params["num"],
                free_center = params["free_center"],
                free_center_value = params["free_center_value"],
                unique = params["unique"],
                seed = params["seed"]
            )

            output = [c.as_matrix() for c in cards]
            return jsonify({"cards": output})
        finally:
            self.generator.game_number = prev_game_number
            if prev_title is not None:
                self.generator.title = prev_title
            if prev_footer is not None:
                self.generator.footer = prev_footer
    
    def html_cards(self) -> Response:
        """Generates cards and returns them in HTML format

        Returns:
            Response: html response containing the print-ready cards
        """
        params = self.get_params()

        prev_game_number = getattr(self.generator, "game_number", None)
        self.generator.game_number = params.get("game_number", None)

        try:
            cards = self.generator.generate_cards(
                count = params["num"],
                free_center = params["free_center"],
                free_center_value = params["free_center_value"],
                unique = params["unique"],
                seed = params["seed"]
            )

            html_output = self.generator.generate_html(cards, cards_per_page = params["cards_per_page"])
            res = make_response(html_output)
            res.headers["Content-Type"] = "text/html; charset=utf-8"

            if parse_boolean(request.args.get("download"), False):
                res.headers["Content-Disposition"] = 'attachment; filename="bingo_cards.html"'

            return res
        finally:
            self.generator.game_number = prev_game_number
            
    def preview_card(self) -> Response:
        """Return a single-card HTML preview using the same CSS as the main HTML output.
        
        Returns:
            Response: html response containing the preview card
        """
        params = self.get_params()

        prev_game_number = getattr(self.generator, "game_number", None)
        self.generator.game_number = params.get("game_number", None)

        try:
            cards = self.generator.generate_cards(
                count = 1,
                free_center = params["free_center"],
                free_center_value = params["free_center_value"],
                unique = False,
                seed = params["seed"]
            )

            card_html = self.generator.card_to_html(cards[0], card_id=1)
            fragment = parse_boolean(request.values.get("fragment", "").lower(), True)
            
            if fragment:
                res = make_response(card_html)
                res.headers["Content-Type"] = "text/html; charset=utf-8"
                return res
            
            css_link = '<link rel="stylesheet" href="/static/bingo.css">'
            html_output = "\n".join([
                "<!DOCTYPE html>",
                "<html>",
                "<head>",
                '<meta charset="utf-8">',
                '<meta name="viewport" content="width=device-width,initial-scale=1">',
                css_link,
                "</head>",
                "<body>",
                card_html,
                "</body>",
                "</html>",
            ])

            res = make_response(html_output)
            res.headers["Content-Type"] = "text/html; charset=utf-8"
            
            return res
        finally:
            self.generator.game_number = prev_game_number