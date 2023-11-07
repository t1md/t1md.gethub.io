// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [[0,0,255,0,255],[255,0,255,0,0],[255,255,0,255,0],[255,255,0,0,255]];

let win = false;
let numRows = 4;
let numCols = 5;
let found;
let rectWidth,rectHeight,row,col;

function setup() {
  rectWidth = 50;
  rectHeight = 50;
  createCanvas(numCols*rectWidth, numRows*rectHeight);
}

function draw() {
  row = getCurrentY(), col = getCurrentX();
  background(220);
  drawGrid();
  print(win);
}

function getCurrentX(){
  let constrainMouseX = constrain(mouseX, 0, width-1);
  return floor(constrainMouseX/rectWidth); 
}

function getCurrentY(){
  let constrainMouseY = constrain(mouseY, 0, height-1);
  return floor(constrainMouseY/rectHeight);
}

function drawGrid(){
  for(let x = 0;x<numCols;x++){
    for(let y = 0; y<numRows;y++){
      let fillValue = grid[y][x];
      fill(fillValue);

      rect(x*rectWidth,y*rectHeight,rectWidth,rectHeight);
    }
  }
  // winner();
}

function mouseClicked(){
  if(keyIsPressed && keyCode===SHIFT){
    flip(col,row);
  }
  else{
    flip(col,row);
    if(col<numCols-1){
      flip(col+1,row);
    }
    if(col>0){
      flip(col-1,row);
    }
    if(row<numRows-1){
      flip(col,row+1);
    }
    if(row>0){
      flip(col,row-1);
    }
  }
}

function flip(col,row){
  if(grid[row][col]===0){
    grid[row][col] = 255;
  }
  else{
    grid[row][col] = 0;
  }
}
