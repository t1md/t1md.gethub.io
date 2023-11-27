// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball, totalBounces = 0;
let bounceSound, music;
let start = false;

function preload(){
  bounceSound = loadSound("assets/bounceSound.wav");
  music = loadSound("assets/background.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(width/2,height/2);
  if(localStorage.getItem("bounces") === null){
    localStorage.setItem("bounces",0);
  }
  else{
    totalBounces = int(localStorage.getItem("bounces"));
  }
}

function draw() {
  background(220);
  if(start === false){
    textSize(15),textAlign(CENTER);
    text("click to Begin", width/2,height/2);
    if(mouseIsPressed){
      start = true;
      music.setVolume(0.3);
      music.loop();
    }
  }
  else{
  ball.display();
  ball.move();
  textSize(30), textAlign(CENTER);
  text(totalBounces,width/2,height/2);
  }
}

class Ball{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(random(-6,6),random(-6,6));
  }

  display(){
    circle(this.pos.x,this.pos.y,30);
  }
  move(){
    this.pos.add(this.vel);

    if(this.pos.x-15<0 || this.pos.x+15>width){
      this.vel.x*=-1;
      totalBounces+=1;
      localStorage.setItem("bounces",totalBounces);
      bounceSound.play();
    }
    if(this.pos.y-15<0 || this.pos.y+15>height){
      this.vel.y*=-1;
      totalBounces+=1;
      localStorage.setItem("bounces",totalBounces);
      bounceSound.play();
    }
  }
}

function keyPressed(){
  if(key === "r"){
    localStorage.setItem("bounces",0);
    totalBounces = 0;
  }
}