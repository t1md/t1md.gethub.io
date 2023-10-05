// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global variables
let rectLen = 2;
let noiseShift = 0.009;
let noiseNumber = 0;
let curX,curY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  curY = height;
}

function draw() {
  background(255);
  noiseNumber = 0;
  generateTerrain();
}

function generateTerrain(){
  for(let rectX = 0; rectX <width;rectX+=rectLen){
    fill(255);
    let ranSize = noise(noiseNumber);
    ranSize = map(ranSize,0,1,height*0.1,height*0.8);
    noiseNumber += noiseShift;
    let rectY = height-ranSize;
    rect(rectX,height,rectX+rectLen,rectY);
    drawFlag(rectX,rectY);
  }
}

function keyPressed(){
  if(key === "ArrowRight"){
    rectLen+=0.1;
  }
  else if(key === "ArrowLeft"){
    rectLen-=0.1;
  }
  else{
    print(key);
  }
}

function drawFlag(x,y){
  if(y<curY){
    curX=x,curY=y;
  }
  rect(curX-rectLen*0.2,curY,curX-rectLen*0.6,curY-40);
  fill(255,0,0);
  triangle(curX,curY-40,curX,curY-25,curX+20,curY-32.5);
}

