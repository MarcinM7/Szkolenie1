export interface GameState {
    canvasWidth: number;
    canvasHeight: number;
    // ... wszystkie inne pola ze initialState
  }
  
  export type GameAction = 
    | { type: 'INIT_GAME'; payload: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } }
    | { type: 'MOVE_PADDLE'; payload: number }
    | { type: 'UPDATE_GAME' }
    | { type: 'RESET_GAME' }
    | { type: 'START_GAME' };