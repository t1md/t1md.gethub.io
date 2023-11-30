// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




let grid =[];
let numRows = 15;
let numCols = 15;
let rectWidth, rectHeight;
let row,col;
let defence = [];

function setup() {
  for(let i = 0; i<numRows;i++){
    grid.push([]);
  }
  rectWidth = 75;
  rectHeight = 75;
  createCanvas(numCols*rectWidth+200, numRows*rectHeight);
}

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  background(255);
  base();
  for(let d of defence){
    d.create();
  }
}

function base(){
  for(let x = 0;x<numCols;x++){
    for(let y = 0; y<numRows;y++){
      rect(x*rectWidth,y*rectHeight,rectWidth,rectHeight);
    }
  }
}

function getCurrentX(){
  let constrainMouseX = constrain(mouseX, 0, width-1);
  return floor(constrainMouseX/rectWidth); 
}

function getCurrentY(){
  let constrainMouseY = constrain(mouseY, 0, height-1);
  return floor(constrainMouseY/rectHeight);
}

function mousePressed(){
  defence.push(new Tower(col,row,rectWidth));
}

class Tower{
  constructor(x,y,s){
    this.x = x*rectWidth+rectWidth/2;
    this.y = y*rectHeight+rectHeight/2;
    this.size = s;
  }

  create(){
    circle(this.x,this.y,this.size);
  }
}

