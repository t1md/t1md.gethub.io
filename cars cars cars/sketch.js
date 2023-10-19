// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let recty, rectheight;
let eastBound = [];
let westBound = [];
let count = 20;
let myTraffic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i<count;i++){
    eastBound.push(new Vehicle(1));
  }
  for(let i = 0; i<count;i++){
    westBound.push(new Vehicle(0));
  }
  myTraffic = new TrafficLight(100,100,1);
}

function draw() {
  background(220);
  drawRoad();

  for(let e of eastBound){
    e.action();
  }
  for(let w of westBound){
    w.action();
  }
  myTraffic.drawLight();
}

function drawRoad(){
  rectMode(RADIUS);
  fill(0);
  rect(width/2,height/2,width,height*0.2);
  fill(color("yellow"));
  for( let i = 0; i<width; i+=30){
    rect(i+10,height/2,11,1.5);
  }

}
function keyPressed(){ 
  if(keyCode === 32){
    myTraffic.stop();
  }
}

function mouseClicked(){
  if(keyIsPressed && keyCode===SHIFT){
    westBound.push(new Vehicle(0));
  }
  else{
    eastBound.push(new Vehicle(1));
  }
}

class Vehicle{

  constructor(direction){
    this.x = random(0,width);
    if (direction === 1 ){
      this.y = random(height/2+15,height/2+height*0.2-15);
    }
    else if(direction === 0){
      this.y = random(height/2-height*0.2+15,height/2-15,);
    }
    this.type = round(random(3));
    this.color = color(random(255),random(255),random(255));
    this.direction = direction;
    this.speed = 10;
  }

  display(){
    if(this.type === 0){
      drawVan(this.x,this.y,this.color,this.direction);
    }
    else{
      drawCar(this.x,this.y,this.color,);
    }
  }

  move(){
    if(this.direction === 1){
      this.x+=this.speed;
      if(this.x>width){
        this.x = 0;
      }
    }
    else if(this.direction === 0){
      this.x-=this.speed;
      if(this.x<0){
        this.x = width;
      }
    }
  }
  speedup(){
    if(this.speed<15){
      this.speed+=1;
    }
  }

  speeddown(){
    if(this.speed>1){
      this.speed-=1;
    }
  }

  changecolor(){
    this.color = color(random(255),random(255),random(255));
  }

  action(){
    this.move();
    if (Math.random() > 0.99){
      this.speedup();
    }
    if (Math.random() > 0.99){
      this.speeddown();
    }
    if (Math.random() > 0.99){
      this.changecolor();
    }
    this.display();
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

function drawVan(x,y,color,direction){
  fill(color);
  if (direction === 1){
    rect(x,y,11,11);
    rect(x-10,y,12,11);
  }
  else if(direction === 0){
    rect(x,y,11,11);
    rect(x+10,y,12,11);
  }
}

class TrafficLight{

  constructor(x,y,light){
    this.x = x;
    this.y = y;
    this.light = light;
  }

  drawLight(){
    fill(color("yellow"));
    rect(this.x,this.y,20,40);
    fill(255);
    if(this.light === 0){
      fill(color("red"));
    }
    circle(this.x,this.y-18,30);
    fill(255);
    if(this.light === 1){
      fill(color("green"));
    }
    circle(this.x,this.y+18,30);
  }

  stop(){
    this.light = 0;
    
  }

}