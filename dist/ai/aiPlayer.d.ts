import { Card } from '../types/card';
import { GameData } from '../logic/gameLogic';
export declare enum AIDifficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export interface AIDecision {
    action: 'call_landlord' | 'pass_landlord' | 'play_cards' | 'pass';
    cards?: Card[];
    confidence: number;
}
export declare class AIPlayer {
    private difficulty;
    private playerId;
    constructor(playerId: string, difficulty?: AIDifficulty);
    decideLandlord(gameData: GameData): AIDecision;
    decidePlayCards(gameData: GameData): AIDecision;
    private evaluateHandStrength;
    private shouldCallLandlord;
    private findBestFirstPlay;
    private findCounterPlay;
    private findSameTypePlay;
    private findBiggerSingle;
    private findBiggerPair;
    private findBiggerTriple;
    private findBiggerBomb;
    private findBombPlay;
    private countRanks;
    getThinkingDelay(): number;
}
