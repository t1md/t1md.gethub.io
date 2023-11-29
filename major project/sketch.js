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

function setup() {
  for(let i = 0; i<numRows;i++){
    grid.push([]);
  }
  rectWidth = 75;
  rectHeight = 75;
  createCanvas(numCols*rectWidth, numRows*rectHeight);
}

function draw() {
  background(0);
  base();
}

function base(){
  stroke(color("skyblue"));
  fill(0);
  for(let x = 0;x<numCols;x++){
    for(let y = 0; y<numRows;y++){
      rect(x*rectWidth,y*rectHeight,rectWidth,rectHeight);
    }
  }
}

