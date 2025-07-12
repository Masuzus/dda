import { Card, CardType, Rank } from '../types/card';
import { Player } from '../types/player';
import { GameData, GameState } from '../logic/gameLogic';
import { identifyCardPattern, compareCardPatterns } from '../logic/cardPattern';
import { sortCards } from '../utils/cardUtils';

// AI难度等级
export enum AIDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

// AI决策结果
export interface AIDecision {
  action: 'call_landlord' | 'pass_landlord' | 'play_cards' | 'pass';
  cards?: Card[];
  confidence: number; // 决策置信度 0-1
}

export class AIPlayer {
  private difficulty: AIDifficulty;
  private playerId: string;

  constructor(playerId: string, difficulty: AIDifficulty = AIDifficulty.MEDIUM) {
    this.playerId = playerId;
    this.difficulty = difficulty;
  }

  // 决定是否叫地主
  public decideLandlord(gameData: GameData): AIDecision {
    const player = gameData.players.find(p => p.id === this.playerId);
    if (!player) {
      return { action: 'pass_landlord', confidence: 0 };
    }

    const handStrength = this.evaluateHandStrength(player.cards);
    const shouldCall = this.shouldCallLandlord(handStrength, gameData);

    return {
      action: shouldCall ? 'call_landlord' : 'pass_landlord',
      confidence: handStrength / 100
    };
  }

  // 决定出牌
  public decidePlayCards(gameData: GameData): AIDecision {
    const player = gameData.players.find(p => p.id === this.playerId);
    if (!player) {
      return { action: 'pass', confidence: 0 };
    }

    // 如果没有上一手牌，AI可以自由出牌
    if (!gameData.lastPlayedPattern) {
      const bestPlay = this.findBestFirstPlay(player.cards);
      return {
        action: 'play_cards',
        cards: bestPlay,
        confidence: 0.8
      };
    }

    // 尝试找到能够压制上一手牌的牌型
    const counterPlay = this.findCounterPlay(player.cards, gameData.lastPlayedPattern);
    
    if (counterPlay.length > 0) {
      return {
        action: 'play_cards',
        cards: counterPlay,
        confidence: 0.7
      };
    }

    // 无法出牌，选择过牌
    return { action: 'pass', confidence: 0.9 };
  }

  // 评估手牌强度 (0-100)
  private evaluateHandStrength(cards: Card[]): number {
    let strength = 0;
    const sortedCards = sortCards(cards);

    // 统计各种牌型的数量
    const rankCounts = this.countRanks(sortedCards);
    
    // 大小王加分
    if (rankCounts.get(Rank.BIG_JOKER)) strength += 15;
    if (rankCounts.get(Rank.LITTLE_JOKER)) strength += 10;

    // 炸弹加分
    for (const [rank, count] of rankCounts) {
      if (count === 4) strength += 20; // 炸弹
      if (count === 3) strength += 8;  // 三张
      if (count === 2) strength += 3;  // 对子
    }

    // A和K加分
    if (rankCounts.get(Rank.ACE)) strength += rankCounts.get(Rank.ACE)! * 5;
    if (rankCounts.get(Rank.KING)) strength += rankCounts.get(Rank.KING)! * 4;

    // 手牌数量少加分（接近胜利）
    if (cards.length <= 5) strength += (6 - cards.length) * 10;

    return Math.min(strength, 100);
  }

  // 决定是否叫地主
  private shouldCallLandlord(handStrength: number, gameData: GameData): boolean {
    switch (this.difficulty) {
      case AIDifficulty.EASY:
        return handStrength > 60 + Math.random() * 20;
      case AIDifficulty.MEDIUM:
        return handStrength > 45 + Math.random() * 15;
      case AIDifficulty.HARD:
        // 考虑更多因素：位置、已经过的玩家数量等
        const position = gameData.currentPlayer;
        const baseThreshold = 40;
        const positionBonus = position === 0 ? 5 : 0; // 第一个叫地主稍微保守
        return handStrength > baseThreshold + positionBonus + Math.random() * 10;
      default:
        return handStrength > 50;
    }
  }

  // 找到最佳的首次出牌
  private findBestFirstPlay(cards: Card[]): Card[] {
    const sortedCards = sortCards(cards);
    
    // 优先策略：
    // 1. 出单张最小的牌
    // 2. 出对子
    // 3. 出三张
    // 4. 出顺子

    // 尝试出最小的单张
    const smallestCard = sortedCards[0];
    const smallestPattern = identifyCardPattern([smallestCard]);
    
    if (smallestPattern.type !== CardType.INVALID) {
      return [smallestCard];
    }

    // 尝试出对子
    const rankCounts = this.countRanks(sortedCards);
    for (const [rank, count] of rankCounts) {
      if (count >= 2) {
        const pairCards = sortedCards.filter(c => c.rank === rank).slice(0, 2);
        return pairCards;
      }
    }

    // 如果没有更好的选择，出最小的单张
    return [smallestCard];
  }

  // 找到能够压制上一手牌的牌型
  private findCounterPlay(cards: Card[], lastPattern: any): Card[] {
    const sortedCards = sortCards(cards);
    
    // 首先尝试相同类型的更大牌型
    const sameTypePlay = this.findSameTypePlay(sortedCards, lastPattern);
    if (sameTypePlay.length > 0) {
      return sameTypePlay;
    }

    // 尝试用炸弹压制
    const bombPlay = this.findBombPlay(sortedCards);
    if (bombPlay.length > 0) {
      return bombPlay;
    }

    // 无法压制
    return [];
  }

  // 找到相同类型但更大的牌型
  private findSameTypePlay(cards: Card[], lastPattern: any): Card[] {
    const targetType = lastPattern.type;
    const targetPower = lastPattern.power;
    const targetLength = lastPattern.cards.length;

    switch (targetType) {
      case CardType.SINGLE:
        return this.findBiggerSingle(cards, targetPower);
      
      case CardType.PAIR:
        return this.findBiggerPair(cards, targetPower);
      
      case CardType.TRIPLE:
        return this.findBiggerTriple(cards, targetPower);
      
      case CardType.BOMB:
        return this.findBiggerBomb(cards, targetPower);
      
      default:
        return [];
    }
  }

  // 找到更大的单张
  private findBiggerSingle(cards: Card[], targetPower: number): Card[] {
    const singleCards = cards.filter(card => {
      const pattern = identifyCardPattern([card]);
      return pattern.type === CardType.SINGLE && pattern.power > targetPower;
    });
    
    if (singleCards.length > 0) {
      // 返回最小的能压制的单张
      const smallest = singleCards.reduce((min, card) => 
        card.rank < min.rank ? card : min
      );
      return [smallest];
    }
    
    return [];
  }

  // 找到更大的对子
  private findBiggerPair(cards: Card[], targetPower: number): Card[] {
    const rankCounts = this.countRanks(cards);
    
    for (const [rank, count] of rankCounts) {
      if (count >= 2 && rank > targetPower) {
        const pairCards = cards.filter(c => c.rank === rank).slice(0, 2);
        const pattern = identifyCardPattern(pairCards);
        if (pattern.type === CardType.PAIR) {
          return pairCards;
        }
      }
    }
    
    return [];
  }

  // 找到更大的三张
  private findBiggerTriple(cards: Card[], targetPower: number): Card[] {
    const rankCounts = this.countRanks(cards);
    
    for (const [rank, count] of rankCounts) {
      if (count >= 3 && rank > targetPower) {
        const tripleCards = cards.filter(c => c.rank === rank).slice(0, 3);
        const pattern = identifyCardPattern(tripleCards);
        if (pattern.type === CardType.TRIPLE) {
          return tripleCards;
        }
      }
    }
    
    return [];
  }

  // 找到更大的炸弹
  private findBiggerBomb(cards: Card[], targetPower: number): Card[] {
    // 王炸
    const hasLittleJoker = cards.some(c => c.rank === Rank.LITTLE_JOKER);
    const hasBigJoker = cards.some(c => c.rank === Rank.BIG_JOKER);
    
    if (hasLittleJoker && hasBigJoker) {
      const jokers = cards.filter(c => 
        c.rank === Rank.LITTLE_JOKER || c.rank === Rank.BIG_JOKER
      );
      const pattern = identifyCardPattern(jokers);
      if (pattern.type === CardType.JOKER_BOMB && pattern.power > targetPower) {
        return jokers;
      }
    }

    // 普通炸弹
    const rankCounts = this.countRanks(cards);
    for (const [rank, count] of rankCounts) {
      if (count === 4 && rank + 1000 > targetPower) {
        const bombCards = cards.filter(c => c.rank === rank);
        return bombCards;
      }
    }
    
    return [];
  }

  // 找到炸弹（用于压制其他牌型）
  private findBombPlay(cards: Card[]): Card[] {
    // 王炸
    const hasLittleJoker = cards.some(c => c.rank === Rank.LITTLE_JOKER);
    const hasBigJoker = cards.some(c => c.rank === Rank.BIG_JOKER);
    
    if (hasLittleJoker && hasBigJoker) {
      const jokers = cards.filter(c => 
        c.rank === Rank.LITTLE_JOKER || c.rank === Rank.BIG_JOKER
      );
      return jokers;
    }

    // 普通炸弹 - 根据难度决定是否使用
    const rankCounts = this.countRanks(cards);
    for (const [rank, count] of rankCounts) {
      if (count === 4) {
        // 简单AI更倾向于保留炸弹
        if (this.difficulty === AIDifficulty.EASY && Math.random() < 0.7) {
          continue;
        }
        
        const bombCards = cards.filter(c => c.rank === rank);
        return bombCards;
      }
    }
    
    return [];
  }

  // 统计牌面值出现次数
  private countRanks(cards: Card[]): Map<Rank, number> {
    const counts = new Map<Rank, number>();
    cards.forEach(card => {
      counts.set(card.rank, (counts.get(card.rank) || 0) + 1);
    });
    return counts;
  }

  // 添加思考延迟（让AI看起来更真实）
  public getThinkingDelay(): number {
    const baseDelay = 800; // 基础延迟800ms
    const randomDelay = Math.random() * 1200; // 随机0-1200ms
    
    switch (this.difficulty) {
      case AIDifficulty.EASY:
        return baseDelay + randomDelay * 0.5; // 较快
      case AIDifficulty.MEDIUM:
        return baseDelay + randomDelay; // 中等
      case AIDifficulty.HARD:
        return baseDelay + randomDelay * 1.5; // 较慢，表示在思考
      default:
        return baseDelay + randomDelay;
    }
  }
} 