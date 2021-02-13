import { draw } from './networking';
import { checkCollission } from './collision';
import { getCurrentState,addMiddlePosition,getMiddlePosition } from './state';

let points = []
let button = -1;

let lastDrawing = {"points":[],"color":"red"};

function onMouseMove(e) {
  if(button == 0){
    points.push([e.clientX-getMiddlePosition()[0], e.clientY-getMiddlePosition()[1]])
  }if(button == 1){
    addMiddlePosition(e.movementX,e.movementY)
  }else if(button == 2){
    checkCollission([e.clientX-getMiddlePosition()[0], e.clientY-getMiddlePosition()[1]],getCurrentState())
  }
}

function onMouseDown(e) {
  var e = e || window.event;
  points = []
  button = e.button;

  if(button == 2){
    checkCollission([e.clientX-getMiddlePosition()[0], e.clientY-getMiddlePosition()[1]],getCurrentState())
  }
  return false;
}

function onMouseUp(e){
  if(button == 0){
    draw({"points":points,"color":"red"});
    lastDrawing = {"points":points,"color":"red"};
  }
  button = -1;
}

export function getCurrentDrawing() {
  while(button == 0){
    return {"points":points,"color":"red"};
  }
  return lastDrawing;
}

export function upToDate(){
  lastDrawing = {"points":[],"color":"red"};
}

export function startCapturingInput() {
  window.addEventListener('contextmenu',(e)=>e.preventDefault());
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mouseup', onMouseUp);
}
