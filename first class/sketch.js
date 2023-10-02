// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let racecars = [];
let racers = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 1; i<=racers;i++){
    let y = width*i / racers;
    let c = color(random(255),random(255),random(255));
    racers.push(new Racecar(y,c));
  }

}

function draw() {
  background(0);
  for (let car of racecars){
    car.display();
    car.move();
  }
}

class Racecar{

  constructor(y,c){
    this.xPosition = 0;
    this.yPosition = y;
    this.xSpeed = random(3,15);
    this.color = c;
    this.size = 10;
  }

  move(){
    this.xPosition += this.xSpeed;
    if (this.xPosition>width-this.size){
      this.xPosition = 0;
    }
  }

  display(){
    fill(this.color);
    circle(this.xPosition,this.yPosition,this.size);
  }
}