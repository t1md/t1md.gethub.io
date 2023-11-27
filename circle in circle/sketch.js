// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let circleCount = 3;
let depth = 10;
let circleSize =250;
let len;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {

  background(220);
  drawCircle(0,circleSize,depth,1);
}

function drawCircle(len,circleSize,depth,rotation){
  if(depth>0){
    push();
    translate(width/2,height/2);
    rotate(radians(360/circleCount/rotation));
    circle(len,0,circleSize);
    pop();
    for(let  i =0; i<circleCount;i++){
      drawCircle(len+circleSize/4,circleSize/2,depth-1,i);
    }
  }
}
