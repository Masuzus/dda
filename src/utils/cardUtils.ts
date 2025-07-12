import { Card, Suit, Rank, SuitDisplay, RankDisplay } from '../types/card';

// 创建单张牌
export function createCard(suit: Suit | null, rank: Rank): Card {
  let display: string;
  
  if (rank === Rank.LITTLE_JOKER || rank === Rank.BIG_JOKER) {
    // 大小王没有花色
    display = RankDisplay[rank];
  } else {
    // 普通牌显示花色和数字
    display = `${SuitDisplay[suit!]}${RankDisplay[rank]}`;
  }
  
  return {
    suit,
    rank,
    display
  };
}

// 生成完整的54张牌堆
export function createFullDeck(): Card[] {
  const deck: Card[] = [];
  
  // 生成52张普通牌
  for (const suit of Object.values(Suit)) {
    for (let rank = Rank.THREE; rank <= Rank.ACE; rank++) {
      deck.push(createCard(suit, rank));
    }
  }
  
  // 添加大小王
  deck.push(createCard(null, Rank.LITTLE_JOKER));
  deck.push(createCard(null, Rank.BIG_JOKER));
  
  return deck;
}

// 洗牌算法（Fisher-Yates shuffle）
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 比较两张牌的大小
export function compareCards(card1: Card, card2: Card): number {
  return card1.rank - card2.rank;
}

// 按牌面值排序
export function sortCards(cards: Card[]): Card[] {
  return [...cards].sort(compareCards);
}

// 将牌转换为字符串（用于显示）
export function cardToString(card: Card): string {
  return card.display;
}

// 将牌数组转换为字符串
export function cardsToString(cards: Card[]): string {
  return cards.map(cardToString).join(' ');
} 