import { Card } from '../types/card';
import { Player, PlayerType, createPlayer } from '../types/player';
import { 
  GameData, 
  GameState, 
  createGame, 
  dealCards, 
  callLandlord, 
  passLandlord, 
  playCards, 
  pass, 
  isGameOver,
  getGameResult,
  getCurrentPlayer,
  resetGame
} from '../logic/gameLogic';

// 游戏引擎类
export class GameEngine {
  private game: GameData | null = null;
  private gameId: string = '';
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    // 初始化事件监听器
    this.eventListeners.set('gameStart', []);
    this.eventListeners.set('gameEnd', []);
    this.eventListeners.set('playerMove', []);
    this.eventListeners.set('stateChange', []);
    this.eventListeners.set('error', []);
  }

  // 创建新游戏
  public createNewGame(gameId: string, playerNames: string[]): GameData {
    if (playerNames.length !== 3) {
      throw new Error('需要3个玩家');
    }

    // 创建玩家
    const players: Player[] = playerNames.map((name, index) => 
      createPlayer(`player_${index}`, name, PlayerType.HUMAN, index)
    );

    // 创建游戏
    this.game = createGame(gameId, players);
    this.gameId = gameId;

    this.emit('gameStart', this.game);
    return this.game;
  }

  // 开始游戏
  public startGame(): void {
    if (!this.game) {
      throw new Error('游戏尚未创建');
    }

    if (this.game.state !== GameState.WAITING) {
      throw new Error('游戏已经开始');
    }

    // 发牌
    dealCards(this.game);
    this.emit('stateChange', this.game);
  }

  // 叫地主
  public callLandlord(playerId: string): boolean {
    if (!this.game) {
      throw new Error('游戏尚未创建');
    }

    try {
      const result = callLandlord(this.game, playerId);
      this.emit('playerMove', { playerId, action: 'call_landlord' });
      this.emit('stateChange', this.game);
      return result;
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  // 不叫地主
  public passLandlord(playerId: string): boolean {
    if (!this.game) {
      throw new Error('游戏尚未创建');
    }

    try {
      const result = passLandlord(this.game, playerId);
      this.emit('playerMove', { playerId, action: 'pass_landlord' });
      this.emit('stateChange', this.game);
      return result;
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  // 出牌
  public playCards(playerId: string, cards: Card[]): boolean {
    if (!this.game) {
      throw new Error('游戏尚未创建');
    }

    try {
      const result = playCards(this.game, playerId, cards);
      this.emit('playerMove', { playerId, action: 'play_cards', cards });
      this.emit('stateChange', this.game);

      // 检查游戏是否结束
      if (isGameOver(this.game)) {
        const gameResult = getGameResult(this.game);
        this.emit('gameEnd', gameResult);
      }

      return result;
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  // 过牌
  public pass(playerId: string): boolean {
    if (!this.game) {
      throw new Error('游戏尚未创建');
    }

    try {
      const result = pass(this.game, playerId);
      this.emit('playerMove', { playerId, action: 'pass' });
      this.emit('stateChange', this.game);
      return result;
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  // 获取游戏状态
  public getGameState(): GameData | null {
    return this.game;
  }

  // 获取当前玩家
  public getCurrentPlayer(): Player | null {
    if (!this.game) return null;
    return getCurrentPlayer(this.game);
  }

  // 获取玩家手牌
  public getPlayerCards(playerId: string): Card[] {
    if (!this.game) return [];
    
    const player = this.game.players.find(p => p.id === playerId);
    return player ? player.cards : [];
  }

  // 检查是否轮到某个玩家
  public isPlayerTurn(playerId: string): boolean {
    if (!this.game) return false;
    
    const currentPlayer = getCurrentPlayer(this.game);
    return currentPlayer ? currentPlayer.id === playerId : false;
  }

  // 重置游戏
  public resetGame(): void {
    if (!this.game) {
      throw new Error('游戏尚未创建');
    }

    resetGame(this.game);
    this.emit('stateChange', this.game);
  }

  // 获取游戏统计信息
  public getGameStats(): any {
    if (!this.game) return null;

    return {
      gameId: this.game.id,
      playersCount: this.game.players.length,
      currentState: this.game.state,
      currentPhase: this.game.phase,
      currentPlayer: this.getCurrentPlayer()?.name || 'Unknown',
      landlord: this.game.players.find(p => p.isLandlord)?.name || 'None',
      movesCount: this.game.moves.length,
      gameTime: Date.now() - this.game.startTime
    };
  }

  // 添加事件监听器
  public addEventListener(event: string, listener: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);
  }

  // 移除事件监听器
  public removeEventListener(event: string, listener: Function): void {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event)!;
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // 触发事件
  private emit(event: string, data?: any): void {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event)!.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  // 验证游戏状态
  public validateGameState(): boolean {
    if (!this.game) return false;

    // 检查玩家数量
    if (this.game.players.length !== 3) return false;

    // 检查游戏状态的一致性
    switch (this.game.state) {
      case GameState.WAITING:
        return this.game.players.every(p => p.cards.length === 0);
      
      case GameState.BIDDING:
        return this.game.players.every(p => p.cards.length === 17) && 
               this.game.landlordCards.length === 3;
      
      case GameState.PLAYING:
        const landlord = this.game.players.find(p => p.isLandlord);
        return landlord !== undefined && landlord.cards.length === 20;
      
      case GameState.FINISHED:
        return this.game.players.some(p => p.cards.length === 0);
      
      default:
        return false;
    }
  }

  // 获取可出牌的提示
  public getPlayableCards(playerId: string): Card[][] {
    if (!this.game) return [];
    
    const player = this.game.players.find(p => p.id === playerId);
    if (!player) return [];

    // 这里可以实现AI提示算法
    // 简化版本：返回单张牌
    return player.cards.map(card => [card]);
  }

  // 销毁游戏引擎
  public destroy(): void {
    this.game = null;
    this.gameId = '';
    this.eventListeners.clear();
  }
} 