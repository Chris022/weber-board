import { getCurrentState,getMiddlePosition,getScale,update } from './state';

// Get the canvas graphics context
const canvas = document.getElementById('board-canvas');
const context = canvas.getContext('2d');

let matix = context.getTransform();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function render() {
  update();
  const shapes = getCurrentState();
  if (!shapes) {
    return;
  }

  // Draw background
  renderBackground();

  context.translate(getMiddlePosition()[0]+canvas.width/2,getMiddlePosition()[1]+canvas.height/2)
  context.scale(getScale(),getScale());
  context.translate(-canvas.width/2,-canvas.height/2)
  matix = context.getTransform();

  // Draw shapes
  shapes.forEach(shape => renderShape(shape));

  //context.translate(-getMiddlePosition()[0],-getMiddlePosition()[1])

  context.setTransform(1, 0, 0, 1, 0, 0);
  // Draw ui
  //renderUI();

}

function renderBackground() {
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
}


function renderShape(shape) {
  if(shape != []){
    let points = shape["points"]
    let color = shape["color"]
    
    context.beginPath();
    context.strokeStyle = color;
    //context.moveTo(0,0)
    if(points[0] != undefined){
      context.moveTo(points[0][0],points[0][1])
      points.forEach(point => {
        context.lineTo(point[0],point[1])
        context.moveTo(point[0],point[1])
      })
      context.stroke()
    }
    
  }
  
}

function renderUI() {
  context.fillStyle = "white";
}

function renderMainMenu() {
  renderBackground();
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}

export function getInvertedTransformMatrix(){
  return matix.invertSelf();
}

export function getTransformMatrix(){
  return matix;
}

export function getBounds(){
  return [canvas.width/2,canvas.height/2]
}
