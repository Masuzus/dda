import { Card, CardPattern } from '../types/card';
import { Player, PlayerMove } from '../types/player';
export declare enum GameState {
    WAITING = "waiting",
    BIDDING = "bidding",
    PLAYING = "playing",
    FINISHED = "finished",
    PAUSED = "paused"
}
export declare enum GamePhase {
    DEAL_CARDS = "deal_cards",
    CALL_LANDLORD = "call_landlord",
    PLAY_CARDS = "play_cards",
    GAME_OVER = "game_over"
}
export interface GameData {
    id: string;
    players: Player[];
    deck: Card[];
    landlordCards: Card[];
    currentPlayer: number;
    landlordIndex: number;
    state: GameState;
    phase: GamePhase;
    lastPlayedPattern: CardPattern | null;
    lastPlayerId: string | null;
    moves: PlayerMove[];
    round: number;
    passCount: number;
    startTime: number;
}
export declare function createGame(gameId: string, players: Player[]): GameData;
export declare function dealCards(game: GameData): void;
export declare function callLandlord(game: GameData, playerId: string): boolean;
export declare function passLandlord(game: GameData, playerId: string): boolean;
export declare function playCards(game: GameData, playerId: string, cards: Card[]): boolean;
export declare function pass(game: GameData, playerId: string): boolean;
export declare function isGameOver(game: GameData): boolean;
export declare function getGameResult(game: GameData): {
    winner: Player | null;
    isLandlordWin: boolean;
};
export declare function getCurrentPlayer(game: GameData): Player | null;
export declare function resetGame(game: GameData): void;
