// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let segmentlength = 5;
let bally = 200;
let noisepositionround = 50;
let noiseshift = 0.1;
let noiseposline = 200;
let noiseposbally = 0;


function setup() {
  createCanvas(500, 500);
  rectMode(CORNERS);
  frameRate(10);
}

function draw() {
  background(225);
  wastfulline();
  rectonline();
  moveball();
}

function wastfulline(){
  let x = 0;
  strokeWeight(20);
  while (x<width){
    let colour = random(255);
    colour = noise(noiseposline);
    colour = map(colour,0,1,0,255);
    noiseposline+=noiseshift;
    stroke(colour);
    line(x,height/2,x+segmentlength,height/2);
    x+=segmentlength;
  }
}

function rectonline(){
  stroke(0);
  strokeWeight(2);
  let round = random(90);
  round = noise(noisepositionround);
  round = map(round,0,1,2,90);
  noisepositionround+=noiseshift;

  rect(width*0.2,height/2,width*0.5,height*0.2, round);
}

function moveball(){
  let dy = noise(noiseposbally);
  dy = map(dy,0,1,-20,20);
  noiseposbally+=noiseshift;
  bally+=dy;
  circle(width*0.75,bally,30);
}