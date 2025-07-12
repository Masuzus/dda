import { Card } from '../types/card';
import { Player } from '../types/player';
import { GameData } from '../logic/gameLogic';
export declare class GameEngine {
    private game;
    private gameId;
    private eventListeners;
    constructor();
    createNewGame(gameId: string, playerNames: string[]): GameData;
    startGame(): void;
    callLandlord(playerId: string): boolean;
    passLandlord(playerId: string): boolean;
    playCards(playerId: string, cards: Card[]): boolean;
    pass(playerId: string): boolean;
    getGameState(): GameData | null;
    getCurrentPlayer(): Player | null;
    getPlayerCards(playerId: string): Card[];
    isPlayerTurn(playerId: string): boolean;
    resetGame(): void;
    getGameStats(): any;
    addEventListener(event: string, listener: Function): void;
    removeEventListener(event: string, listener: Function): void;
    private emit;
    validateGameState(): boolean;
    getPlayableCards(playerId: string): Card[][];
    destroy(): void;
}
