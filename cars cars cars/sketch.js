// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let recty, rectheight;
let eastBound = [];
let westBound = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawRoad();
}

function drawRoad(){
  rectMode(RADIUS);
  fill(0);
  rect(width/2,height/2,width/2,height*0.2);
  fill(color("yellow"));
  for( let i = 0; i<width; i+=30){
    rect(i+10,height/2,11,1.5);
  }

}
class Vehicle{

  constructor(x,y,type,direction){
    this.x = x;
    this.y = y;
    this.type = type;
    this.color = color(random(255),random(255),random(255));
    this.direction = direction;
    this.speed = 10;
  }

  display(){
    if(this.type === 0){
      drawCar(this.x,this.y,this.color);
    }
    if(this.type === 1){
      drawVan();
    }
  }
}

function drawCar(x,y,color){
  fill(255);
  rect(x+12,y-8,6,4);
  rect(x+12,y+8,6,4);
  rect(x-12,y-8,6,4);
  rect(x-12,y+8,6,4);
  fill(color);
  rect(x,y,20,9);
}