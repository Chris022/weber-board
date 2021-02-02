import { getCurrentDrawing, upToDate } from './input';

let board = [];


// Handle a newly received game update.
export function processBoardUpdate(update) {
  let {draw, erase} = update;
  board = board.concat(draw);
  erase.forEach(line => deleteLine(line));
  upToDate();
}

export function getCurrentState() {
  return [...board,getCurrentDrawing()];
}

export function deleteLine(line){
  board = board.filter((l) => JSON.stringify(l)!=JSON.stringify(line))
}