import { GameEngine } from '../engine/gameEngine';
import { Card, Suit, Rank } from '../types/card';
import { GameState } from '../logic/gameLogic';
import { cardsToString } from '../utils/cardUtils';

export class GameUI {
  private engine: GameEngine;
  private currentPlayerId: string = 'player_0'; // 当前操作的玩家ID，将动态更新
  private selectedCards: Card[] = [];

  constructor() {
    this.engine = new GameEngine();
    this.setupEventListeners();
    this.setupGameEngineListeners();
  }

  // 设置UI事件监听器
  private setupEventListeners(): void {
    // 开始游戏按钮
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startNewGame());
    }

    // 叫地主按钮
    const callLandlordBtn = document.getElementById('call-landlord-btn');
    if (callLandlordBtn) {
      callLandlordBtn.addEventListener('click', () => this.callLandlord());
    }

    // 不叫地主按钮
    const passLandlordBtn = document.getElementById('pass-landlord-btn');
    if (passLandlordBtn) {
      passLandlordBtn.addEventListener('click', () => this.passLandlord());
    }

    // 出牌按钮
    const playCardsBtn = document.getElementById('play-cards-btn');
    if (playCardsBtn) {
      playCardsBtn.addEventListener('click', () => this.playSelectedCards());
    }

    // 过牌按钮
    const passBtn = document.getElementById('pass-btn');
    if (passBtn) {
      passBtn.addEventListener('click', () => this.pass());
    }

    // 重新开始按钮
    const resetBtn = document.getElementById('reset-game-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetGame());
    }

    // 再来一局按钮
    const newGameBtn = document.getElementById('new-game-btn');
    if (newGameBtn) {
      newGameBtn.addEventListener('click', () => this.startNewGame());
    }
  }

  // 设置游戏引擎事件监听器
  private setupGameEngineListeners(): void {
    this.engine.addEventListener('gameStart', () => {
      console.log('游戏开始');
      this.hideSetupPanel();
      this.showGameBoard();
    });

    this.engine.addEventListener('stateChange', (gameData: any) => {
      this.updateGameDisplay(gameData);
    });

    this.engine.addEventListener('gameEnd', (result: any) => {
      this.showGameResult(result);
    });

    this.engine.addEventListener('error', (error: any) => {
      this.showMessage(error.message, 'error');
    });
  }

  // 开始新游戏
  private startNewGame(): void {
    try {
      const player1Name = (document.getElementById('player1') as HTMLInputElement).value || '玩家1';
      const player2Name = (document.getElementById('player2') as HTMLInputElement).value || '玩家2';
      const player3Name = (document.getElementById('player3') as HTMLInputElement).value || '玩家3';

      const gameData = this.engine.createNewGame('game_1', [player1Name, player2Name, player3Name]);
      this.engine.startGame();
      
      this.hideResultPanel();
      this.showMessage('游戏开始！', 'success');
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 叫地主
  private callLandlord(): void {
    try {
      this.engine.callLandlord(this.currentPlayerId);
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 不叫地主
  private passLandlord(): void {
    try {
      this.engine.passLandlord(this.currentPlayerId);
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 出牌
  private playSelectedCards(): void {
    if (this.selectedCards.length === 0) {
      this.showMessage('请选择要出的牌', 'error');
      return;
    }

    try {
      this.engine.playCards(this.currentPlayerId, this.selectedCards);
      this.selectedCards = [];
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 过牌
  private pass(): void {
    try {
      this.engine.pass(this.currentPlayerId);
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 重置游戏
  private resetGame(): void {
    try {
      this.engine.resetGame();
      this.engine.startGame(); // 重新发牌和开始游戏
      this.selectedCards = [];
      this.showMessage('游戏已重置，重新开始！', 'success');
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 更新游戏显示
  private updateGameDisplay(gameData: any): void {
    this.updateGameStatus(gameData);
    this.updatePlayerInfo(gameData);
    this.updatePlayerCards(gameData);
    this.updateLastPlayedCards(gameData);
    this.updateActionButtons(gameData);
  }

  // 更新游戏状态
  private updateGameStatus(gameData: any): void {
    const gameStateEl = document.getElementById('game-state');
    const currentPlayerEl = document.getElementById('current-player');
    
    if (gameStateEl) {
      let stateText = '';
      switch (gameData.state) {
        case GameState.WAITING:
          stateText = '等待开始';
          break;
        case GameState.BIDDING:
          stateText = '叫地主阶段';
          break;
        case GameState.PLAYING:
          stateText = '游戏进行中';
          break;
        case GameState.FINISHED:
          stateText = '游戏结束';
          break;
      }
      gameStateEl.textContent = stateText;
    }

    if (currentPlayerEl) {
      const currentPlayer = gameData.players[gameData.currentPlayer];
      currentPlayerEl.textContent = `当前玩家: ${currentPlayer ? currentPlayer.name : '无'}`;
    }
  }

  // 更新玩家信息
  private updatePlayerInfo(gameData: any): void {
    gameData.players.forEach((player: any, index: number) => {
      const playerEl = document.getElementById(`player-${index}`);
      if (playerEl && index !== 2) { // 不显示当前玩家（假设当前玩家是第三个）
        const nameEl = playerEl.querySelector('.player-name');
        const cardCountEl = playerEl.querySelector('.card-count');
        const roleEl = playerEl.querySelector('.player-role');
        
        if (nameEl) nameEl.textContent = player.name;
        if (cardCountEl) cardCountEl.textContent = `${player.cards.length}张牌`;
        if (roleEl) roleEl.textContent = player.isLandlord ? '地主' : '';
      }
    });

    // 更新当前玩家信息
    const currentPlayerInfo = document.getElementById('current-player-info');
    if (currentPlayerInfo) {
      const currentPlayer = gameData.players[gameData.currentPlayer];
      const nameEl = currentPlayerInfo.querySelector('.player-name');
      const roleEl = currentPlayerInfo.querySelector('.player-role');
      
      if (nameEl) nameEl.textContent = currentPlayer ? currentPlayer.name : '当前玩家';
      if (roleEl) roleEl.textContent = currentPlayer && currentPlayer.isLandlord ? '地主' : '';
    }
  }

  // 更新玩家手牌
  private updatePlayerCards(gameData: any): void {
    const playerCardsEl = document.getElementById('player-cards');
    if (!playerCardsEl) return;

    // 显示当前活跃玩家的手牌
    const currentPlayer = gameData.players[gameData.currentPlayer];
    if (!currentPlayer) return;

    playerCardsEl.innerHTML = '';
    
    currentPlayer.cards.forEach((card: Card) => {
      const cardEl = this.createCardElement(card);
      cardEl.addEventListener('click', () => this.toggleCardSelection(card, cardEl));
      playerCardsEl.appendChild(cardEl);
    });
  }

  // 创建牌元素
  private createCardElement(card: Card): HTMLElement {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.textContent = card.display;
    
    // 添加颜色样式
    if (card.suit === Suit.HEARTS || card.suit === Suit.DIAMONDS) {
      cardEl.classList.add('red');
    } else if (card.suit === Suit.SPADES || card.suit === Suit.CLUBS) {
      cardEl.classList.add('black');
    } else {
      cardEl.classList.add('joker');
    }
    
    return cardEl;
  }

  // 切换牌的选中状态
  private toggleCardSelection(card: Card, cardEl: HTMLElement): void {
    const index = this.selectedCards.findIndex(c => c.display === card.display);
    
    if (index >= 0) {
      // 取消选中
      this.selectedCards.splice(index, 1);
      cardEl.classList.remove('selected');
    } else {
      // 选中
      this.selectedCards.push(card);
      cardEl.classList.add('selected');
    }
  }

  // 更新上一手牌显示
  private updateLastPlayedCards(gameData: any): void {
    const lastCardsEl = document.getElementById('last-cards');
    const lastPlayerEl = document.getElementById('last-player');
    
    if (lastCardsEl) {
      if (gameData.lastPlayedPattern && gameData.lastPlayedPattern.cards.length > 0) {
        lastCardsEl.innerHTML = '';
        gameData.lastPlayedPattern.cards.forEach((card: Card) => {
          const cardEl = this.createCardElement(card);
          cardEl.style.transform = 'scale(0.8)';
          lastCardsEl.appendChild(cardEl);
        });
      } else {
        lastCardsEl.innerHTML = '<span class="no-cards">暂无</span>';
      }
    }

    if (lastPlayerEl) {
      if (gameData.lastPlayerId) {
        const lastPlayer = gameData.players.find((p: any) => p.id === gameData.lastPlayerId);
        lastPlayerEl.textContent = lastPlayer ? `${lastPlayer.name} 出牌` : '';
      } else {
        lastPlayerEl.textContent = '';
      }
    }
  }

  // 更新操作按钮
  private updateActionButtons(gameData: any): void {
    const callLandlordBtn = document.getElementById('call-landlord-btn');
    const passLandlordBtn = document.getElementById('pass-landlord-btn');
    const playCardsBtn = document.getElementById('play-cards-btn');
    const passBtn = document.getElementById('pass-btn');
    const resetBtn = document.getElementById('reset-game-btn');

    // 隐藏所有按钮
    [callLandlordBtn, passLandlordBtn, playCardsBtn, passBtn, resetBtn].forEach(btn => {
      if (btn) btn.classList.add('hidden');
    });

    // 更新当前操作的玩家ID
    const currentPlayer = gameData.players[gameData.currentPlayer];
    if (currentPlayer) {
      this.currentPlayerId = currentPlayer.id;
    }

    // 在叫地主阶段，显示叫地主按钮
    if (gameData.state === GameState.BIDDING) {
      if (callLandlordBtn) callLandlordBtn.classList.remove('hidden');
      if (passLandlordBtn) passLandlordBtn.classList.remove('hidden');
    } else if (gameData.state === GameState.PLAYING) {
      // 在游戏阶段，显示出牌按钮
      if (playCardsBtn) playCardsBtn.classList.remove('hidden');
      if (passBtn) passBtn.classList.remove('hidden');
    }

    // 在游戏进行中或结束时显示重置按钮
    if (gameData.state === GameState.PLAYING || gameData.state === GameState.FINISHED) {
      if (resetBtn) resetBtn.classList.remove('hidden');
    }
  }

  // 显示游戏结果
  private showGameResult(result: any): void {
    const resultPanel = document.getElementById('result-panel');
    const winnerInfo = document.getElementById('winner-info');
    const gameStats = document.getElementById('game-stats');
    
    if (resultPanel) resultPanel.classList.remove('hidden');
    
    if (winnerInfo && result.winner) {
      const winType = result.isLandlordWin ? '地主获胜' : '农民获胜';
      winnerInfo.textContent = `${result.winner.name} 获胜！（${winType}）`;
    }
    
    if (gameStats) {
      const stats = this.engine.getGameStats();
      gameStats.innerHTML = `
        <p>游戏时长: ${Math.floor(stats.gameTime / 1000)}秒</p>
        <p>总回合数: ${stats.movesCount}</p>
        <p>地主: ${stats.landlord}</p>
      `;
    }
  }

  // 显示消息
  private showMessage(message: string, type: 'success' | 'error' = 'success'): void {
    const messagePanel = document.getElementById('message-panel');
    if (!messagePanel) return;

    messagePanel.textContent = message;
    messagePanel.className = `message-panel ${type} show`;
    
    // 3秒后自动隐藏
    setTimeout(() => {
      messagePanel.classList.remove('show');
    }, 3000);
  }

  // 隐藏设置面板
  private hideSetupPanel(): void {
    const setupPanel = document.getElementById('setup-panel');
    if (setupPanel) setupPanel.classList.add('hidden');
  }

  // 显示游戏面板
  private showGameBoard(): void {
    const gameBoard = document.getElementById('game-board');
    if (gameBoard) gameBoard.classList.remove('hidden');
  }

  // 隐藏结果面板
  private hideResultPanel(): void {
    const resultPanel = document.getElementById('result-panel');
    if (resultPanel) resultPanel.classList.add('hidden');
  }

  // 销毁UI
  public destroy(): void {
    this.engine.destroy();
    this.selectedCards = [];
  }
} 