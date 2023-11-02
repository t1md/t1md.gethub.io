// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(255);
  movers.push(new Mover(mouseX,mouseY));
  for(let i = 0; i <movers.length;i++){
    let m = movers[i];
    m.move(); m.display();
  }
}

function mousePressed(){
  for(let i = 0; i <100;i++){
    movers.push(new Mover(mouseX,mouseY));
  }
}

class Mover{

  constructor(x,y){
    this.position = createVector(x,y); this.s = 20;
    this.velocity = createVector(random(-3,3),random(0,-5));
    this.gravity = createVector(0,0.07);
    this.lifetime = Math.floor(random(100,200));
    this.alive = true;
    this.c = color(random(255),255,255);
  }

  move(){
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
  }

  display(){
    fill(this.c);
    push();
    translate(this.position.x,this.position.y);
    circle(0,0,this.s);
    pop();
  }

}