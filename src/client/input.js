import { draw } from './networking';

let points = []
let clicked = false;

function onMouseMove(e) {
  if(clicked){
    points.push([e.clientX, e.clientY])
  }
}

function onMouseDown(e) {
  clicked = true;
}

function onMouseUp(e){
  console.log(points);
  draw({"points":points,"color":"red"});
  clicked = false;
  points = []
}

export function getCurrentDrawing() {
  return {"points":points,"color":"red"};
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
