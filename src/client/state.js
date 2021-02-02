import { getCurrentDrawing, upToDate } from './input';

let board = [];


// Handle a newly received game update.
export function processBoardUpdate(update) {
  board = board.concat(update);
  upToDate();
}

export function getCurrentState() {
  return [...board,getCurrentDrawing()];
}