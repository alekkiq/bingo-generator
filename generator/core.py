from dataclasses import dataclass
from typing import Any, Dict, List, Optional, Sequence
import random
import html

@dataclass
class Card:
    B: List[Any]
    I: List[Any]
    N: List[Any]
    G: List[Any]
    O: List[Any]
    
    def as_matrix(self) -> List[List[Any]]:
        return [[self.B[r], self.I[r], self.N[r], self.G[r], self.O[r]] for r in range(5)]
    
class CardGenerator:
    def __init__(
        self,
        bingo_title: str = "BINGO",
        bingo_footer: str = "Good luck!",
        free_center_content: str = "FREE",
        game_number: Optional[int] = 1,
    ):
        self.title = bingo_title
        self.footer = bingo_footer
        self.free_center_content = free_center_content
        self.game_number = game_number
        
    def _single_card(self, free_center: bool = False) -> Card:
        ranges = {
            "B": list(range(1, 16)),
            "I": list(range(16, 31)),
            "N": list(range(31, 46)),
            "G": list(range(46, 61)),
            "O": list(range(61, 76)),
        }
        
        cols: Dict[str, List[Any]] = {}
        
        for col, rng in ranges.items():
            if col == "N" and free_center:
                nums: list[int|str] = random.sample(rng, 4)
                nums.insert(2, self.free_center_content)
            else:
                nums: list[int|str] = random.sample(rng, 5)
                
            cols[col] = nums
            
        print(cols)
        
        return Card(**cols)
    
    def generate_cards(
        self,
        count: int = 8,
        free_center: bool = False,
        free_center_value: Optional[str] = None,
        unique: bool = True,
        seed: Optional[int] = None,
    ) -> List[Card]:
        if seed is not None:
            random.seed(seed)
        
        if free_center_value is not None:
            self.free_center_content = free_center_value
            
        cards: List[Card] = []
        seen = set()

        # force uniqueness
        attempts = 0
        max_attempts = max(10000, count * 1000)
        
        while len(cards) < count and attempts < max_attempts:
            attempts += 1
            card = self._single_card(free_center = free_center)
            
            if unique:
                key = (
                    tuple(card.B),
                    tuple(card.I),
                    tuple(card.N),
                    tuple(card.G),
                    tuple(card.O),
                )
                
                if key in seen:
                    continue
                
                seen.add(key)
                
            cards.append(card)
        
        if len(cards) < count:
            raise RuntimeError("Could not generate the requested number of unique cards.")
        
        return cards
    
    def card_to_html(self, card: Card, card_id: Optional[int] = None) -> str:
        title = self.title if card_id is None 