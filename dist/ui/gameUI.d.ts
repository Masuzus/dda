export declare class GameUI {
    private engine;
    private humanPlayerId;
    private selectedCards;
    constructor();
    private setupEventListeners;
    private setupGameEngineListeners;
    private startNewGame;
    private getDifficultyText;
    private callLandlord;
    private passLandlord;
    private playSelectedCards;
    private pass;
    private resetGame;
    private updateGameDisplay;
    private updateGameStatus;
    private updatePlayerInfo;
    private updatePlayerCards;
    private createCardElement;
    private toggleCardSelection;
    private updateLastPlayedCards;
    private updateActionButtons;
    private showGameResult;
    private showMessage;
    private hideSetupPanel;
    private showGameBoard;
    private hideResultPanel;
    destroy(): void;
}
