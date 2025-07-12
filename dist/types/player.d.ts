import { Card } from './card';
export declare enum PlayerStatus {
    WAITING = "waiting",
    PLAYING = "playing",
    FINISHED = "finished",
    DISCONNECTED = "disconnected"
}
export declare enum PlayerType {
    HUMAN = "human",
    AI = "ai"
}
export interface Player {
    id: string;
    name: string;
    type: PlayerType;
    status: PlayerStatus;
    cards: Card[];
    position: number;
    score: number;
    isLandlord: boolean;
    totalGames: number;
    wins: number;
}
export declare enum PlayerAction {
    PASS = "pass",
    PLAY_CARDS = "play_cards",
    CALL_LANDLORD = "call_landlord",
    GRAB_LANDLORD = "grab_landlord"
}
export interface PlayerMove {
    playerId: string;
    action: PlayerAction;
    cards?: Card[];
    timestamp: number;
}
export declare function createPlayer(id: string, name: string, type: PlayerType, position: number): Player;
export interface PlayerStats {
    playerId: string;
    playerName: string;
    totalGames: number;
    wins: number;
    losses: number;
    winRate: number;
    totalScore: number;
    averageScore: number;
}
export declare function calculateWinRate(wins: number, totalGames: number): number;
