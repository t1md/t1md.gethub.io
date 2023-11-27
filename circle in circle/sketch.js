// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circleCount = 2;
let depth = 3;
let circleSize =250;
let len;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {

  background(220);
  drawCircle(0,circleSize,depth);
}

function drawCircle(len,circleSize,depth){
  if(depth>0){
    push();
    translate(width/2,height/2);
    circle(len,0,circleSize);
    len = circleSize/4;
    pop();
    drawCircle(len,circleSize/2,depth-1);
  }
}
