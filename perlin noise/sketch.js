// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global variables
let rectLen = 1;
let noiseShift = 0.009;
let noiseNumber;
let rectX,rectY,x,y;
let terrainList=[];
let cont = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
}

function draw() {
  noiseNumber = cont;
  y=height;
  x = 0;
  terrainList=[];
  background(255);
  generateTerrain();
  drawFlag(x,y);
  middleLine();
  cont+=0.07;
}

function generateTerrain(){
  for(rectX = 0; rectX<width;rectX+=rectLen){
    fill(255);
    let ranSize = noise(noiseNumber);
    ranSize = map(ranSize,0,1,height*0.1,height*0.8);
    noiseNumber += noiseShift;
    rectY = height-ranSize;
    rect(rectX,height,rectX+rectLen,rectY);
    if(y>=rectY){
      x=rectX,y=rectY;
    }
    terrainList.push(rectY);
  }
}
function middleLine(){
  let finalCount = 0;
  for(let i = 0; i < terrainList.length;i++){
    finalCount+=terrainList[i];
  }
  finalCount = finalCount/terrainList.length;
  line(0,finalCount,width,finalCount);
  stroke(0);
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
  let flgLen = rectLen*0.5;
  rect(x-flgLen,y,x-flgLen,y-40);
  fill(255,0,0);
  stroke(255,0,0);
  triangle(x-flgLen,y-40,x-flgLen,
    y-25,x+20-flgLen,y-32.5);
}

