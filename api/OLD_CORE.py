"""
Bingo card generator

Generates bingo cards in HTML format with minimal structure.
Creates multiple cards per A4 page (default 4 per page).

Styling is done via from the CSS file (bingo.css)

Usage:
    python main.py -n 10 -o bingo.html --unique --free-center
Options:
    -n, --num: number of bingo cards to generate (default: 8)
    -o, --output: output HTML file (default: bingo_cards.html)
    --unique: ensure all generated cards are unique (no identical cards)
    --seed: random seed for reproducibility
    -f, --free-center: enable free center tile (default: off)
"""

from pathlib import Path
import random
import argparse

bingo_title = "Joulubingo"
bingo_footer = "KaMAn tekniikan pikkujoulut 2025"
free_center_content = f'<img src="kama.png" alt="KaMA logo">'
cards_per_A4 = 4 # cards per A4 page -> should be 1 or 4

def generate_card(free_center=False):
    """
    Generate one standard 5x5 bingo card (no free center).
    
    :param free_center: if True, the center tile in 'N' column is considered a "free" space.
    """
    ranges = {
        'B': range(1, 16),
        'I': range(16, 31),
        'N': range(31, 46),
        'G': range(46, 61),
        'O': range(61, 76),
    }
    card = {}
    for col, rng in ranges.items():
        if col == 'N' and free_center:
            nums = random.sample(list(rng), 4)
            nums.insert(2, free_center_content)
        else:
            nums = random.sample(list(rng), 5)
        card[col] = nums

    return card


def card_to_html(card, card_id):
    """Return only minimal HTML structure for a bingo card."""
    cols = ['B', 'I', 'N', 'G', 'O']
    rows = []

    for r in range(5):
        rows.append("<tr>" + "".join(f"<td>{card[c][r]}</td>" for c in cols) + "</tr>")

    return f"""
    <div class="card" data-id="{card_id}">
        <div class="card-title">{bingo_title}</div>
        <table class="bingo">
            <thead>
                <tr>
                    {''.join(f'<th>{c}</th>' for c in cols)}
                </tr>
            </thead>
            <tbody>{''.join(rows)}</tbody>
        </table>
        <div class="card-footer">{bingo_footer}</div>
    </div>
    """


def generate_html(cards):
    html_parts = [
        "<!DOCTYPE html>",
        "<html>",
        "<head>",
        "<meta charset='utf-8'>",
        "<title>Bingo Cards</title>",
        "<link rel='stylesheet' href='bingo.css'>",
        "</head>",
        "<body>",
    ]

    for i in range(0, len(cards), cards_per_A4):
        html_parts.append(f'<div class="page cards-{cards_per_A4}">')
        for j, card in enumerate(cards[i:i+cards_per_A4], start=i+1):
            html_parts.append(card_to_html(card, j))
        html_parts.append("</div>")  # end .page

    html_parts.append("</body></html>")

    return "\n".join(html_parts)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-n", "--num", type=int, default=8, help="How many cards to generate")
    parser.add_argument("-o", "--output", type=str, default="bingo_cards.html")
    parser.add_argument("--unique", action="store_true", help="Ensure all generated cards are unique (no identical cards).")
    parser.add_argument("--seed", type=int, help="Random seed for reproducibility")
    parser.add_argument("-f", "--free-center", action="store_true", help="Enable free center tile. Default: off")
    args = parser.parse_args()

    if args.seed:
        random.seed(args.seed)

    if args.unique:
        cards = []
        seen = set()
        attempts = 0
        max_attempts = max(10000, args.num * 100)
        
        while len(cards) < args.num and attempts < max_attempts:
            attempts += 1
            card = generate_card(free_center=args.free_center)
            key = (
                tuple(card['B']),
                tuple(card['I']),
                tuple(card['N']),
                tuple(card['G']),
                tuple(card['O']),
            )
            if key in seen:
                continue
            seen.add(key)
            cards.append(card)
            
        if len(cards) < args.num:
            raise RuntimeError(F"Could not generate enough unique cards after {attempts} attempts")
    else:
        cards = [generate_card(free_center=args.free_center) for _ in range(args.num)]
        
    html_output = generate_html(cards)

    Path(args.output).write_text(html_output, encoding="utf-8")
    print(f"Saved {args.num} cards to {args.output}")

if __name__ == "__main__":
    main()
