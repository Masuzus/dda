import { Card, Suit, Rank } from '../types/card';
export declare function createCard(suit: Suit | null, rank: Rank): Card;
export declare function createFullDeck(): Card[];
export declare function shuffleDeck(deck: Card[]): Card[];
export declare function compareCards(card1: Card, card2: Card): number;
export declare function sortCards(cards: Card[]): Card[];
export declare function cardToString(card: Card): string;
export declare function cardsToString(cards: Card[]): string;
