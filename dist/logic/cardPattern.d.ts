import { Card, CardPattern } from '../types/card';
export declare function identifyCardPattern(cards: Card[]): CardPattern;
export declare function compareCardPatterns(pattern1: CardPattern, pattern2: CardPattern): number;
export declare function canPlayCards(cards: Card[], lastPattern: CardPattern | null): boolean;
