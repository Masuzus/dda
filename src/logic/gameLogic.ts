import { Card, CardPattern } from '../types/card';
import { Player, PlayerAction, PlayerMove, PlayerStatus } from '../types/player';
import { createFullDeck, shuffleDeck, sortCards } from '../utils/cardUtils';
import { identifyCardPattern, canPlayCards } from './cardPattern';

// 游戏状态枚举
export enum GameState {
  WAITING = 'waiting',          // 等待玩家
  BIDDING = 'bidding',          // 叫地主阶段
  PLAYING = 'playing',          // 游戏进行中
  FINISHED = 'finished',        // 游戏结束
  PAUSED = 'paused'            // 游戏暂停
}

// 游戏阶段枚举
export enum GamePhase {
  DEAL_CARDS = 'deal_cards',    // 发牌
  CALL_LANDLORD = 'call_landlord',  // 叫地主
  PLAY_CARDS = 'play_cards',    // 出牌
  GAME_OVER = 'game_over'       // 游戏结束
}

// 游戏数据结构
export interface GameData {
  id: string;
  players: Player[];
  deck: Card[];
  landlordCards: Card[];        // 地主牌（底牌）
  currentPlayer: number;        // 当前玩家索引
  landlordIndex: number;        // 地主索引
  state: GameState;
  phase: GamePhase;
  lastPlayedPattern: CardPattern | null;  // 上一手出的牌
  lastPlayerId: string | null;   // 上一个出牌的玩家ID
  moves: PlayerMove[];           // 游戏记录
  round: number;                 // 当前回合
  passCount: number;             // 连续过牌次数
  startTime: number;             // 游戏开始时间
}

// 创建新游戏
export function createGame(gameId: string, players: Player[]): GameData {
  if (players.length !== 3) {
    throw new Error('打大A需要3个玩家');
  }
  
  return {
    id: gameId,
    players: players.map(p => ({ ...p, status: PlayerStatus.WAITING })),
    deck: [],
    landlordCards: [],
    currentPlayer: 0,
    landlordIndex: -1,
    state: GameState.WAITING,
    phase: GamePhase.DEAL_CARDS,
    lastPlayedPattern: null,
    lastPlayerId: null,
    moves: [],
    round: 0,
    passCount: 0,
    startTime: Date.now()
  };
}

// 发牌
export function dealCards(game: GameData): void {
  if (game.state !== GameState.WAITING) {
    throw new Error('游戏状态不正确，无法发牌');
  }
  
  // 创建并洗牌
  const fullDeck = createFullDeck();
  const shuffledDeck = shuffleDeck(fullDeck);
  
  // 取出3张地主牌
  game.landlordCards = shuffledDeck.slice(0, 3);
  
  // 剩余51张牌分给3个玩家，每人17张
  const remainingCards = shuffledDeck.slice(3);
  
  for (let i = 0; i < 3; i++) {
    const playerCards = remainingCards.slice(i * 17, (i + 1) * 17);
    game.players[i].cards = sortCards(playerCards);
    game.players[i].status = PlayerStatus.PLAYING;
  }
  
  // 更新游戏状态
  game.state = GameState.BIDDING;
  game.phase = GamePhase.CALL_LANDLORD;
  game.currentPlayer = 0;
}

// 叫地主
export function callLandlord(game: GameData, playerId: string): boolean {
  if (game.state !== GameState.BIDDING) {
    throw new Error('当前不是叫地主阶段');
  }
  
  const player = game.players.find(p => p.id === playerId);
  if (!player) {
    throw new Error('玩家不存在');
  }
  
  const playerIndex = game.players.findIndex(p => p.id === playerId);
  if (playerIndex !== game.currentPlayer) {
    throw new Error('不是当前玩家的回合');
  }
  
  // 设置地主
  game.landlordIndex = playerIndex;
  player.isLandlord = true;
  
  // 将地主牌给地主
  player.cards = [...player.cards, ...game.landlordCards];
  player.cards = sortCards(player.cards);
  
  // 记录操作
  game.moves.push({
    playerId,
    action: PlayerAction.CALL_LANDLORD,
    timestamp: Date.now()
  });
  
  // 更新游戏状态
  game.state = GameState.PLAYING;
  game.phase = GamePhase.PLAY_CARDS;
  game.currentPlayer = game.landlordIndex;  // 地主先出牌
  
  return true;
}

// 不叫地主
export function passLandlord(game: GameData, playerId: string): boolean {
  if (game.state !== GameState.BIDDING) {
    throw new Error('当前不是叫地主阶段');
  }
  
  const player = game.players.find(p => p.id === playerId);
  if (!player) {
    throw new Error('玩家不存在');
  }
  
  const playerIndex = game.players.findIndex(p => p.id === playerId);
  if (playerIndex !== game.currentPlayer) {
    throw new Error('不是当前玩家的回合');
  }
  
  // 记录操作
  game.moves.push({
    playerId,
    action: PlayerAction.PASS,
    timestamp: Date.now()
  });
  
  // 轮到下一个玩家
  game.currentPlayer = (game.currentPlayer + 1) % 3;
  
  // 如果所有玩家都不叫地主，重新开始
  if (game.currentPlayer === 0 && game.landlordIndex === -1) {
    // 简化处理：第一个玩家自动成为地主
    return callLandlord(game, game.players[0].id);
  }
  
  return true;
}

// 出牌
export function playCards(game: GameData, playerId: string, cards: Card[]): boolean {
  if (game.state !== GameState.PLAYING) {
    throw new Error('当前不是出牌阶段');
  }
  
  const player = game.players.find(p => p.id === playerId);
  if (!player) {
    throw new Error('玩家不存在');
  }
  
  const playerIndex = game.players.findIndex(p => p.id === playerId);
  if (playerIndex !== game.currentPlayer) {
    throw new Error('不是当前玩家的回合');
  }
  
  // 验证玩家是否有这些牌
  const playerCardStrings = player.cards.map(c => c.display);
  const playCardStrings = cards.map(c => c.display);
  
  for (const cardStr of playCardStrings) {
    if (!playerCardStrings.includes(cardStr)) {
      throw new Error(`玩家没有牌: ${cardStr}`);
    }
  }
  
  // 检查牌型是否有效
  const pattern = identifyCardPattern(cards);
  if (!canPlayCards(cards, game.lastPlayedPattern)) {
    throw new Error('无效的牌型或牌型过小');
  }
  
  // 从玩家手牌中移除已出的牌
  for (const card of cards) {
    const index = player.cards.findIndex(c => c.display === card.display);
    if (index !== -1) {
      player.cards.splice(index, 1);
    }
  }
  
  // 记录操作
  game.moves.push({
    playerId,
    action: PlayerAction.PLAY_CARDS,
    cards: [...cards],
    timestamp: Date.now()
  });
  
  // 更新游戏状态
  game.lastPlayedPattern = pattern;
  game.lastPlayerId = playerId;
  game.passCount = 0;
  
  // 检查是否有玩家出完牌
  if (player.cards.length === 0) {
    player.status = PlayerStatus.FINISHED;
    game.state = GameState.FINISHED;
    game.phase = GamePhase.GAME_OVER;
    return true;
  }
  
  // 轮到下一个玩家
  game.currentPlayer = (game.currentPlayer + 1) % 3;
  
  return true;
}

// 过牌
export function pass(game: GameData, playerId: string): boolean {
  if (game.state !== GameState.PLAYING) {
    throw new Error('当前不是出牌阶段');
  }
  
  const player = game.players.find(p => p.id === playerId);
  if (!player) {
    throw new Error('玩家不存在');
  }
  
  const playerIndex = game.players.findIndex(p => p.id === playerId);
  if (playerIndex !== game.currentPlayer) {
    throw new Error('不是当前玩家的回合');
  }
  
  // 记录操作
  game.moves.push({
    playerId,
    action: PlayerAction.PASS,
    timestamp: Date.now()
  });
  
  // 更新状态
  game.passCount++;
  
  // 如果连续两个玩家都过牌，清空上一手牌
  if (game.passCount >= 2) {
    game.lastPlayedPattern = null;
    game.lastPlayerId = null;
    game.passCount = 0;
  }
  
  // 轮到下一个玩家
  game.currentPlayer = (game.currentPlayer + 1) % 3;
  
  return true;
}

// 检查游戏是否结束
export function isGameOver(game: GameData): boolean {
  return game.state === GameState.FINISHED;
}

// 获取游戏结果
export function getGameResult(game: GameData): { winner: Player | null; isLandlordWin: boolean } {
  if (!isGameOver(game)) {
    return { winner: null, isLandlordWin: false };
  }
  
  const finishedPlayer = game.players.find(p => p.status === PlayerStatus.FINISHED);
  if (!finishedPlayer) {
    return { winner: null, isLandlordWin: false };
  }
  
  return {
    winner: finishedPlayer,
    isLandlordWin: finishedPlayer.isLandlord
  };
}

// 获取当前玩家
export function getCurrentPlayer(game: GameData): Player | null {
  if (game.currentPlayer >= 0 && game.currentPlayer < game.players.length) {
    return game.players[game.currentPlayer];
  }
  return null;
}

// 重置游戏
export function resetGame(game: GameData): void {
  // 重置玩家状态
  game.players.forEach(player => {
    player.cards = [];
    player.status = PlayerStatus.WAITING;
    player.isLandlord = false;
  });
  
  // 重置游戏数据
  game.deck = [];
  game.landlordCards = [];
  game.currentPlayer = 0;
  game.landlordIndex = -1;
  game.state = GameState.WAITING;
  game.phase = GamePhase.DEAL_CARDS;
  game.lastPlayedPattern = null;
  game.lastPlayerId = null;
  game.moves = [];
  game.round = 0;
  game.passCount = 0;
  game.startTime = Date.now();
} 