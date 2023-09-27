// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y,rheight,rwidth;
let rleft,rright,rtop,rbottom;
let mouseover = false,pickedup = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  x = width/2; y = height/2;
  rheight = 100, rwidth=100;
}

function updateedgepositions(){
  rleft = x - rwidth/2;
  rright = x + rwidth/2;
  rtop = y - rheight/2;
  rbottom = y + rheight/2;
}

function drawrect(){
  updateedgepositions();
  if (mouseX>rleft&&mouseX<rright&&mouseY>rtop&&mouseY<rbottom){
    fill(70,130,130);
    mouseover = true;
  }
  else{
    fill(30,70,130);
    mouseover = false;
  }

  if (pickedup){
    x = mouseX;
    y = mouseY;
  }
  rect(x,y,rwidth,rheight);
}

function mousePressed(){
  if (mouseover){
    pickedup = true;
  }
}

function mouseReleased(){
  pickedup = false;
}

function draw() {
 background(255);
  drawrect();
}