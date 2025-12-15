from flask import request, jsonify, make_response, Response, g
from typing import Optional
from ..model.generator import Card, CardGenerator
import html


def parse_boolean(value, default = False) -> bool:
    """Parses possible boolean values from `value`

    Args:
        value (Any): value to parse boolean from
        default (bool, optional): fallback default boolean value. Defaults to False.
    
    Returns:
        boolean: parsed boolean or `false`
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
    
class CardsController:
    def __init__(self, generator: CardGenerator):
        self.generator = generator
        
    def get_params(self) -> dict:
        """Gets parameters from the query/form and returns them sanitized"""

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

        return {
            "num": cards_amount,
            "free_center": free_center,
            "free_center_value": fc,
            "unique": unique,
            "seed": seed,
            "cards_per_page": cards_per_page,
            "game_number": game_number
        }
        
    def json_cards(self) -> Response:
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

            output = [c.as_matrix() for c in cards]
            return jsonify({"cards": output})
        finally:
            self.generator.game_number = prev_game_number
    
    def html_cards(self) -> Response:
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
            # restore previous value to avoid leaking into other requests
            self.generator.game_number = prev_game_number