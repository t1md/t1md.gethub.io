// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// global
let points=[];
let reach = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for(let p of points){
    p.display();
    p.move();
    p.connectPoints();
  }
}

function mouseClicked(){
  for (let i = 0; i<100;i++){
    points.push(new MiniPoint(mouseX,mouseY));
  }
}

class MiniPoint{

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 20;
    this.colour = color(random(255),random(255),random(255));
    this.xTime = random(100);
    this.yTime = random(100);
    this.timeShift = 0.01;
    this.maxSpeed = 5;

  }

  display(){
    fill(this.colour);
    noStroke();
    circle(this.x,this.y,this.size);
    let d =dist(this.x,this.y,mouseX,mouseY);
    if (d<reach){
      this.size = map(d,0,reach,100,20);
    }
    else{
      this.size = 20;
    }

  }

  move(){
    let xSpeed = noise(this.xTime);
    xSpeed = map(xSpeed,0,1,-this.maxSpeed,this.maxSpeed);

    let ySpeed = noise(this.yTime);
    ySpeed = map(ySpeed,0,1,-this.maxSpeed,this.maxSpeed); 

    this.x+=xSpeed;
    this.y+=ySpeed;
    this.xTime += this.timeShift;
    this.yTime += this.timeShift;

    if(this.x <0){
      this.x+=width;
    }
    if(this.x >width){
      this.x-=width;
    }
    if(this.y <0){
      this.y+=height;
    }
    if(this.y >height){
      this.y-=height;
    }

  }

  connectPoints(pointArray){
    stroke(this.colour);
    for (let p of points){
      if(this !==p){
        if(dist(this.x,this.y,p.getX(),p.getY())<reach){
          line(this.x,this.y,p.getX(),p.getY());
        }
      }
    }

  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
}