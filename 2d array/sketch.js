// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];

let win = false;
let mult = 1;
let numRows = 4*mult;
let numCols = 5*mult;
let found;
let rectWidth,rectHeight,row,col;
let space = false;

function setup() {
  for(let i = 0; i<numRows;i++){
    grid.push([]);
  }
  rectWidth = 50;
  rectHeight = 50;
  createCanvas(numCols*rectWidth, numRows*rectHeight);
  for(let y = 0; y<numRows;y++){
    for(let x = 0;x<numCols;x++){
      let num = Math.floor(random(2));
      if (num === 0){
        grid[y][x] = 0;
      }
      else{
        grid[y][x] = 255;
      }
    }
  }
  textSize(50);
  textAlign(CENTER);
}

function draw() {
  row = getCurrentY(), col = getCurrentX();
  drawGrid();
  youWon();
  stroke(0);
  noFill();
  rect(0,0,width,height);
  noStroke();
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
}

function mouseClicked(){
  if(keyIsPressed && keyCode===SHIFT){
    flip(col,row);
  }
  else if(space === true){
    sqr( );
  }
  else{
    cross();
  }
  winner(col,row);
}

function cross(){
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

function sqr(){
  flip(col,row);
  if(col<numCols-1){
    flip(col+1,row);
  }
  if(row<numRows-1){
    flip(col,row+1);
  }
  if(row<numRows-1&&col<numCols-1){
    flip(col+1,row+1);
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
function winner(col,row){
  let fin = true;
  if(grid[row][col]===0){
    for (let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if(grid[i][j] === 255){
          fin = false;

        }
      }
    }
  }
  if(grid[row][col]===255){
    for (let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        if(grid[i][j] === 0){
          fin = false;
        }
      }
    }
  }
  if(fin === true){
    win = true;
  }
  else{
    win = false;
  }
}

function youWon(){
  if (grid[row][col]===0){
    fill(255);
  }
  if (grid[row][col]===255){
    fill(0);
  }
  if (win === true){
    
    text("you Win!!",width/2,height/2);
  }
}

function keyPressed(){
  if(key === " "){
    if(space === true){
      space = false;
    }
    else{
      space = true;
    }
  }
}