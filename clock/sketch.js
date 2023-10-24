// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let TIME;
let hours;
let minutes;
let seconds;

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
  TIME = new Date();
  hours = TIME.getHours();
  minutes = TIME.getMinutes();
  seconds =TIME.getSeconds();
  push();
  let hour = map(hours,0,24,0,360*2);
  rotate(radians(hour));
  line(0,0,0,-size/2);
  pop();
  push();
  let min = map(minutes,0,60,0,360);
  rotate(radians(min));
  line(0,0,0,-size+60);
  pop();
  push();
  let sec = map(seconds,0,60,0,360);
  rotate(radians(sec));
  stroke(color("red"));
  line(0,0,0,-size+30);
  pop();
}