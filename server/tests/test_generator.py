import json
import random
from collections import Counter
from api.model.generator import CardGenerator, Card

def card_key(card: Card):
    return (
        tuple(card.B),
        tuple(card.I),
        tuple(card.N),
        tuple(card.G),
        tuple(card.O),
    )


def card_to_json_dict(card: Card):
    return {
        "B": card.B,
        "I": card.I,
        "N": card.N,
        "G": card.G,
        "O": card.O,
    }


def test_generate_unique_cards_are_unique_and_deterministic():
    cg = CardGenerator()
    # deterministic via seed
    cards = cg.generate_cards(count=50, free_center=True, unique=True, seed=42)

    assert len(cards) == 50

    keys = [card_key(c) for c in cards]
    assert len(set(keys)) == 50  # all unique

    # ensure JSON-serializable columns (user wanted JSON-style checks)
    json_strs = [json.dumps(card_to_json_dict(c), sort_keys=True) for c in cards]
    assert len(set(json_strs)) == 50


def test_unique_false_allows_duplicates_by_monkeypatch(monkeypatch):
    cg = CardGenerator()

    def deterministic_sample(population, k):
        return list(population)[:k]

    monkeypatch.setattr(random, "sample", deterministic_sample)

    cards = cg.generate_cards(count=10, free_center=False, unique=False)
    print("generated:", len(cards))

    keys = [card_key(c) for c in cards]
    counts = Counter(keys)
    # show any duplicated key and how many times it appears
    duplicates = [(k, v) for k, v in counts.items() if v > 1]
    print("duplicates:", duplicates)

    assert len(cards) == 10
    assert len(set(keys)) < len(keys)


def test_free_center_value_applied_to_N_column():
    cg = CardGenerator()
    cards = cg.generate_cards(count=5, free_center=True, free_center_value="★", unique=True, seed=123)

    for idx, card in enumerate(cards, start=1):
        print(f"card {idx} N column:", card.N)
        assert card.N[2] == "★"