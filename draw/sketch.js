// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballx;
let bally;
let ballsize = 30;
let xspeed = 5;
let yspeed = 5;
let overlay;
let colorA;
let colorB;

function keypressed(){
  if(key==="a"){
    fill(colorA);
  }
  if (key==="b"){
    fill(colorB);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  ballx = width/2;
  bally = height/2;
  colorA = color(128,20,190);
  colorB = color("blue");
  overlay = createGraphics(width,height);
}

function draw() {
  background(255);
  moveball();
  mousetriangle();
}

function moveball(){
  ballx+=xspeed;
  bally+=yspeed;
  if (ballx+ballsize/2 >= width || ballx-ballsize/2 <=0){
    xspeed =xspeed*-1;
  }
  if (bally+ballsize/2 >= height || bally-ballsize/2 <=0){
    yspeed =yspeed*-1;
  }
  fill(0);
  circle(ballx,bally,ballsize);
}

function mousetriangle(){
  fill(0);
  overlay.triangle(mouseX,mouseY-30,mouseX-20,mouseY+10,mouseX+20,mouseY+10);
  image(overlay,0,0);
}