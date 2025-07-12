/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 156:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const gameUI_1 = __webpack_require__(927);
// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    console.log('打大A游戏正在加载...');
    // 创建游戏UI实例
    const gameUI = new gameUI_1.GameUI();
    // 将gameUI实例挂载到window对象上，方便调试
    window.gameUI = gameUI;
    console.log('打大A游戏已加载完成！');
});
// 导出主要类型和函数，方便其他地方使用
__exportStar(__webpack_require__(458), exports);
__exportStar(__webpack_require__(493), exports);
__exportStar(__webpack_require__(709), exports);
__exportStar(__webpack_require__(745), exports);
__exportStar(__webpack_require__(731), exports);
__exportStar(__webpack_require__(927), exports);
__exportStar(__webpack_require__(361), exports);
__exportStar(__webpack_require__(668), exports);


/***/ }),

/***/ 361:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cardsToString = exports.cardToString = exports.sortCards = exports.compareCards = exports.shuffleDeck = exports.createFullDeck = exports.createCard = void 0;
const card_1 = __webpack_require__(458);
// 创建单张牌
function createCard(suit, rank) {
    let display;
    if (rank === card_1.Rank.LITTLE_JOKER || rank === card_1.Rank.BIG_JOKER) {
        // 大小王没有花色
        display = card_1.RankDisplay[rank];
    }
    else {
        // 普通牌显示花色和数字
        display = `${card_1.SuitDisplay[suit]}${card_1.RankDisplay[rank]}`;
    }
    return {
        suit,
        rank,
        display
    };
}
exports.createCard = createCard;
// 生成完整的54张牌堆
function createFullDeck() {
    const deck = [];
    // 生成52张普通牌
    for (const suit of Object.values(card_1.Suit)) {
        for (let rank = card_1.Rank.THREE; rank <= card_1.Rank.ACE; rank++) {
            deck.push(createCard(suit, rank));
        }
    }
    // 添加大小王
    deck.push(createCard(null, card_1.Rank.LITTLE_JOKER));
    deck.push(createCard(null, card_1.Rank.BIG_JOKER));
    return deck;
}
exports.createFullDeck = createFullDeck;
// 洗牌算法（Fisher-Yates shuffle）
function shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
exports.shuffleDeck = shuffleDeck;
// 比较两张牌的大小
function compareCards(card1, card2) {
    return card1.rank - card2.rank;
}
exports.compareCards = compareCards;
// 按牌面值排序
function sortCards(cards) {
    return [...cards].sort(compareCards);
}
exports.sortCards = sortCards;
// 将牌转换为字符串（用于显示）
function cardToString(card) {
    return card.display;
}
exports.cardToString = cardToString;
// 将牌数组转换为字符串
function cardsToString(cards) {
    return cards.map(cardToString).join(' ');
}
exports.cardsToString = cardsToString;


/***/ }),

/***/ 458:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RankDisplay = exports.SuitDisplay = exports.CardType = exports.Rank = exports.Suit = void 0;
// 花色枚举
var Suit;
(function (Suit) {
    Suit["SPADES"] = "spades";
    Suit["HEARTS"] = "hearts";
    Suit["DIAMONDS"] = "diamonds";
    Suit["CLUBS"] = "clubs"; // 梅花
})(Suit = exports.Suit || (exports.Suit = {}));
// 牌面值枚举
var Rank;
(function (Rank) {
    Rank[Rank["THREE"] = 3] = "THREE";
    Rank[Rank["FOUR"] = 4] = "FOUR";
    Rank[Rank["FIVE"] = 5] = "FIVE";
    Rank[Rank["SIX"] = 6] = "SIX";
    Rank[Rank["SEVEN"] = 7] = "SEVEN";
    Rank[Rank["EIGHT"] = 8] = "EIGHT";
    Rank[Rank["NINE"] = 9] = "NINE";
    Rank[Rank["TEN"] = 10] = "TEN";
    Rank[Rank["JACK"] = 11] = "JACK";
    Rank[Rank["QUEEN"] = 12] = "QUEEN";
    Rank[Rank["KING"] = 13] = "KING";
    Rank[Rank["ACE"] = 14] = "ACE";
    Rank[Rank["LITTLE_JOKER"] = 15] = "LITTLE_JOKER";
    Rank[Rank["BIG_JOKER"] = 16] = "BIG_JOKER"; // 大王
})(Rank = exports.Rank || (exports.Rank = {}));
// 牌型枚举
var CardType;
(function (CardType) {
    CardType["SINGLE"] = "single";
    CardType["PAIR"] = "pair";
    CardType["TRIPLE"] = "triple";
    CardType["TRIPLE_WITH_SINGLE"] = "triple_with_single";
    CardType["TRIPLE_WITH_PAIR"] = "triple_with_pair";
    CardType["STRAIGHT"] = "straight";
    CardType["DOUBLE_STRAIGHT"] = "double_straight";
    CardType["TRIPLE_STRAIGHT"] = "triple_straight";
    CardType["FOUR_WITH_TWO"] = "four_with_two";
    CardType["BOMB"] = "bomb";
    CardType["JOKER_BOMB"] = "joker_bomb";
    CardType["INVALID"] = "invalid"; // 无效牌型
})(CardType = exports.CardType || (exports.CardType = {}));
// 花色显示映射
exports.SuitDisplay = {
    [Suit.SPADES]: '♠',
    [Suit.HEARTS]: '♥',
    [Suit.DIAMONDS]: '♦',
    [Suit.CLUBS]: '♣'
};
// 牌面值显示映射
exports.RankDisplay = {
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


/***/ }),

/***/ 493:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.calculateWinRate = exports.createPlayer = exports.PlayerAction = exports.PlayerType = exports.PlayerStatus = void 0;
// 玩家状态枚举
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus["WAITING"] = "waiting";
    PlayerStatus["PLAYING"] = "playing";
    PlayerStatus["FINISHED"] = "finished";
    PlayerStatus["DISCONNECTED"] = "disconnected"; // 断线
})(PlayerStatus = exports.PlayerStatus || (exports.PlayerStatus = {}));
// 玩家类型枚举
var PlayerType;
(function (PlayerType) {
    PlayerType["HUMAN"] = "human";
    PlayerType["AI"] = "ai"; // AI玩家
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));
// 玩家操作枚举
var PlayerAction;
(function (PlayerAction) {
    PlayerAction["PASS"] = "pass";
    PlayerAction["PLAY_CARDS"] = "play_cards";
    PlayerAction["CALL_LANDLORD"] = "call_landlord";
    PlayerAction["GRAB_LANDLORD"] = "grab_landlord"; // 抢地主
})(PlayerAction = exports.PlayerAction || (exports.PlayerAction = {}));
// 创建新玩家的函数
function createPlayer(id, name, type, position) {
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
exports.createPlayer = createPlayer;
// 计算玩家胜率
function calculateWinRate(wins, totalGames) {
    if (totalGames === 0)
        return 0;
    return Math.round((wins / totalGames) * 100 * 100) / 100; // 保留两位小数
}
exports.calculateWinRate = calculateWinRate;


/***/ }),

/***/ 668:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AIPlayer = exports.AIDifficulty = void 0;
const card_1 = __webpack_require__(458);
const cardPattern_1 = __webpack_require__(745);
const cardUtils_1 = __webpack_require__(361);
// AI难度等级
var AIDifficulty;
(function (AIDifficulty) {
    AIDifficulty["EASY"] = "easy";
    AIDifficulty["MEDIUM"] = "medium";
    AIDifficulty["HARD"] = "hard";
})(AIDifficulty = exports.AIDifficulty || (exports.AIDifficulty = {}));
class AIPlayer {
    constructor(playerId, difficulty = AIDifficulty.MEDIUM) {
        this.playerId = playerId;
        this.difficulty = difficulty;
    }
    // 决定是否叫地主
    decideLandlord(gameData) {
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
    decidePlayCards(gameData) {
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
    evaluateHandStrength(cards) {
        let strength = 0;
        const sortedCards = (0, cardUtils_1.sortCards)(cards);
        // 统计各种牌型的数量
        const rankCounts = this.countRanks(sortedCards);
        // 大小王加分
        if (rankCounts.get(card_1.Rank.BIG_JOKER))
            strength += 15;
        if (rankCounts.get(card_1.Rank.LITTLE_JOKER))
            strength += 10;
        // 炸弹加分
        for (const [rank, count] of rankCounts) {
            if (count === 4)
                strength += 20; // 炸弹
            if (count === 3)
                strength += 8; // 三张
            if (count === 2)
                strength += 3; // 对子
        }
        // A和K加分
        if (rankCounts.get(card_1.Rank.ACE))
            strength += rankCounts.get(card_1.Rank.ACE) * 5;
        if (rankCounts.get(card_1.Rank.KING))
            strength += rankCounts.get(card_1.Rank.KING) * 4;
        // 手牌数量少加分（接近胜利）
        if (cards.length <= 5)
            strength += (6 - cards.length) * 10;
        return Math.min(strength, 100);
    }
    // 决定是否叫地主
    shouldCallLandlord(handStrength, gameData) {
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
    findBestFirstPlay(cards) {
        const sortedCards = (0, cardUtils_1.sortCards)(cards);
        // 优先策略：
        // 1. 出单张最小的牌
        // 2. 出对子
        // 3. 出三张
        // 4. 出顺子
        // 尝试出最小的单张
        const smallestCard = sortedCards[0];
        const smallestPattern = (0, cardPattern_1.identifyCardPattern)([smallestCard]);
        if (smallestPattern.type !== card_1.CardType.INVALID) {
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
    findCounterPlay(cards, lastPattern) {
        const sortedCards = (0, cardUtils_1.sortCards)(cards);
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
    findSameTypePlay(cards, lastPattern) {
        const targetType = lastPattern.type;
        const targetPower = lastPattern.power;
        const targetLength = lastPattern.cards.length;
        switch (targetType) {
            case card_1.CardType.SINGLE:
                return this.findBiggerSingle(cards, targetPower);
            case card_1.CardType.PAIR:
                return this.findBiggerPair(cards, targetPower);
            case card_1.CardType.TRIPLE:
                return this.findBiggerTriple(cards, targetPower);
            case card_1.CardType.BOMB:
                return this.findBiggerBomb(cards, targetPower);
            default:
                return [];
        }
    }
    // 找到更大的单张
    findBiggerSingle(cards, targetPower) {
        const singleCards = cards.filter(card => {
            const pattern = (0, cardPattern_1.identifyCardPattern)([card]);
            return pattern.type === card_1.CardType.SINGLE && pattern.power > targetPower;
        });
        if (singleCards.length > 0) {
            // 返回最小的能压制的单张
            const smallest = singleCards.reduce((min, card) => card.rank < min.rank ? card : min);
            return [smallest];
        }
        return [];
    }
    // 找到更大的对子
    findBiggerPair(cards, targetPower) {
        const rankCounts = this.countRanks(cards);
        for (const [rank, count] of rankCounts) {
            if (count >= 2 && rank > targetPower) {
                const pairCards = cards.filter(c => c.rank === rank).slice(0, 2);
                const pattern = (0, cardPattern_1.identifyCardPattern)(pairCards);
                if (pattern.type === card_1.CardType.PAIR) {
                    return pairCards;
                }
            }
        }
        return [];
    }
    // 找到更大的三张
    findBiggerTriple(cards, targetPower) {
        const rankCounts = this.countRanks(cards);
        for (const [rank, count] of rankCounts) {
            if (count >= 3 && rank > targetPower) {
                const tripleCards = cards.filter(c => c.rank === rank).slice(0, 3);
                const pattern = (0, cardPattern_1.identifyCardPattern)(tripleCards);
                if (pattern.type === card_1.CardType.TRIPLE) {
                    return tripleCards;
                }
            }
        }
        return [];
    }
    // 找到更大的炸弹
    findBiggerBomb(cards, targetPower) {
        // 王炸
        const hasLittleJoker = cards.some(c => c.rank === card_1.Rank.LITTLE_JOKER);
        const hasBigJoker = cards.some(c => c.rank === card_1.Rank.BIG_JOKER);
        if (hasLittleJoker && hasBigJoker) {
            const jokers = cards.filter(c => c.rank === card_1.Rank.LITTLE_JOKER || c.rank === card_1.Rank.BIG_JOKER);
            const pattern = (0, cardPattern_1.identifyCardPattern)(jokers);
            if (pattern.type === card_1.CardType.JOKER_BOMB && pattern.power > targetPower) {
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
    findBombPlay(cards) {
        // 王炸
        const hasLittleJoker = cards.some(c => c.rank === card_1.Rank.LITTLE_JOKER);
        const hasBigJoker = cards.some(c => c.rank === card_1.Rank.BIG_JOKER);
        if (hasLittleJoker && hasBigJoker) {
            const jokers = cards.filter(c => c.rank === card_1.Rank.LITTLE_JOKER || c.rank === card_1.Rank.BIG_JOKER);
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
    countRanks(cards) {
        const counts = new Map();
        cards.forEach(card => {
            counts.set(card.rank, (counts.get(card.rank) || 0) + 1);
        });
        return counts;
    }
    // 添加思考延迟（让AI看起来更真实）
    getThinkingDelay() {
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
exports.AIPlayer = AIPlayer;


/***/ }),

/***/ 709:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resetGame = exports.getCurrentPlayer = exports.getGameResult = exports.isGameOver = exports.pass = exports.playCards = exports.passLandlord = exports.callLandlord = exports.dealCards = exports.createGame = exports.GamePhase = exports.GameState = void 0;
const player_1 = __webpack_require__(493);
const cardUtils_1 = __webpack_require__(361);
const cardPattern_1 = __webpack_require__(745);
// 游戏状态枚举
var GameState;
(function (GameState) {
    GameState["WAITING"] = "waiting";
    GameState["BIDDING"] = "bidding";
    GameState["PLAYING"] = "playing";
    GameState["FINISHED"] = "finished";
    GameState["PAUSED"] = "paused"; // 游戏暂停
})(GameState = exports.GameState || (exports.GameState = {}));
// 游戏阶段枚举
var GamePhase;
(function (GamePhase) {
    GamePhase["DEAL_CARDS"] = "deal_cards";
    GamePhase["CALL_LANDLORD"] = "call_landlord";
    GamePhase["PLAY_CARDS"] = "play_cards";
    GamePhase["GAME_OVER"] = "game_over"; // 游戏结束
})(GamePhase = exports.GamePhase || (exports.GamePhase = {}));
// 创建新游戏
function createGame(gameId, players) {
    if (players.length !== 3) {
        throw new Error('打大A需要3个玩家');
    }
    return {
        id: gameId,
        players: players.map(p => ({ ...p, status: player_1.PlayerStatus.WAITING })),
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
exports.createGame = createGame;
// 发牌
function dealCards(game) {
    if (game.state !== GameState.WAITING) {
        throw new Error('游戏状态不正确，无法发牌');
    }
    // 创建并洗牌
    const fullDeck = (0, cardUtils_1.createFullDeck)();
    const shuffledDeck = (0, cardUtils_1.shuffleDeck)(fullDeck);
    // 取出3张地主牌
    game.landlordCards = shuffledDeck.slice(0, 3);
    // 剩余51张牌分给3个玩家，每人17张
    const remainingCards = shuffledDeck.slice(3);
    for (let i = 0; i < 3; i++) {
        const playerCards = remainingCards.slice(i * 17, (i + 1) * 17);
        game.players[i].cards = (0, cardUtils_1.sortCards)(playerCards);
        game.players[i].status = player_1.PlayerStatus.PLAYING;
    }
    // 更新游戏状态
    game.state = GameState.BIDDING;
    game.phase = GamePhase.CALL_LANDLORD;
    game.currentPlayer = 0;
}
exports.dealCards = dealCards;
// 叫地主
function callLandlord(game, playerId) {
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
    player.cards = (0, cardUtils_1.sortCards)(player.cards);
    // 记录操作
    game.moves.push({
        playerId,
        action: player_1.PlayerAction.CALL_LANDLORD,
        timestamp: Date.now()
    });
    // 更新游戏状态
    game.state = GameState.PLAYING;
    game.phase = GamePhase.PLAY_CARDS;
    game.currentPlayer = game.landlordIndex; // 地主先出牌
    return true;
}
exports.callLandlord = callLandlord;
// 不叫地主
function passLandlord(game, playerId) {
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
        action: player_1.PlayerAction.PASS,
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
exports.passLandlord = passLandlord;
// 出牌
function playCards(game, playerId, cards) {
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
    const pattern = (0, cardPattern_1.identifyCardPattern)(cards);
    if (!(0, cardPattern_1.canPlayCards)(cards, game.lastPlayedPattern)) {
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
        action: player_1.PlayerAction.PLAY_CARDS,
        cards: [...cards],
        timestamp: Date.now()
    });
    // 更新游戏状态
    game.lastPlayedPattern = pattern;
    game.lastPlayerId = playerId;
    game.passCount = 0;
    // 检查是否有玩家出完牌
    if (player.cards.length === 0) {
        player.status = player_1.PlayerStatus.FINISHED;
        game.state = GameState.FINISHED;
        game.phase = GamePhase.GAME_OVER;
        return true;
    }
    // 轮到下一个玩家
    game.currentPlayer = (game.currentPlayer + 1) % 3;
    return true;
}
exports.playCards = playCards;
// 过牌
function pass(game, playerId) {
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
        action: player_1.PlayerAction.PASS,
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
exports.pass = pass;
// 检查游戏是否结束
function isGameOver(game) {
    return game.state === GameState.FINISHED;
}
exports.isGameOver = isGameOver;
// 获取游戏结果
function getGameResult(game) {
    if (!isGameOver(game)) {
        return { winner: null, isLandlordWin: false };
    }
    const finishedPlayer = game.players.find(p => p.status === player_1.PlayerStatus.FINISHED);
    if (!finishedPlayer) {
        return { winner: null, isLandlordWin: false };
    }
    return {
        winner: finishedPlayer,
        isLandlordWin: finishedPlayer.isLandlord
    };
}
exports.getGameResult = getGameResult;
// 获取当前玩家
function getCurrentPlayer(game) {
    if (game.currentPlayer >= 0 && game.currentPlayer < game.players.length) {
        return game.players[game.currentPlayer];
    }
    return null;
}
exports.getCurrentPlayer = getCurrentPlayer;
// 重置游戏
function resetGame(game) {
    // 重置玩家状态
    game.players.forEach(player => {
        player.cards = [];
        player.status = player_1.PlayerStatus.WAITING;
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
exports.resetGame = resetGame;


/***/ }),

/***/ 731:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameEngine = void 0;
const player_1 = __webpack_require__(493);
const gameLogic_1 = __webpack_require__(709);
const aiPlayer_1 = __webpack_require__(668);
// 游戏引擎类
class GameEngine {
    constructor() {
        this.game = null;
        this.gameId = '';
        this.eventListeners = new Map();
        this.aiPlayers = new Map();
        this.aiActionTimeout = null;
        // 初始化事件监听器
        this.eventListeners.set('gameStart', []);
        this.eventListeners.set('gameEnd', []);
        this.eventListeners.set('playerMove', []);
        this.eventListeners.set('stateChange', []);
        this.eventListeners.set('error', []);
    }
    // 创建新游戏
    createNewGame(gameId, playerNames, aiDifficulty = aiPlayer_1.AIDifficulty.MEDIUM) {
        if (playerNames.length !== 3) {
            throw new Error('需要3个玩家');
        }
        // 清除之前的AI玩家
        this.aiPlayers.clear();
        if (this.aiActionTimeout) {
            clearTimeout(this.aiActionTimeout);
            this.aiActionTimeout = null;
        }
        // 创建玩家：第一个是人类玩家，后两个是AI
        const players = playerNames.map((name, index) => {
            const playerType = index === 0 ? player_1.PlayerType.HUMAN : player_1.PlayerType.AI;
            return (0, player_1.createPlayer)(`player_${index}`, name, playerType, index);
        });
        // 创建AI玩家实例
        this.aiPlayers.set('player_1', new aiPlayer_1.AIPlayer('player_1', aiDifficulty));
        this.aiPlayers.set('player_2', new aiPlayer_1.AIPlayer('player_2', aiDifficulty));
        // 创建游戏
        this.game = (0, gameLogic_1.createGame)(gameId, players);
        this.gameId = gameId;
        this.emit('gameStart', this.game);
        return this.game;
    }
    // 开始游戏
    startGame() {
        if (!this.game) {
            throw new Error('游戏尚未创建');
        }
        if (this.game.state !== gameLogic_1.GameState.WAITING) {
            throw new Error('游戏已经开始');
        }
        // 发牌
        (0, gameLogic_1.dealCards)(this.game);
        this.emit('stateChange', this.game);
        // 检查是否需要AI操作
        this.scheduleAIAction();
    }
    // 叫地主
    callLandlord(playerId) {
        if (!this.game) {
            throw new Error('游戏尚未创建');
        }
        try {
            const result = (0, gameLogic_1.callLandlord)(this.game, playerId);
            this.emit('playerMove', { playerId, action: 'call_landlord' });
            this.emit('stateChange', this.game);
            // 调度下一个AI操作
            this.checkAndScheduleNextAI();
            return result;
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    // 不叫地主
    passLandlord(playerId) {
        if (!this.game) {
            throw new Error('游戏尚未创建');
        }
        try {
            const result = (0, gameLogic_1.passLandlord)(this.game, playerId);
            this.emit('playerMove', { playerId, action: 'pass_landlord' });
            this.emit('stateChange', this.game);
            // 调度下一个AI操作
            this.checkAndScheduleNextAI();
            return result;
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    // 出牌
    playCards(playerId, cards) {
        if (!this.game) {
            throw new Error('游戏尚未创建');
        }
        try {
            const result = (0, gameLogic_1.playCards)(this.game, playerId, cards);
            this.emit('playerMove', { playerId, action: 'play_cards', cards });
            this.emit('stateChange', this.game);
            // 检查游戏是否结束
            if ((0, gameLogic_1.isGameOver)(this.game)) {
                const gameResult = (0, gameLogic_1.getGameResult)(this.game);
                this.emit('gameEnd', gameResult);
            }
            else {
                // 如果游戏未结束，调度下一个AI操作
                this.checkAndScheduleNextAI();
            }
            return result;
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    // 过牌
    pass(playerId) {
        if (!this.game) {
            throw new Error('游戏尚未创建');
        }
        try {
            const result = (0, gameLogic_1.pass)(this.game, playerId);
            this.emit('playerMove', { playerId, action: 'pass' });
            this.emit('stateChange', this.game);
            // 调度下一个AI操作
            this.checkAndScheduleNextAI();
            return result;
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    // 获取游戏状态
    getGameState() {
        return this.game;
    }
    // 获取当前玩家
    getCurrentPlayer() {
        if (!this.game)
            return null;
        return (0, gameLogic_1.getCurrentPlayer)(this.game);
    }
    // 获取玩家手牌
    getPlayerCards(playerId) {
        if (!this.game)
            return [];
        const player = this.game.players.find(p => p.id === playerId);
        return player ? player.cards : [];
    }
    // 检查是否轮到某个玩家
    isPlayerTurn(playerId) {
        if (!this.game)
            return false;
        const currentPlayer = (0, gameLogic_1.getCurrentPlayer)(this.game);
        return currentPlayer ? currentPlayer.id === playerId : false;
    }
    // 重置游戏
    resetGame() {
        if (!this.game) {
            throw new Error('游戏尚未创建');
        }
        // 清除AI定时器
        if (this.aiActionTimeout) {
            clearTimeout(this.aiActionTimeout);
            this.aiActionTimeout = null;
        }
        (0, gameLogic_1.resetGame)(this.game);
        this.emit('stateChange', this.game);
    }
    // 获取游戏统计信息
    getGameStats() {
        if (!this.game)
            return null;
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
    addEventListener(event, listener) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(listener);
    }
    // 移除事件监听器
    removeEventListener(event, listener) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
    // 触发事件
    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(listener => {
                try {
                    listener(data);
                }
                catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
    // 验证游戏状态
    validateGameState() {
        if (!this.game)
            return false;
        // 检查玩家数量
        if (this.game.players.length !== 3)
            return false;
        // 检查游戏状态的一致性
        switch (this.game.state) {
            case gameLogic_1.GameState.WAITING:
                return this.game.players.every(p => p.cards.length === 0);
            case gameLogic_1.GameState.BIDDING:
                return this.game.players.every(p => p.cards.length === 17) &&
                    this.game.landlordCards.length === 3;
            case gameLogic_1.GameState.PLAYING:
                const landlord = this.game.players.find(p => p.isLandlord);
                return landlord !== undefined && landlord.cards.length === 20;
            case gameLogic_1.GameState.FINISHED:
                return this.game.players.some(p => p.cards.length === 0);
            default:
                return false;
        }
    }
    // 获取可出牌的提示
    getPlayableCards(playerId) {
        if (!this.game)
            return [];
        const player = this.game.players.find(p => p.id === playerId);
        if (!player)
            return [];
        // 这里可以实现AI提示算法
        // 简化版本：返回单张牌
        return player.cards.map(card => [card]);
    }
    // 调度AI操作
    scheduleAIAction() {
        if (!this.game)
            return;
        const currentPlayer = (0, gameLogic_1.getCurrentPlayer)(this.game);
        if (!currentPlayer || currentPlayer.type !== player_1.PlayerType.AI)
            return;
        const aiPlayer = this.aiPlayers.get(currentPlayer.id);
        if (!aiPlayer)
            return;
        // 清除之前的定时器
        if (this.aiActionTimeout) {
            clearTimeout(this.aiActionTimeout);
        }
        // 设置AI思考延迟
        const delay = aiPlayer.getThinkingDelay();
        this.aiActionTimeout = setTimeout(() => {
            this.executeAIAction(currentPlayer.id);
        }, delay);
    }
    // 执行AI操作
    executeAIAction(playerId) {
        if (!this.game)
            return;
        const aiPlayer = this.aiPlayers.get(playerId);
        if (!aiPlayer)
            return;
        try {
            if (this.game.state === gameLogic_1.GameState.BIDDING) {
                // AI叫地主阶段
                const decision = aiPlayer.decideLandlord(this.game);
                if (decision.action === 'call_landlord') {
                    this.callLandlord(playerId);
                }
                else {
                    this.passLandlord(playerId);
                }
            }
            else if (this.game.state === gameLogic_1.GameState.PLAYING) {
                // AI出牌阶段
                const decision = aiPlayer.decidePlayCards(this.game);
                if (decision.action === 'play_cards' && decision.cards) {
                    this.playCards(playerId, decision.cards);
                }
                else {
                    this.pass(playerId);
                }
            }
        }
        catch (error) {
            console.error('AI操作错误:', error);
            // AI操作失败时，默认选择保守策略
            if (this.game.state === gameLogic_1.GameState.BIDDING) {
                this.passLandlord(playerId);
            }
            else if (this.game.state === gameLogic_1.GameState.PLAYING) {
                this.pass(playerId);
            }
        }
    }
    // 检查并调度下一个AI操作
    checkAndScheduleNextAI() {
        // 稍微延迟一下，让UI有时间更新
        setTimeout(() => {
            this.scheduleAIAction();
        }, 100);
    }
    // 销毁游戏引擎
    destroy() {
        // 清除AI定时器
        if (this.aiActionTimeout) {
            clearTimeout(this.aiActionTimeout);
            this.aiActionTimeout = null;
        }
        this.game = null;
        this.gameId = '';
        this.aiPlayers.clear();
        this.eventListeners.clear();
    }
}
exports.GameEngine = GameEngine;


/***/ }),

/***/ 745:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.canPlayCards = exports.compareCardPatterns = exports.identifyCardPattern = void 0;
const card_1 = __webpack_require__(458);
const cardUtils_1 = __webpack_require__(361);
// 统计牌面值出现次数
function countRanks(cards) {
    const counts = new Map();
    cards.forEach(card => {
        counts.set(card.rank, (counts.get(card.rank) || 0) + 1);
    });
    return counts;
}
// 获取相同牌面值的牌
function getCardsByRank(cards, rank) {
    return cards.filter(card => card.rank === rank);
}
// 检查是否是顺子
function isStraight(ranks, minLength = 5) {
    if (ranks.length < minLength)
        return false;
    // 大小王和A不能组成顺子
    if (ranks.some(rank => rank >= card_1.Rank.ACE))
        return false;
    const sortedRanks = [...ranks].sort((a, b) => a - b);
    for (let i = 1; i < sortedRanks.length; i++) {
        if (sortedRanks[i] - sortedRanks[i - 1] !== 1) {
            return false;
        }
    }
    return true;
}
// 识别单张
function identifySingle(cards) {
    if (cards.length !== 1)
        return null;
    return {
        type: card_1.CardType.SINGLE,
        cards: [...cards],
        mainRank: cards[0].rank,
        power: cards[0].rank
    };
}
// 识别对子
function identifyPair(cards) {
    if (cards.length !== 2)
        return null;
    const counts = countRanks(cards);
    const ranks = Array.from(counts.keys());
    if (ranks.length === 1 && counts.get(ranks[0]) === 2) {
        return {
            type: card_1.CardType.PAIR,
            cards: [...cards],
            mainRank: ranks[0],
            power: ranks[0]
        };
    }
    return null;
}
// 识别三张
function identifyTriple(cards) {
    if (cards.length !== 3)
        return null;
    const counts = countRanks(cards);
    const ranks = Array.from(counts.keys());
    if (ranks.length === 1 && counts.get(ranks[0]) === 3) {
        return {
            type: card_1.CardType.TRIPLE,
            cards: [...cards],
            mainRank: ranks[0],
            power: ranks[0]
        };
    }
    return null;
}
// 识别三带一
function identifyTripleWithSingle(cards) {
    if (cards.length !== 4)
        return null;
    const counts = countRanks(cards);
    const ranks = Array.from(counts.keys());
    if (ranks.length === 2) {
        let tripleRank = null;
        let singleRank = null;
        for (const rank of ranks) {
            if (counts.get(rank) === 3) {
                tripleRank = rank;
            }
            else if (counts.get(rank) === 1) {
                singleRank = rank;
            }
        }
        if (tripleRank !== null && singleRank !== null) {
            return {
                type: card_1.CardType.TRIPLE_WITH_SINGLE,
                cards: [...cards],
                mainRank: tripleRank,
                power: tripleRank
            };
        }
    }
    return null;
}
// 识别三带对
function identifyTripleWithPair(cards) {
    if (cards.length !== 5)
        return null;
    const counts = countRanks(cards);
    const ranks = Array.from(counts.keys());
    if (ranks.length === 2) {
        let tripleRank = null;
        let pairRank = null;
        for (const rank of ranks) {
            if (counts.get(rank) === 3) {
                tripleRank = rank;
            }
            else if (counts.get(rank) === 2) {
                pairRank = rank;
            }
        }
        if (tripleRank !== null && pairRank !== null) {
            return {
                type: card_1.CardType.TRIPLE_WITH_PAIR,
                cards: [...cards],
                mainRank: tripleRank,
                power: tripleRank
            };
        }
    }
    return null;
}
// 识别顺子
function identifyStraight(cards) {
    if (cards.length < 5)
        return null;
    const counts = countRanks(cards);
    const ranks = Array.from(counts.keys());
    // 所有牌必须是单张
    if (ranks.some(rank => counts.get(rank) !== 1))
        return null;
    if (isStraight(ranks)) {
        const minRank = Math.min(...ranks);
        return {
            type: card_1.CardType.STRAIGHT,
            cards: (0, cardUtils_1.sortCards)(cards),
            mainRank: minRank,
            power: minRank
        };
    }
    return null;
}
// 识别双顺
function identifyDoubleStraight(cards) {
    if (cards.length < 6 || cards.length % 2 !== 0)
        return null;
    const counts = countRanks(cards);
    const ranks = Array.from(counts.keys());
    // 所有牌必须是对子
    if (ranks.some(rank => counts.get(rank) !== 2))
        return null;
    if (isStraight(ranks, 3)) {
        const minRank = Math.min(...ranks);
        return {
            type: card_1.CardType.DOUBLE_STRAIGHT,
            cards: (0, cardUtils_1.sortCards)(cards),
            mainRank: minRank,
            power: minRank
        };
    }
    return null;
}
// 识别炸弹
function identifyBomb(cards) {
    if (cards.length !== 4)
        return null;
    const counts = countRanks(cards);
    const ranks = Array.from(counts.keys());
    if (ranks.length === 1 && counts.get(ranks[0]) === 4) {
        return {
            type: card_1.CardType.BOMB,
            cards: [...cards],
            mainRank: ranks[0],
            power: ranks[0] + 1000 // 炸弹的威力比普通牌型大
        };
    }
    return null;
}
// 识别王炸
function identifyJokerBomb(cards) {
    if (cards.length !== 2)
        return null;
    const ranks = cards.map(card => card.rank).sort((a, b) => a - b);
    if (ranks[0] === card_1.Rank.LITTLE_JOKER && ranks[1] === card_1.Rank.BIG_JOKER) {
        return {
            type: card_1.CardType.JOKER_BOMB,
            cards: [...cards],
            mainRank: card_1.Rank.BIG_JOKER,
            power: 2000 // 王炸威力最大
        };
    }
    return null;
}
// 主要的牌型识别函数
function identifyCardPattern(cards) {
    if (cards.length === 0) {
        return {
            type: card_1.CardType.INVALID,
            cards: [],
            mainRank: card_1.Rank.THREE,
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
        type: card_1.CardType.INVALID,
        cards: [...cards],
        mainRank: card_1.Rank.THREE,
        power: 0
    };
}
exports.identifyCardPattern = identifyCardPattern;
// 比较两个牌型的大小
function compareCardPatterns(pattern1, pattern2) {
    // 如果类型不同，只有炸弹能压制其他牌型
    if (pattern1.type !== pattern2.type) {
        if (pattern1.type === card_1.CardType.JOKER_BOMB)
            return 1;
        if (pattern2.type === card_1.CardType.JOKER_BOMB)
            return -1;
        if (pattern1.type === card_1.CardType.BOMB && pattern2.type !== card_1.CardType.BOMB)
            return 1;
        if (pattern2.type === card_1.CardType.BOMB && pattern1.type !== card_1.CardType.BOMB)
            return -1;
        return 0; // 其他情况不能比较
    }
    // 相同类型比较威力
    return pattern1.power - pattern2.power;
}
exports.compareCardPatterns = compareCardPatterns;
// 检查是否可以出牌（基于上一手牌）
function canPlayCards(cards, lastPattern) {
    const pattern = identifyCardPattern(cards);
    if (pattern.type === card_1.CardType.INVALID) {
        return false;
    }
    // 如果是第一手牌，任何有效牌型都可以出
    if (!lastPattern) {
        return true;
    }
    // 比较牌型大小
    return compareCardPatterns(pattern, lastPattern) > 0;
}
exports.canPlayCards = canPlayCards;


/***/ }),

/***/ 927:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameUI = void 0;
const gameEngine_1 = __webpack_require__(731);
const card_1 = __webpack_require__(458);
const gameLogic_1 = __webpack_require__(709);
const player_1 = __webpack_require__(493);
const aiPlayer_1 = __webpack_require__(668);
class GameUI {
    constructor() {
        this.humanPlayerId = 'player_0'; // 人类玩家ID（固定为player_0）
        this.selectedCards = [];
        this.engine = new gameEngine_1.GameEngine();
        this.setupEventListeners();
        this.setupGameEngineListeners();
    }
    // 设置UI事件监听器
    setupEventListeners() {
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
    setupGameEngineListeners() {
        this.engine.addEventListener('gameStart', () => {
            console.log('游戏开始');
            this.hideSetupPanel();
            this.showGameBoard();
        });
        this.engine.addEventListener('stateChange', (gameData) => {
            this.updateGameDisplay(gameData);
        });
        this.engine.addEventListener('gameEnd', (result) => {
            this.showGameResult(result);
        });
        this.engine.addEventListener('error', (error) => {
            this.showMessage(error.message, 'error');
        });
    }
    // 开始新游戏
    startNewGame() {
        try {
            const player1Name = document.getElementById('player1').value || '我';
            const player2Name = document.getElementById('player2').value || '电脑1';
            const player3Name = document.getElementById('player3').value || '电脑2';
            // 获取AI难度设置
            const difficultySelect = document.getElementById('ai-difficulty');
            const difficulty = (difficultySelect?.value || 'medium');
            const gameData = this.engine.createNewGame('game_1', [player1Name, player2Name, player3Name], difficulty);
            this.engine.startGame();
            this.hideResultPanel();
            this.showMessage(`游戏开始！AI难度: ${this.getDifficultyText(difficulty)}`, 'success');
        }
        catch (error) {
            this.showMessage(error.message, 'error');
        }
    }
    // 获取难度显示文本
    getDifficultyText(difficulty) {
        switch (difficulty) {
            case aiPlayer_1.AIDifficulty.EASY:
                return '简单';
            case aiPlayer_1.AIDifficulty.MEDIUM:
                return '中等';
            case aiPlayer_1.AIDifficulty.HARD:
                return '困难';
            default:
                return '中等';
        }
    }
    // 叫地主
    callLandlord() {
        try {
            this.engine.callLandlord(this.humanPlayerId);
        }
        catch (error) {
            this.showMessage(error.message, 'error');
        }
    }
    // 不叫地主
    passLandlord() {
        try {
            this.engine.passLandlord(this.humanPlayerId);
        }
        catch (error) {
            this.showMessage(error.message, 'error');
        }
    }
    // 出牌
    playSelectedCards() {
        if (this.selectedCards.length === 0) {
            this.showMessage('请选择要出的牌', 'error');
            return;
        }
        try {
            this.engine.playCards(this.humanPlayerId, this.selectedCards);
            this.selectedCards = [];
        }
        catch (error) {
            this.showMessage(error.message, 'error');
        }
    }
    // 过牌
    pass() {
        try {
            this.engine.pass(this.humanPlayerId);
        }
        catch (error) {
            this.showMessage(error.message, 'error');
        }
    }
    // 重置游戏
    resetGame() {
        try {
            this.engine.resetGame();
            this.engine.startGame(); // 重新发牌和开始游戏
            this.selectedCards = [];
            this.showMessage('游戏已重置，重新开始！', 'success');
        }
        catch (error) {
            this.showMessage(error.message, 'error');
        }
    }
    // 更新游戏显示
    updateGameDisplay(gameData) {
        this.updateGameStatus(gameData);
        this.updatePlayerInfo(gameData);
        this.updatePlayerCards(gameData);
        this.updateLastPlayedCards(gameData);
        this.updateActionButtons(gameData);
    }
    // 更新游戏状态
    updateGameStatus(gameData) {
        const gameStateEl = document.getElementById('game-state');
        const currentPlayerEl = document.getElementById('current-player');
        if (gameStateEl) {
            let stateText = '';
            switch (gameData.state) {
                case gameLogic_1.GameState.WAITING:
                    stateText = '等待开始';
                    break;
                case gameLogic_1.GameState.BIDDING:
                    stateText = '叫地主阶段';
                    break;
                case gameLogic_1.GameState.PLAYING:
                    stateText = '游戏进行中';
                    break;
                case gameLogic_1.GameState.FINISHED:
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
    updatePlayerInfo(gameData) {
        // HTML中有两个AI玩家显示区域：player-0 和 player-1
        // 我们需要显示 gameData.players[1] 和 gameData.players[2]（两个AI玩家）
        const aiPlayers = gameData.players.filter((p) => p.type === player_1.PlayerType.AI);
        // 更新第一个AI玩家（显示在 player-0 区域）
        const firstAiEl = document.getElementById('player-0');
        if (firstAiEl && aiPlayers.length > 0) {
            const firstAi = aiPlayers[0];
            const nameEl = firstAiEl.querySelector('.player-name');
            const cardCountEl = firstAiEl.querySelector('.card-count');
            const roleEl = firstAiEl.querySelector('.player-role');
            if (nameEl)
                nameEl.textContent = `${firstAi.name} (AI)`;
            if (cardCountEl)
                cardCountEl.textContent = `${firstAi.cards.length}张牌`;
            if (roleEl)
                roleEl.textContent = firstAi.isLandlord ? '地主' : '';
        }
        // 更新第二个AI玩家（显示在 player-1 区域）
        const secondAiEl = document.getElementById('player-1');
        if (secondAiEl && aiPlayers.length > 1) {
            const secondAi = aiPlayers[1];
            const nameEl = secondAiEl.querySelector('.player-name');
            const cardCountEl = secondAiEl.querySelector('.card-count');
            const roleEl = secondAiEl.querySelector('.player-role');
            if (nameEl)
                nameEl.textContent = `${secondAi.name} (AI)`;
            if (cardCountEl)
                cardCountEl.textContent = `${secondAi.cards.length}张牌`;
            if (roleEl)
                roleEl.textContent = secondAi.isLandlord ? '地主' : '';
        }
        // 更新人类玩家信息（显示在底部）
        const currentPlayerInfo = document.getElementById('current-player-info');
        if (currentPlayerInfo) {
            const humanPlayer = gameData.players.find((p) => p.id === this.humanPlayerId);
            const nameEl = currentPlayerInfo.querySelector('.player-name');
            const roleEl = currentPlayerInfo.querySelector('.player-role');
            if (nameEl)
                nameEl.textContent = humanPlayer ? humanPlayer.name : '玩家';
            if (roleEl)
                roleEl.textContent = humanPlayer && humanPlayer.isLandlord ? '地主' : '';
        }
    }
    // 更新玩家手牌
    updatePlayerCards(gameData) {
        const playerCardsEl = document.getElementById('player-cards');
        if (!playerCardsEl)
            return;
        // 显示人类玩家（player_0）的手牌
        const humanPlayer = gameData.players.find((p) => p.id === this.humanPlayerId);
        if (!humanPlayer)
            return;
        playerCardsEl.innerHTML = '';
        humanPlayer.cards.forEach((card) => {
            const cardEl = this.createCardElement(card);
            // 只有轮到人类玩家时才允许选择牌
            const currentPlayer = gameData.players[gameData.currentPlayer];
            const isHumanTurn = currentPlayer && currentPlayer.type === player_1.PlayerType.HUMAN;
            if (isHumanTurn) {
                cardEl.addEventListener('click', () => this.toggleCardSelection(card, cardEl));
            }
            else {
                cardEl.style.opacity = '0.7'; // AI回合时手牌变灰
                cardEl.style.cursor = 'not-allowed';
            }
            playerCardsEl.appendChild(cardEl);
        });
    }
    // 创建牌元素
    createCardElement(card) {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.textContent = card.display;
        // 添加颜色样式
        if (card.suit === card_1.Suit.HEARTS || card.suit === card_1.Suit.DIAMONDS) {
            cardEl.classList.add('red');
        }
        else if (card.suit === card_1.Suit.SPADES || card.suit === card_1.Suit.CLUBS) {
            cardEl.classList.add('black');
        }
        else {
            cardEl.classList.add('joker');
        }
        return cardEl;
    }
    // 切换牌的选中状态
    toggleCardSelection(card, cardEl) {
        const index = this.selectedCards.findIndex(c => c.display === card.display);
        if (index >= 0) {
            // 取消选中
            this.selectedCards.splice(index, 1);
            cardEl.classList.remove('selected');
        }
        else {
            // 选中
            this.selectedCards.push(card);
            cardEl.classList.add('selected');
        }
    }
    // 更新上一手牌显示
    updateLastPlayedCards(gameData) {
        const lastCardsEl = document.getElementById('last-cards');
        const lastPlayerEl = document.getElementById('last-player');
        if (lastCardsEl) {
            if (gameData.lastPlayedPattern && gameData.lastPlayedPattern.cards.length > 0) {
                lastCardsEl.innerHTML = '';
                gameData.lastPlayedPattern.cards.forEach((card) => {
                    const cardEl = this.createCardElement(card);
                    cardEl.style.transform = 'scale(0.8)';
                    lastCardsEl.appendChild(cardEl);
                });
            }
            else {
                lastCardsEl.innerHTML = '<span class="no-cards">暂无</span>';
            }
        }
        if (lastPlayerEl) {
            if (gameData.lastPlayerId) {
                const lastPlayer = gameData.players.find((p) => p.id === gameData.lastPlayerId);
                lastPlayerEl.textContent = lastPlayer ? `${lastPlayer.name} 出牌` : '';
            }
            else {
                lastPlayerEl.textContent = '';
            }
        }
    }
    // 更新操作按钮
    updateActionButtons(gameData) {
        const callLandlordBtn = document.getElementById('call-landlord-btn');
        const passLandlordBtn = document.getElementById('pass-landlord-btn');
        const playCardsBtn = document.getElementById('play-cards-btn');
        const passBtn = document.getElementById('pass-btn');
        const resetBtn = document.getElementById('reset-game-btn');
        // 隐藏所有按钮
        [callLandlordBtn, passLandlordBtn, playCardsBtn, passBtn, resetBtn].forEach(btn => {
            if (btn)
                btn.classList.add('hidden');
        });
        // 检查当前玩家是否是人类玩家
        const currentPlayer = gameData.players[gameData.currentPlayer];
        const isHumanTurn = currentPlayer && currentPlayer.type === player_1.PlayerType.HUMAN;
        console.log('按钮状态更新:', {
            gameState: gameData.state,
            currentPlayerId: gameData.currentPlayer,
            currentPlayerType: currentPlayer ? currentPlayer.type : 'none',
            isHumanTurn: isHumanTurn
        });
        // 只有轮到人类玩家时才显示操作按钮
        if (isHumanTurn) {
            if (gameData.state === gameLogic_1.GameState.BIDDING) {
                // 在叫地主阶段，显示叫地主按钮
                if (callLandlordBtn) {
                    callLandlordBtn.classList.remove('hidden');
                    console.log('显示叫地主按钮');
                }
                if (passLandlordBtn) {
                    passLandlordBtn.classList.remove('hidden');
                    console.log('显示不叫地主按钮');
                }
            }
            else if (gameData.state === gameLogic_1.GameState.PLAYING) {
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
        if (gameData.state === gameLogic_1.GameState.PLAYING || gameData.state === gameLogic_1.GameState.FINISHED) {
            if (resetBtn) {
                resetBtn.classList.remove('hidden');
                console.log('显示重置按钮');
            }
        }
    }
    // 显示游戏结果
    showGameResult(result) {
        const resultPanel = document.getElementById('result-panel');
        const winnerInfo = document.getElementById('winner-info');
        const gameStats = document.getElementById('game-stats');
        if (resultPanel)
            resultPanel.classList.remove('hidden');
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
    showMessage(message, type = 'success') {
        const messagePanel = document.getElementById('message-panel');
        if (!messagePanel)
            return;
        messagePanel.textContent = message;
        messagePanel.className = `message-panel ${type} show`;
        // 3秒后自动隐藏
        setTimeout(() => {
            messagePanel.classList.remove('show');
        }, 3000);
    }
    // 隐藏设置面板
    hideSetupPanel() {
        const setupPanel = document.getElementById('setup-panel');
        if (setupPanel)
            setupPanel.classList.add('hidden');
    }
    // 显示游戏面板
    showGameBoard() {
        const gameBoard = document.getElementById('game-board');
        if (gameBoard)
            gameBoard.classList.remove('hidden');
    }
    // 隐藏结果面板
    hideResultPanel() {
        const resultPanel = document.getElementById('result-panel');
        if (resultPanel)
            resultPanel.classList.add('hidden');
    }
    // 销毁UI
    destroy() {
        this.engine.destroy();
        this.selectedCards = [];
    }
}
exports.GameUI = GameUI;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(156);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map