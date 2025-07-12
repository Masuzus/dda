// 花色枚举
export enum Suit {
  SPADES = 'spades',    // 黑桃
  HEARTS = 'hearts',    // 红心
  DIAMONDS = 'diamonds', // 方片
  CLUBS = 'clubs'       // 梅花
}

// 牌面值枚举
export enum Rank {
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  JACK = 11,
  QUEEN = 12,
  KING = 13,
  ACE = 14,       // A在打大A中通常是最大的
  LITTLE_JOKER = 15,  // 小王
  BIG_JOKER = 16      // 大王
}

// 牌的接口定义
export interface Card {
  suit: Suit | null;  // 大小王没有花色
  rank: Rank;
  display: string;    // 用于显示的字符串
}

// 牌型枚举
export enum CardType {
  SINGLE = 'single',           // 单张
  PAIR = 'pair',               // 对子
  TRIPLE = 'triple',           // 三张
  TRIPLE_WITH_SINGLE = 'triple_with_single',  // 三带一
  TRIPLE_WITH_PAIR = 'triple_with_pair',      // 三带对
  STRAIGHT = 'straight',       // 顺子
  DOUBLE_STRAIGHT = 'double_straight',        // 双顺
  TRIPLE_STRAIGHT = 'triple_straight',        // 三顺
  FOUR_WITH_TWO = 'four_with_two',           // 四带二
  BOMB = 'bomb',               // 炸弹
  JOKER_BOMB = 'joker_bomb',   // 王炸
  INVALID = 'invalid'          // 无效牌型
}

// 牌型数据结构
export interface CardPattern {
  type: CardType;
  cards: Card[];
  mainRank: Rank;     // 主要牌面值（如三带一中的三）
  power: number;      // 牌力大小，用于比较
}

// 花色显示映射
export const SuitDisplay: Record<Suit, string> = {
  [Suit.SPADES]: '♠',
  [Suit.HEARTS]: '♥',
  [Suit.DIAMONDS]: '♦',
  [Suit.CLUBS]: '♣'
};

// 牌面值显示映射
export const RankDisplay: Record<Rank, string> = {
  [Rank.THREE]: '3',
  [Rank.FOUR]: '4',
  [Rank.FIVE]: '5',
  [Rank.SIX]: '6',
  [Rank.SEVEN]: '7',
  [Rank.EIGHT]: '8',
  [Rank.NINE]: '9',
  [Rank.TEN]: '10',
  [Rank.JACK]: 'J',
  [Rank.QUEEN]: 'Q',
  [Rank.KING]: 'K',
  [Rank.ACE]: 'A',
  [Rank.LITTLE_JOKER]: '小王',
  [Rank.BIG_JOKER]: '大王'
}; 