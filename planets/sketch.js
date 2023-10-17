// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let myPlanet;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myPlanet = new Planet(width/2,height/2);
}

function draw() {
  background(0);
  myPlanet.display();
}

function mouseClicked(){
  if(keyIsPressed && keyCode===SHIFT){
    myPlanet = new Planet(mouseX,mouseY);
  }
  else{
    myPlanet.createMoon();
  }
}

class Planet{

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 100;
    this.radius = this.size/2;
    this.moons = [];
  }

  display(){
    circle(this.x,this.y,this.size);
    for(let i of this.moons){
      i.update();
    }
  }

  createMoon(){
    this.moons.push(new Moon(this.x,this.y));
  }
}

class Moon{

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.steps = 20;
    this.speed = 5;
  }

  update(){
    this.x += this.speed;
    this.steps--;
    if (this.steps ===0){
      this.steps = 40;
      this.speed*=-1;
    }
    circle(this.x,this.y,30);
  }
}