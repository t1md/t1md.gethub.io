// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds =now.getSeconds();

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  translate(width/2,height/2);
  drawClock(200);
}

function drawClock(size){
  stroke(0);
  strokeWeight(3);
  circle(0,0,size*2);
  point(0,0);
  for(let i = 0;i<360;i+=360/12){
    push();
    rotate(radians(i));
    line(0,0+size-20,0,0+size-5);
    pop();
  }
  for(let i = 0;i<360;i+=360/60){
    push();
    rotate(radians(i));
    strokeWeight(1);
    line(0,0+size-15,0,0+size-5);
    pop();
  }
  push();
  rotate(radians(0));
  line(0,0,0,-size/2);
  pop();
  push();
  rotate(radians(45));
  line(0,0,0,-size+60);
  pop();
  push();
  rotate(radians(90));
  stroke(color("red"));
  line(0,0,0,-size+30);
  pop();
}