import { GameUI } from './ui/gameUI';

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  console.log('打大A游戏正在加载...');
  
  // 创建游戏UI实例
  const gameUI = new GameUI();
  
  // 将gameUI实例挂载到window对象上，方便调试
  (window as any).gameUI = gameUI;
  
  console.log('打大A游戏已加载完成！');
});

// 导出主要类型和函数，方便其他地方使用
export * from './types/card';
export * from './types/player';
export * from './logic/gameLogic';
export * from './logic/cardPattern';
export * from './engine/gameEngine';
export * from './ui/gameUI';
export * from './utils/cardUtils';
export * from './ai/aiPlayer'; 