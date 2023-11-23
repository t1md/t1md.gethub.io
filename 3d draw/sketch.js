// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




function setup() {
  createCanvas(400, 400,WEBGL);
}

function draw() {
  background(0);
  // rotateY(radians(frameCount));
  // rotateX(radians(frameCount));
  // rotateZ(radians(frameCount));
  angle = map(mouseX,0,width,-120,120);
  boxes(70);
}
let angle = 5;

function boxes(size){
  if(size>10){
    rotateZ(radians(angle));
    translate(size*1.5,0);
    box(size);
    boxes(size*0.8);
  }
}
