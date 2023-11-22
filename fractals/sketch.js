// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  rectMode(CENTER);
}

function draw() {
  background(255);
  circles(width/2,height/2,width/2);
  // cantor(width*0.1,height*0.2,width*0.8,19);
  // cCircle(width/2,height/2,width);
  rectangles(width/2,height/2,width,0);
}

function cCircle(x,y,d){
  if(d>10){
    circle(x,y,d);
    let newD = map(mouseX,0,width,1.01,1.5);
    cCircle(x,y,d-1/newD);
  }
}
function circles(x,y,d){
  if(d>5){
    circle(x,y,d);
    circles(x-d/2,y,d/2);
    circles(x+d/2,y,d/2);
    circles(x,y-d/2,d/2);
    circles(x,y+d/2,d/2);
  }
}

function cantor(x,y,len,depth){
  if (depth>1){
    line(x,y,x+len,y);
    cantor(x,y+20,len/3,depth-1);
    cantor(x+2*len/3,y+20,len/3,depth-1);
  }
}

function rectangles(x,y,side,angle){
  if(side>10){
    // push();
    // translate(x,y);
    // rotate(radians(angle));
    rect(x,y,side/2);
    // pop();

    rectangles(x+side/4,y+side/4,side/2,angle+15);
    rectangles(x-side/4,y+side/4,side/2,angle+15);
    rectangles(x+side/4,y-side/4,side/2,angle+15);
    rectangles(x-side/4,y-side/4,side/2,angle+15);
  }
}