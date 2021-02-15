import { draw } from './networking';
import { checkCollission } from './collision';
import { getCurrentState,addMiddlePosition,getMiddlePosition,addScale,getScale } from './state';
import { getInvertedTransformMatrix } from './render'
import { getColor } from './htmlController'

let points = []
let button = -1;

let lastDrawing = {"points":[],"color":getColor()};

function getXY(x,y){
  var imatrix = getInvertedTransformMatrix();
  var newx = x * imatrix.a + y * imatrix.c + imatrix.e;
  var newy = y * imatrix.b + y * imatrix.d + imatrix.f;
  return [newx,newy]
}

function onMouseMove(e) {
  if(button == 0){
    points.push(getXY(e.clientX,e.clientY))
  }if(button == 1){
    addMiddlePosition(e.movementX,e.movementY)
  }else if(button == 2){
    checkCollission(getXY(e.clientX,e.clientY),getCurrentState())
  }
}

function onMouseDown(e) {
  var e = e || window.event;
  points = []
  button = e.button;

  if(button == 2){
    checkCollission([getXY(e.clientX,e.clientY)],getCurrentState())
  }
  return false;
}

function onMouseUp(e){
  if(button == 0){
    draw({"points":points,"color":getColor()});
    lastDrawing = {"points":points,"color":getColor()};
  }
  button = -1;
}

function zoom(e){
  addScale(e.deltaY/100);
}

export function getCurrentDrawing() {
  while(button == 0){
    return {"points":points,"color":getColor()};
  }
  return lastDrawing;
}

export function upToDate(){
  lastDrawing = {"points":[],"color":getColor()};
}

export function startCapturingInput() {
  window.addEventListener('contextmenu',(e)=>e.preventDefault());
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('wheel', zoom)
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('wheel', zoom)
}
