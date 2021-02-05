import { getCurrentDrawing, upToDate } from './input';
import { renderHTMLUserList } from './htmlController';

let board = [];

let users = {};

let userName = "";

export function setUserName(name){
  userName = name;
}

export function getUserName(){
  return userName;
}

export function processBoardUpdate(update) {
  let {draw, erase} = update;
  board = board.concat(draw);
  erase.forEach(line => deleteLine(line));
  upToDate();
}

export function processUserUpdate(newUsers) {
  users = newUsers;
  renderHTMLUserList(users);
}

export function getCurrentState() {
  return [...board,getCurrentDrawing()];
}

export function deleteLine(line){
  board = board.filter((l) => JSON.stringify(l)!=JSON.stringify(line))
}