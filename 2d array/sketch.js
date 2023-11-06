// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [[0,0,255,255,255],[255,0,0,255,0],[255,0,0,255,0],[255,255,0,0,255]];

let numRows = 4;
let numCols = 5;
let rectWidth,rectHeight,row,col;

function setup() {
  rectWidth = 50;
  rectHeight = 50;
  createCanvas(numCols*rectWidth, numRows*rectHeight);
}

function draw() {
  row = getCurY, col = getCurX;
  background(220);
  drawGrid();
}

function getCurY(){
  let consmouseX = constrain(mouseX,0,width);
  return floor(consmouseX-1/rectWidth);
}

function getCurX(){
  let consmouseY = constrain(mouseX, 0,height);
  return floor(consmouseY-1/rectHeight);
}

function drawGrid(){
  for(let x = 0;x<numCols;x++){
    for(let y = 0; y<numRows;y++){
      let fillValue = grid[y][x];
      fill(fillValue);

      rect(x*rectWidth,y*rectHeight,rectWidth,rectHeight);
    }
  }
}