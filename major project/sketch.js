// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid =[];
let numRows = 5;
let numCols = 5;
let rectWidth, rectHeight;

function setup() {
  for(let i = 0; i<numRows;i++){
    grid.push([]);
  }
  rectWidth = 50;
  rectHeight = 50;
  createCanvas(numCols*rectWidth, numRows*rectHeight);
}

function draw() {
  background(255);
  base();
}

function base(){
  for(let x = 0;x<numCols;x++){
    for(let y = 0; y<numRows;y++){
      rect(x*rectWidth,y*rectHeight,rectWidth,rectHeight);
    }
  }
}
