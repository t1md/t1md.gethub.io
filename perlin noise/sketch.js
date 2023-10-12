// terrain generation
// timothy dobson
// 10/12/2023
//
// this program uses perlin noise to generate a terrain that
// continously scrols to the right creating a flag on the highest 
//peak and a line that shows the average of size on the terrain
// it also allow the user to change the size of the rectangle that
//that make the terrain with the arrow keys


// global variables
let rectLen = 1;
let noiseShift = 0.01;
let noiseNumber;
let rectX,rectY,x,y;
let terrainList=[];
let cont = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
}

//makesure the variables are always the same and changes so that
//terrain moves also runs all the functions that make the terrain
function draw() {
  noiseNumber = cont;
  y=height;
  x = 0;
  terrainList=[];
  background(255);
  generateTerrain();
  drawFlag(x,y);
  middleLine();
  cont+=0.06;
}

//creates the terrain by drawing rectangle very closly together
function generateTerrain(){
  for(rectX = 0; rectX<width;rectX+=rectLen){
    fill(255);
    let ranSize = noise(noiseNumber);
    ranSize = map(ranSize,0,1,height*0.1,height*0.8);
    noiseNumber += noiseShift;
    rectY = height-ranSize;
    rect(rectX,height,rectX+rectLen,rectY);
    //gets the heighest peak
    if(y>=rectY){
      x=rectX,y=rectY;
    }
    //puts the terrains height in a array so that we can figure out 
    // the middle
    terrainList.push(rectY);
  }
}

//uses the array with all the rectangles heights to make a line on 
//middle of the heights
function middleLine(){
  let finalCount = 0;
  for(let i = 0; i < terrainList.length;i++){
    finalCount+=terrainList[i];
  }
  finalCount = finalCount/terrainList.length;
  line(0,finalCount,width,finalCount);
  stroke(0);
}
//lets the user change the size of the rectangle with the arrow keys
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

//draws a flag on the heighest peak in the terrain
function drawFlag(x,y){
  let flgLen = rectLen*0.5;
  rect(x-flgLen,y,x-flgLen,y-40);
  fill(255,0,0);
  stroke(255,0,0);
  triangle(x-flgLen,y-40,x-flgLen,
    y-25,x+20-flgLen,y-32.5);
}

