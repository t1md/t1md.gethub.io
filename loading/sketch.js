// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectHeight = 100;
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(255);
  translate(width/2,height/2);
  loading();
  point(0,0);
}

function loading(){
  fill(0,0,255);
  push();
  rotate(radians(counter));
  rect(0,-100,20,rectHeight);
  pop();
  for (let i =0;i<7;i++){
    push();
    fill(0,0,255,map(i,0,7,255,-20));
    rotate(radians(counter-i*20));
    rect(0,-100,20,rectHeight);
    pop();
  }
  counter+=7;
}

function mouseWheel(event){
  if (event.delta>0 && rectHeight>20){
    rectHeight -=10;
    
  }
  else if(event.delta<0 && rectHeight<190){
    rectHeight += 10;
  }
}