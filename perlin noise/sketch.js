// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global variables
let rectLen = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
}

function draw() {
  background(220);
  generateTerrain;
}

function generateTerrain(){
  for(let rectX = 0; rectX <width;rectX+=rectLen){
    rect(rectX,0,rectX+rectLen,100);
  }
}