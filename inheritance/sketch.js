// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let objects = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 10; i++){
    objects.push(new AnimatedObject(random(width),random(height)));
  }
  for(let i = 0; i < 10; i++){
    objects.push(new CircleObject(random(width),random(height),random(20,40)));
  }
}

function draw(){
  background(220);
  for(let o of objects){
    o.move();
    o.display();
  }
}

//"parent" or "super" class
class AnimatedObject {
  constructor(x,y){
    this.x = x;   this.y = y;
    this.size = 1;
  }
  
  move(){  //wiggle movement
    this.x += random(-2,2);
    this.y += random(-2,2);
  }

  display(){
    strokeWeight(4);
    point(this.x,this.y);
  }
}

class CircleObject extends AnimatedObject{
  constructor(x, y, d){
    super(x, y);
    this.size = d;
  }

  display(){
    strokeWeight(2);
    circle(this.x, this.y, this.size);
  }
}