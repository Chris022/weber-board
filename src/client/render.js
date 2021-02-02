import { getCurrentState } from './state';

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function render() {
  const shapes = getCurrentState();
  if (!shapes) {
    return;
  }

  // Draw background
  renderBackground();


  // Draw shapes
  shapes.forEach(shape => renderShape(shape));

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
