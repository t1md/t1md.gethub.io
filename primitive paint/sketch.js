// Primitive Paint
// Tim Dobson
// 9/15/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shapeheight,shapewidth;
let overlay;
let shape;
let circleX, circleY;
let xmove,ymove;
let rad;
let bgcolor = 255;
let fr, fg, fb, sr ,sg ,sb ;
let currentkey;

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(windowWidth,windowHeight);
  overlay.rectMode(CENTER);
  rectMode(CENTER);
  circleX = mouseX, circleY=mouseY;
  xmove=0.05,ymove=0.05;
  rad = 0;
  shapeheight=100, shapewidth=100;
  overlay.fill(0);
}

function draw() {
  background(bgcolor);
  image(overlay,0,0);
  rotatingCircle();
  preview();
  myname();
}
function myname(){
  fill(0);
  stroke(0);
  text("Timothy Dobson",width*0.84,height*0.99);
}
function rotatingCircle(){
  rad += xmove;
  circleX = mouseX + Math.cos(rad)*100;
  circleY = mouseY + Math.sin(rad)*100;
  fill(fr,fg,fb);
  stroke(sr,sg,sb);
  ellipse(circleX,circleY,30,30 );
}
function preview(){
  if (currentkey === "a"){
    rect(mouseX,mouseY,shapewidth,shapeheight);
  }
  if (currentkey === "s"){
    ellipse(mouseX,mouseY,shapewidth,shapeheight);
  }
  if (currentkey === "d"){
    triangle(mouseX,mouseY-shapeheight/2,mouseX-shapewidth/2,mouseY
    +shapeheight/2,mouseX+shapewidth/2,mouseY+shapeheight/2);
  }

}
function mousePressed(){
  if(key === "a"){
    overlay.rect(mouseX,mouseY,shapewidth,shapeheight);
    image(overlay,0,0);
    currentkey = "a";
  }
  if(key === "s"){
    overlay.ellipse(mouseX,mouseY,shapewidth,shapeheight);
    image(overlay,0,0);
    currentkey = "s";
  }
  if(key === "d"){
    overlay.triangle(mouseX,mouseY-shapeheight/2,mouseX-shapewidth/2,mouseY
    +shapeheight/2,mouseX+shapewidth/2,mouseY+shapeheight/2);
    image(overlay,0,0);
    currentkey = "d";
  }
  if(key === "c"){
    let r = random(256);
    let g = random(256);
    let b = random(256);
    overlay.fill(r,g,b);
    fill(r,g,b);
    fr=r,fg=g,fb=b;
    r = random(256);
    g = random(256);
    b = random(256);
    overlay.stroke(r,g,b);
    stroke(r,g,b);
    sr=r,sg=g,sb=b;
  }
  if (key ===" "){
    overlay.background(bgcolor);
    image(overlay,0,0);
  }
  else{
    console.log(key);
  }
}
