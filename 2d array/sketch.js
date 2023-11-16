// puzzle game
// tim dobson 
// 11/16/2023
//this is a puzzle game which lets you flip the color of the blocks in a
// cross shape or in a 2x2 square with the goal of getting all the squares
// to be one color you can also shift click to change just one square and
// it highlights which shapes you will change with a green 

//global variables
let grid = [];
let win = false;
let mult = 1;
let numRows = 4*mult;
let numCols = 5*mult;
let found;
let rectWidth,rectHeight,row,col;
let space = false;
let overlay;



//creates the locations for the grid then fills the grid with 0 or 255 
// values and creates the canvas
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

//runs most of the functions which draw the grid and figures out if your
// winning and which blocks will be placed next 
function draw() {
  row = getCurrentY(), col = getCurrentX();
  drawGrid();
  youWon();
  overgrid(col,row);
  // draws an outline
  stroke(0);
  noFill();
  rect(0,0,width,height);
  noStroke();

}
// gets the mouses current x position on the grid and which square that is
function getCurrentX(){
  let constrainMouseX = constrain(mouseX, 0, width-1);
  return floor(constrainMouseX/rectWidth); 
}
// gets the mouses current y position on the grid and which square that is
function getCurrentY(){
  let constrainMouseY = constrain(mouseY, 0, height-1);
  return floor(constrainMouseY/rectHeight);
}
//draws the grid and fills according to what the squares should be
function drawGrid(){
  for(let x = 0;x<numCols;x++){
    for(let y = 0; y<numRows;y++){
      let fillValue = grid[y][x];
      fill(fillValue);

      rect(x*rectWidth,y*rectHeight,rectWidth,rectHeight);
    }
  }
}
// flips the squares colors according to if you pressed the space key or 
// if your holding the shift key and checks if the user won
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

// flips the current square and all its immediate neighbours up,down,left,right
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
// flips the squares in a two by two with the current square being the top
// left corner
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

// flips the colors of the square to the opposite color
function flip(col,row){
  if(grid[row][col]===0){
    grid[row][col] = 255;
  }
  else{
    grid[row][col] = 0;
  }
}
// checks if all the squares are the same color
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
// writes a victory message on the middle of the screen in the opposite
// color
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

//if the space key is pressed it changes the value of the space variable
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
// draws a green overlay onto the locations where if you pressed your mouse
// it would change the values of the squares 
function overgrid(col,row){
  fill(0,255,0,120);

  if (keyIsPressed && keyCode === SHIFT){
    rect(rectWidth*col,rectHeight*row,rectWidth,rectHeight);
  } 
  else {
    if(space === false){
      rect(rectWidth*col,rectHeight*row,rectWidth,rectHeight);
      if(col<numCols-1){
        rect(rectWidth*(col+1),rectHeight*row,rectWidth,rectHeight);
      }
      if(col>0){
        rect(rectWidth*(col-1),rectHeight*row,rectWidth,rectHeight);
      }
      if(row<numRows-1){
        rect(rectWidth*col,rectHeight*(row+1),rectWidth,rectHeight);
      }
      if(row>0){
        rect(rectWidth*col,rectHeight*(row-1),rectWidth,rectHeight);
      }
    }
    if(space === true){
      rect(rectWidth*col,rectHeight*row,rectWidth,rectHeight);
      if(col<numCols-1){
        rect(rectWidth*(col+1),rectHeight*row,rectWidth,rectHeight);
      }
      if(row<numRows-1){
        rect(rectWidth*col,rectHeight*(row+1),rectWidth,rectHeight);
      }
      if(row<numRows-1&&col<numCols-1){
        rect(rectWidth*(col+1),rectHeight*(row+1),rectWidth,rectHeight);
      }
    }
  }
}