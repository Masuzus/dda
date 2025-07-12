import { GameEngine } from '../engine/gameEngine';
import { Card, Suit, Rank } from '../types/card';
import { GameState } from '../logic/gameLogic';
import { PlayerType } from '../types/player';
import { AIDifficulty } from '../ai/aiPlayer';
import { cardsToString } from '../utils/cardUtils';

export class GameUI {
  private engine: GameEngine;
  private humanPlayerId: string = 'player_0'; // 人类玩家ID（固定为player_0）
  private selectedCards: Card[] = [];

  constructor() {
    this.engine = new GameEngine();
    this.setupEventListeners();
    this.setupGameEngineListeners();
  }

  // 设置UI事件监听器
  private setupEventListeners(): void {
    console.log('设置UI事件监听器...');
    
    // 开始游戏按钮
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startNewGame());
      console.log('开始游戏按钮事件已绑定');
    }

    // 叫地主按钮
    const callLandlordBtn = document.getElementById('call-landlord-btn');
    if (callLandlordBtn) {
      callLandlordBtn.addEventListener('click', () => {
        console.log('叫地主按钮被点击');
        this.callLandlord();
      });
      console.log('叫地主按钮事件已绑定');
    }

    // 不叫地主按钮
    const passLandlordBtn = document.getElementById('pass-landlord-btn');
    if (passLandlordBtn) {
      passLandlordBtn.addEventListener('click', () => {
        console.log('不叫地主按钮被点击');
        this.passLandlord();
      });
      console.log('不叫地主按钮事件已绑定');
    }

    // 出牌按钮
    const playCardsBtn = document.getElementById('play-cards-btn');
    if (playCardsBtn) {
      playCardsBtn.addEventListener('click', () => {
        console.log('出牌按钮被点击');
        this.playSelectedCards();
      });
      console.log('出牌按钮事件已绑定');
    }

    // 过牌按钮
    const passBtn = document.getElementById('pass-btn');
    if (passBtn) {
      passBtn.addEventListener('click', () => {
        console.log('过牌按钮被点击');
        this.pass();
      });
      console.log('过牌按钮事件已绑定');
    }

    // 重新开始按钮
    const resetBtn = document.getElementById('reset-game-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        console.log('重新开始按钮被点击');
        this.resetGame();
      });
      console.log('重新开始按钮事件已绑定');
    }

    // 再来一局按钮
    const newGameBtn = document.getElementById('new-game-btn');
    if (newGameBtn) {
      newGameBtn.addEventListener('click', () => {
        console.log('再来一局按钮被点击');
        this.startNewGame();
      });
      console.log('再来一局按钮事件已绑定');
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
      const player1Name = (document.getElementById('player1') as HTMLInputElement).value || '我';
      const player2Name = (document.getElementById('player2') as HTMLInputElement).value || '电脑1';
      const player3Name = (document.getElementById('player3') as HTMLInputElement).value || '电脑2';
      
      // 获取AI难度设置
      const difficultySelect = document.getElementById('ai-difficulty') as HTMLSelectElement;
      const difficulty = (difficultySelect?.value || 'medium') as AIDifficulty;

      const gameData = this.engine.createNewGame('game_1', [player1Name, player2Name, player3Name], difficulty);
      this.engine.startGame();
      
      this.hideResultPanel();
      this.showMessage(`游戏开始！AI难度: ${this.getDifficultyText(difficulty)}`, 'success');
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 获取难度显示文本
  private getDifficultyText(difficulty: AIDifficulty): string {
    switch (difficulty) {
      case AIDifficulty.EASY:
        return '简单';
      case AIDifficulty.MEDIUM:
        return '中等';
      case AIDifficulty.HARD:
        return '困难';
      default:
        return '中等';
    }
  }

  // 叫地主
  private callLandlord(): void {
    try {
      this.engine.callLandlord(this.humanPlayerId);
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 不叫地主
  private passLandlord(): void {
    try {
      this.engine.passLandlord(this.humanPlayerId);
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
      this.engine.playCards(this.humanPlayerId, this.selectedCards);
      this.selectedCards = [];
    } catch (error: any) {
      this.showMessage(error.message, 'error');
    }
  }

  // 过牌
  private pass(): void {
    try {
      this.engine.pass(this.humanPlayerId);
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
    // HTML中有两个AI玩家显示区域：player-0 和 player-1
    // 我们需要显示 gameData.players[1] 和 gameData.players[2]（两个AI玩家）
    
    const aiPlayers = gameData.players.filter((p: any) => p.type === PlayerType.AI);
    
    // 更新第一个AI玩家（显示在 player-0 区域）
    const firstAiEl = document.getElementById('player-0');
    if (firstAiEl && aiPlayers.length > 0) {
      const firstAi = aiPlayers[0];
      const nameEl = firstAiEl.querySelector('.player-name');
      const cardCountEl = firstAiEl.querySelector('.card-count');
      const roleEl = firstAiEl.querySelector('.player-role');
      
      if (nameEl) nameEl.textContent = `${firstAi.name} (AI)`;
      if (cardCountEl) cardCountEl.textContent = `${firstAi.cards.length}张牌`;
      if (roleEl) roleEl.textContent = firstAi.isLandlord ? '地主' : '';
    }
    
    // 更新第二个AI玩家（显示在 player-1 区域）
    const secondAiEl = document.getElementById('player-1');
    if (secondAiEl && aiPlayers.length > 1) {
      const secondAi = aiPlayers[1];
      const nameEl = secondAiEl.querySelector('.player-name');
      const cardCountEl = secondAiEl.querySelector('.card-count');
      const roleEl = secondAiEl.querySelector('.player-role');
      
      if (nameEl) nameEl.textContent = `${secondAi.name} (AI)`;
      if (cardCountEl) cardCountEl.textContent = `${secondAi.cards.length}张牌`;
      if (roleEl) roleEl.textContent = secondAi.isLandlord ? '地主' : '';
    }

    // 更新人类玩家信息（显示在底部）
    const currentPlayerInfo = document.getElementById('current-player-info');
    if (currentPlayerInfo) {
      const humanPlayer = gameData.players.find((p: any) => p.id === this.humanPlayerId);
      const nameEl = currentPlayerInfo.querySelector('.player-name');
      const roleEl = currentPlayerInfo.querySelector('.player-role');
      
      if (nameEl) nameEl.textContent = humanPlayer ? humanPlayer.name : '玩家';
      if (roleEl) roleEl.textContent = humanPlayer && humanPlayer.isLandlord ? '地主' : '';
    }
  }

  // 更新玩家手牌
  private updatePlayerCards(gameData: any): void {
    const playerCardsEl = document.getElementById('player-cards');
    if (!playerCardsEl) return;

    // 显示人类玩家（player_0）的手牌
    const humanPlayer = gameData.players.find((p: any) => p.id === this.humanPlayerId);
    if (!humanPlayer) return;

    playerCardsEl.innerHTML = '';
    
    humanPlayer.cards.forEach((card: Card) => {
      const cardEl = this.createCardElement(card);
      // 只有轮到人类玩家时才允许选择牌
      const currentPlayer = gameData.players[gameData.currentPlayer];
      const isHumanTurn = currentPlayer && currentPlayer.type === PlayerType.HUMAN;
      
      if (isHumanTurn) {
        cardEl.addEventListener('click', () => this.toggleCardSelection(card, cardEl));
      } else {
        cardEl.style.opacity = '0.7'; // AI回合时手牌变灰
        cardEl.style.cursor = 'not-allowed';
      }
      
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

    // 检查当前玩家是否是人类玩家
    const currentPlayer = gameData.players[gameData.currentPlayer];
    const isHumanTurn = currentPlayer && currentPlayer.type === PlayerType.HUMAN;

    console.log('按钮状态更新:', {
      gameState: gameData.state,
      currentPlayerId: gameData.currentPlayer,
      currentPlayerType: currentPlayer ? currentPlayer.type : 'none',
      isHumanTurn: isHumanTurn
    });

    // 只有轮到人类玩家时才显示操作按钮
    if (isHumanTurn) {
      if (gameData.state === GameState.BIDDING) {
        // 在叫地主阶段，显示叫地主按钮
        if (callLandlordBtn) {
          callLandlordBtn.classList.remove('hidden');
          console.log('显示叫地主按钮');
        }
        if (passLandlordBtn) {
          passLandlordBtn.classList.remove('hidden');
          console.log('显示不叫地主按钮');
        }
      } else if (gameData.state === GameState.PLAYING) {
        // 在游戏阶段，显示出牌按钮
        if (playCardsBtn) {
          playCardsBtn.classList.remove('hidden');
          console.log('显示出牌按钮');
        }
        if (passBtn) {
          passBtn.classList.remove('hidden');
          console.log('显示过牌按钮');
        }
      }
    }

    // 在游戏进行中或结束时显示重置按钮
    if (gameData.state === GameState.PLAYING || gameData.state === GameState.FINISHED) {
      if (resetBtn) {
        resetBtn.classList.remove('hidden');
        console.log('显示重置按钮');
      }
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