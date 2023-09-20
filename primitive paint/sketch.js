// Primitive Paint
// Tim Dobson
// 9/15/2023
//draws shapes either square,circle,triangle
//
// Extra for Experts:
// i made it preview shape and change size according to mouse


//global variables
let shapeheight=100,shapewidth=100;
let overlay;
let shape;
let circleX, circleY;
let xmove=0.05,ymove=0.05;
let rad = 0;
let bgcolor = 255;
let fr, fg, fb, sr ,sg ,sb ;
let currentkey;

function setup() {
  //sets up and creats all the constants
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(windowWidth,windowHeight);
  overlay.rectMode(CENTER);
  rectMode(CENTER);
  circleX = mouseX, circleY=mouseY;
  overlay.fill(0);
  textFont("Brush Script MT");
  textSize(20);
}

function draw() {
  //draws the items and constantly updates the overlay
  background(bgcolor);
  image(overlay,0,0);
  rotatingCircle();
  preview();
  myname();
}

function myname(){
  //rights my name in bottom right
  fill(0);
  stroke(0);
  text("Timothy Dobson",width*0.85,height*0.99);
}

function rotatingCircle(){
  //rotats a circle around the cursor
  rad += xmove;
  circleX = mouseX + Math.cos(rad)*100;
  circleY = mouseY + Math.sin(rad)*100;
  fill(fr,fg,fb);
  stroke(sr,sg,sb);
  ellipse(circleX,circleY,30,30 );
}

function preview(){
  //draws a preview of the shape
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

function keyPressed(){
  //takes in key presses and tells what key was pressed for the drawing
  //changes colours or resets the screen
  if(key === "a"){
    currentkey = "a";
  }
  if(key === "s"){
    currentkey = "s";
  }
  if(key === "d"){
    currentkey = "d";
  }
  if(key === "c"){
    //changes colour to a random colour
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
    //clean slates 
    overlay.background(bgcolor);
    image(overlay,0,0);
  }
  else{
    console.log(key);
  }
}

function mousePressed(){
  //draws a shape depending on what key had been pressed upon pressing the mouse
  if (currentkey === "a"){
    overlay.rect(mouseX,mouseY,shapewidth,shapeheight);
  }
  if (currentkey === "s"){
    overlay.ellipse(mouseX,mouseY,shapewidth,shapeheight);
  }
  if (currentkey === "d"){
    overlay.triangle(mouseX,mouseY-shapeheight/2,mouseX-shapewidth/2,mouseY
    +shapeheight/2,mouseX+shapewidth/2,mouseY+shapeheight/2);
  }

}

function mouseWheel(event){
  //changes the size of the shape when you scroll your scrollwheel
  if(event.delta>0){
    shapewidth+=5;
    shapeheight+=5;
  }
  if(event.delta<0){
    shapewidth-=5;
    shapeheight-=5;
  }
}