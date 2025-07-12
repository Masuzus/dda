export declare enum Suit {
    SPADES = "spades",
    HEARTS = "hearts",
    DIAMONDS = "diamonds",
    CLUBS = "clubs"
}
export declare enum Rank {
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    JACK = 11,
    QUEEN = 12,
    KING = 13,
    ACE = 14,
    LITTLE_JOKER = 15,
    BIG_JOKER = 16
}
export interface Card {
    suit: Suit | null;
    rank: Rank;
    display: string;
}
export declare enum CardType {
    SINGLE = "single",
    PAIR = "pair",
    TRIPLE = "triple",
    TRIPLE_WITH_SINGLE = "triple_with_single",
    TRIPLE_WITH_PAIR = "triple_with_pair",
    STRAIGHT = "straight",
    DOUBLE_STRAIGHT = "double_straight",
    TRIPLE_STRAIGHT = "triple_straight",
    FOUR_WITH_TWO = "four_with_two",
    BOMB = "bomb",
    JOKER_BOMB = "joker_bomb",
    INVALID = "invalid"
}
export interface CardPattern {
    type: CardType;
    cards: Card[];
    mainRank: Rank;
    power: number;
}
export declare const SuitDisplay: Record<Suit, string>;
export declare const RankDisplay: Record<Rank, string>;
