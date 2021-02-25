import { getCurrentDrawing, upToDate } from './input';
import { renderHTMLUserList } from './htmlController';

let board = [];

let users = {};

let userName = "";

let middlePostion = [0,0]
let scale = 1;

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

export function addMiddlePosition(x,y){
  middlePostion = [middlePostion[0]+x,middlePostion[1]+y]
}

export function getMiddlePosition(){
  return middlePostion;
}

export function addScale(s){
  if(s > 0){
    scale = scale/(10/9);
  }else{
    scale = scale*(10/9);
  }
}

export function addScaleTouch(s){
  if(scale + s > 0){
    scale += s;
  }
}

export function getScale(){
  return scale;
}