import { Card, CardType, CardPattern, Rank } from '../types/card';
import { sortCards } from '../utils/cardUtils';

// 统计牌面值出现次数
function countRanks(cards: Card[]): Map<Rank, number> {
  const counts = new Map<Rank, number>();
  cards.forEach(card => {
    counts.set(card.rank, (counts.get(card.rank) || 0) + 1);
  });
  return counts;
}

// 获取相同牌面值的牌
function getCardsByRank(cards: Card[], rank: Rank): Card[] {
  return cards.filter(card => card.rank === rank);
}

// 检查是否是顺子
function isStraight(ranks: Rank[], minLength: number = 5): boolean {
  if (ranks.length < minLength) return false;
  
  // 大小王和A不能组成顺子
  if (ranks.some(rank => rank >= Rank.ACE)) return false;
  
  const sortedRanks = [...ranks].sort((a, b) => a - b);
  for (let i = 1; i < sortedRanks.length; i++) {
    if (sortedRanks[i] - sortedRanks[i - 1] !== 1) {
      return false;
    }
  }
  return true;
}

// 识别单张
function identifySingle(cards: Card[]): CardPattern | null {
  if (cards.length !== 1) return null;
  
  return {
    type: CardType.SINGLE,
    cards: [...cards],
    mainRank: cards[0].rank,
    power: cards[0].rank
  };
}

// 识别对子
function identifyPair(cards: Card[]): CardPattern | null {
  if (cards.length !== 2) return null;
  
  const counts = countRanks(cards);
  const ranks = Array.from(counts.keys());
  
  if (ranks.length === 1 && counts.get(ranks[0]) === 2) {
    return {
      type: CardType.PAIR,
      cards: [...cards],
      mainRank: ranks[0],
      power: ranks[0]
    };
  }
  
  return null;
}

// 识别三张
function identifyTriple(cards: Card[]): CardPattern | null {
  if (cards.length !== 3) return null;
  
  const counts = countRanks(cards);
  const ranks = Array.from(counts.keys());
  
  if (ranks.length === 1 && counts.get(ranks[0]) === 3) {
    return {
      type: CardType.TRIPLE,
      cards: [...cards],
      mainRank: ranks[0],
      power: ranks[0]
    };
  }
  
  return null;
}

// 识别三带一
function identifyTripleWithSingle(cards: Card[]): CardPattern | null {
  if (cards.length !== 4) return null;
  
  const counts = countRanks(cards);
  const ranks = Array.from(counts.keys());
  
  if (ranks.length === 2) {
    let tripleRank: Rank | null = null;
    let singleRank: Rank | null = null;
    
    for (const rank of ranks) {
      if (counts.get(rank) === 3) {
        tripleRank = rank;
      } else if (counts.get(rank) === 1) {
        singleRank = rank;
      }
    }
    
    if (tripleRank !== null && singleRank !== null) {
      return {
        type: CardType.TRIPLE_WITH_SINGLE,
        cards: [...cards],
        mainRank: tripleRank,
        power: tripleRank
      };
    }
  }
  
  return null;
}

// 识别三带对
function identifyTripleWithPair(cards: Card[]): CardPattern | null {
  if (cards.length !== 5) return null;
  
  const counts = countRanks(cards);
  const ranks = Array.from(counts.keys());
  
  if (ranks.length === 2) {
    let tripleRank: Rank | null = null;
    let pairRank: Rank | null = null;
    
    for (const rank of ranks) {
      if (counts.get(rank) === 3) {
        tripleRank = rank;
      } else if (counts.get(rank) === 2) {
        pairRank = rank;
      }
    }
    
    if (tripleRank !== null && pairRank !== null) {
      return {
        type: CardType.TRIPLE_WITH_PAIR,
        cards: [...cards],
        mainRank: tripleRank,
        power: tripleRank
      };
    }
  }
  
  return null;
}

// 识别顺子
function identifyStraight(cards: Card[]): CardPattern | null {
  if (cards.length < 5) return null;
  
  const counts = countRanks(cards);
  const ranks = Array.from(counts.keys());
  
  // 所有牌必须是单张
  if (ranks.some(rank => counts.get(rank) !== 1)) return null;
  
  if (isStraight(ranks)) {
    const minRank = Math.min(...ranks);
    return {
      type: CardType.STRAIGHT,
      cards: sortCards(cards),
      mainRank: minRank,
      power: minRank
    };
  }
  
  return null;
}

// 识别双顺
function identifyDoubleStraight(cards: Card[]): CardPattern | null {
  if (cards.length < 6 || cards.length % 2 !== 0) return null;
  
  const counts = countRanks(cards);
  const ranks = Array.from(counts.keys());
  
  // 所有牌必须是对子
  if (ranks.some(rank => counts.get(rank) !== 2)) return null;
  
  if (isStraight(ranks, 3)) {
    const minRank = Math.min(...ranks);
    return {
      type: CardType.DOUBLE_STRAIGHT,
      cards: sortCards(cards),
      mainRank: minRank,
      power: minRank
    };
  }
  
  return null;
}

// 识别炸弹
function identifyBomb(cards: Card[]): CardPattern | null {
  if (cards.length !== 4) return null;
  
  const counts = countRanks(cards);
  const ranks = Array.from(counts.keys());
  
  if (ranks.length === 1 && counts.get(ranks[0]) === 4) {
    return {
      type: CardType.BOMB,
      cards: [...cards],
      mainRank: ranks[0],
      power: ranks[0] + 1000  // 炸弹的威力比普通牌型大
    };
  }
  
  return null;
}

// 识别王炸
function identifyJokerBomb(cards: Card[]): CardPattern | null {
  if (cards.length !== 2) return null;
  
  const ranks = cards.map(card => card.rank).sort((a, b) => a - b);
  
  if (ranks[0] === Rank.LITTLE_JOKER && ranks[1] === Rank.BIG_JOKER) {
    return {
      type: CardType.JOKER_BOMB,
      cards: [...cards],
      mainRank: Rank.BIG_JOKER,
      power: 2000  // 王炸威力最大
    };
  }
  
  return null;
}

// 主要的牌型识别函数
export function identifyCardPattern(cards: Card[]): CardPattern {
  if (cards.length === 0) {
    return {
      type: CardType.INVALID,
      cards: [],
      mainRank: Rank.THREE,
      power: 0
    };
  }
  
  // 按优先级尝试识别各种牌型
  const patterns = [
    identifyJokerBomb,
    identifyBomb,
    identifySingle,
    identifyPair,
    identifyTriple,
    identifyTripleWithSingle,
    identifyTripleWithPair,
    identifyStraight,
    identifyDoubleStraight
  ];
  
  for (const identifyFunc of patterns) {
    const result = identifyFunc(cards);
    if (result) {
      return result;
    }
  }
  
  // 如果没有识别出有效牌型，返回无效
  return {
    type: CardType.INVALID,
    cards: [...cards],
    mainRank: Rank.THREE,
    power: 0
  };
}

// 比较两个牌型的大小
export function compareCardPatterns(pattern1: CardPattern, pattern2: CardPattern): number {
  // 如果类型不同，只有炸弹能压制其他牌型
  if (pattern1.type !== pattern2.type) {
    if (pattern1.type === CardType.JOKER_BOMB) return 1;
    if (pattern2.type === CardType.JOKER_BOMB) return -1;
    if (pattern1.type === CardType.BOMB && pattern2.type !== CardType.BOMB) return 1;
    if (pattern2.type === CardType.BOMB && pattern1.type !== CardType.BOMB) return -1;
    return 0;  // 其他情况不能比较
  }
  
  // 相同类型比较威力
  return pattern1.power - pattern2.power;
}

// 检查是否可以出牌（基于上一手牌）
export function canPlayCards(cards: Card[], lastPattern: CardPattern | null): boolean {
  const pattern = identifyCardPattern(cards);
  
  if (pattern.type === CardType.INVALID) {
    return false;
  }
  
  // 如果是第一手牌，任何有效牌型都可以出
  if (!lastPattern) {
    return true;
  }
  
  // 比较牌型大小
  return compareCardPatterns(pattern, lastPattern) > 0;
} 