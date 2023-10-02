// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let walkers = [];
let numwalkers = 10000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i<numwalkers;i++){
    let newcolour = color(random(255),random(255),random(255));
    walkers.push(new Walker(width/2,height/2,newcolour));
  }
}

function draw() {
  for (let w of walkers){
    w.move();
    w.display();
  }
}

class Walker{

  constructor(x,y,c){
    this.x = x;
    this.y = y;
    this.c = c;
    this.speed = 10;
    this.size = 10;
  }

  display(){
    rectMode(CENTER);
    fill(this.c);
    square(this.x,this.y,this.size);
  }

  move(){
    let mychoice = Math.floor(random(4));
    if(mychoice===0){
      this.x-=this.speed;
    }
    else if(mychoice===1){
      this.x+=this.speed;
    }
    else if(mychoice===2){
      this.y-=this.speed;
    }
    else{
      this.y+=this.speed;
    }
  }
  
}