// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let recty, rectheight;
let eastBound = [];
let westBound = [];
let mycar;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mycar = new Vehicle(0,0);
}

function draw() {
  background(220);
  drawRoad();
  mycar.action();
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
class Vehicle{

  constructor(x,direction){
    this.x = x;
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