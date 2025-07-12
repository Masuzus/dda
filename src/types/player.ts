import { Card } from './card';

// 玩家状态枚举
export enum PlayerStatus {
  WAITING = 'waiting',          // 等待中
  PLAYING = 'playing',          // 游戏中
  FINISHED = 'finished',        // 已出完牌
  DISCONNECTED = 'disconnected' // 断线
}

// 玩家类型枚举
export enum PlayerType {
  HUMAN = 'human',      // 人类玩家
  AI = 'ai'             // AI玩家
}

// 玩家接口
export interface Player {
  id: string;
  name: string;
  type: PlayerType;
  status: PlayerStatus;
  cards: Card[];              // 手牌
  position: number;           // 座位号（0-3）
  score: number;              // 得分
  isLandlord: boolean;        // 是否是地主
  totalGames: number;         // 总局数
  wins: number;               // 胜利次数
}

// 玩家操作枚举
export enum PlayerAction {
  PASS = 'pass',              // 不出
  PLAY_CARDS = 'play_cards',  // 出牌
  CALL_LANDLORD = 'call_landlord',  // 叫地主
  GRAB_LANDLORD = 'grab_landlord'   // 抢地主
}

// 玩家操作数据
export interface PlayerMove {
  playerId: string;
  action: PlayerAction;
  cards?: Card[];             // 出的牌（如果是出牌操作）
  timestamp: number;          // 操作时间戳
}

// 创建新玩家的函数
export function createPlayer(
  id: string,
  name: string,
  type: PlayerType,
  position: number
): Player {
  return {
    id,
    name,
    type,
    status: PlayerStatus.WAITING,
    cards: [],
    position,
    score: 0,
    isLandlord: false,
    totalGames: 0,
    wins: 0
  };
}

// 玩家统计信息
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

// 计算玩家胜率
export function calculateWinRate(wins: number, totalGames: number): number {
  if (totalGames === 0) return 0;
  return Math.round((wins / totalGames) * 100 * 100) / 100; // 保留两位小数
} 