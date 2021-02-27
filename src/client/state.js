import { getCurrentDrawing, upToDate } from './input';
import { renderHTMLUserList } from './htmlController';
import { backToXY } from './input';

import { getBounds } from './render'

let board = [];

let users = {};

let userName = "";

let middlePostion = [0,0]
let endMiddlePosition = [0,0]
let scale = 1;

export function setUserName(name){
  userName = name;
}

export function getUserName(){
  return userName;
}

export function processBoardUpdate(update) {
  let {draw, erase} = update;

  //if the presentationmode is enabled, alwas set center the last written Element
  if(document.getElementById("presentationButton").innerHTML == "End Presentation Mode"){
    let xy = (draw[0].points[draw[0].points.length - 1]);
    endMiddlePosition = [-xy[0]+getBounds()[0],-xy[1]+getBounds()[1]];
  }


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

export function update(){
  const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  if(!equals(middlePostion,endMiddlePosition)){
    middlePostion[0] += (endMiddlePosition[0] - middlePostion[0]) /10;
    middlePostion[1] += (endMiddlePosition[1] - middlePostion[1]) /10;
  }
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