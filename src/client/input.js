import { draw } from './networking';
import { checkCollission } from './collision';
import { getCurrentState,addMiddlePosition,getMiddlePosition,addScale,getScale,addScaleTouch } from './state';
import { getInvertedTransformMatrix,getTransformMatrix } from './render'
import { getColor } from './htmlController'

let points = []
let button = -1;

let lastDrawing = {"points":[],"color":getColor()};

let matrix = {};

function getXY(x,y){
  var newx = x * matrix.a + y * matrix.c + matrix.e;
  var newy = y * matrix.b + y * matrix.d + matrix.f;
  return [newx,newy]
}

export function backToXY(point){
  var x = point[0];
  var y = point[1];
  var im = getInvertedTransformMatrix();
  var newx = x * im.a + y * im.c + im.e;
  var newy = y * im.b + y * im.d + im.f;
  return [newx,newy]
}

let lastTouchX = 0;
let lastTouchY = 0;
let lastDist = 0;

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
  matrix = getInvertedTransformMatrix();
  var e = e || window.event;
  points = []
  button = e.button;

  if(button == 0 && document.getElementById("writeReadButton").innerHTML != "Write"){
    button = 2;
  }

  if(button == 2){
    checkCollission(getXY(e.clientX,e.clientY),getCurrentState())
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


function onTouchMove(e) {
  switch (button) {
    case 0:
      var touch = e.touches[0];
      points.push(getXY(touch.pageX,touch.pageY));
      break;
    case 1: 
      var touch = e.touches[0];
      var touch1 = e.touches[1];
      addMiddlePosition(touch.pageX-lastTouchX,touch.pageY-lastTouchY)

      //handle zoom
      var newDist = Math.sqrt((touch.pageX-touch1.pageX)**2 + (touch.pageY-touch1.pageY)**2)
      addScaleTouch((newDist-lastDist)/100);
      lastTouchX = touch.pageX;
      lastTouchY = touch.pageY;
      lastDist = newDist;
      break;
    case 2:
      var touch = e.touches[0];
      console.log("here")
      checkCollission(getXY(touch.pageX,touch.pageY),getCurrentState())
      break;
  }
}

function onTouchStart(e) {
  matrix = getInvertedTransformMatrix();
  switch (e.touches.length) {
    case 1:
      if(document.getElementById("writeReadButton").innerHTML == "Write"){
        button = 0;
      }else{
        button = 2;
      }

      points = []
      break;
    case 2: 
      button = 1;
      lastTouchX = e.touches[0].pageX;
      lastTouchY = e.touches[0].pageY;
      lastDist = Math.sqrt((e.touches[0].pageX-e.touches[1].pageX)**2 + (e.touches[0].pageY-e.touches[1].pageY)**2);
      break;
  }
}

function onTouchEnd(e){
  if(button == 0){
    draw({"points":points,"color":getColor()});
    lastDrawing = {"points":points,"color":getColor()};
  }
  button = -1;
}



function zoom(e){
  addScale(e.deltaY);
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

  window.addEventListener("touchstart", onTouchStart, false);
  window.addEventListener("touchend", onTouchEnd, false);
  //window.addEventListener("touchcancel", handleCancel, false);
  window.addEventListener("touchmove", onTouchMove, false);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('wheel', zoom)
}
