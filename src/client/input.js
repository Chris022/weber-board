import { draw } from './networking';

let points = []
let clicked = false;

let lastDrawing = {"points":[],"color":"red"};

function onMouseMove(e) {
  if(clicked){
    points.push([e.clientX, e.clientY])
  }
}

function onMouseDown(e) {
  points = []
  clicked = true;
}

function onMouseUp(e){
  console.log(points);
  draw({"points":points,"color":"red"});
  lastDrawing = {"points":points,"color":"red"};
  clicked = false;
}

export function getCurrentDrawing() {
  while(clicked == true){
    return {"points":points,"color":"red"};
  }
  return lastDrawing;
}

export function upToDate(){
  lastDrawing = {"points":[],"color":"red"};
}

export function startCapturingInput() {
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mouseup', onMouseUp);
}
