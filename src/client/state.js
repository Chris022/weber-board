import { getCurrentDrawing } from './input';

let board = [];

// Handle a newly received game update.
export function processBoardUpdate(update) {
  board = update;
}

export function getCurrentState() {
  return [...board,getCurrentDrawing()];
}