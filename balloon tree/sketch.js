// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let scale = 15;
let num;

function setup() {
  createCanvas(500, 500);
  background(255);
}
function draw() {
  drawTree(width/2, height*0.8, 90, 6);
  num = map(mouseX,0,width,10,25);
}
function drawLine( x1, y1, x2, y2, depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  line(x1, y1, x2, y2);
}
function drawTree(x1, y1, angle, depth) {
  if (depth > 0) {
    stroke(1);
    strokeWeight(depth-depth/5);
    let x2 = x1 + cos(radians(angle))*depth*scale;
    let y2 = y1 - sin(radians(angle))*depth*scale; 
    drawLine(x1, y1, x2, y2, depth);
    drawTree(x2, y2, angle-num, depth-1);
    drawTree(x2, y2, angle+num, depth-1);
    drawTree(x2, y2, angle, depth-1);
    drawleaf(x1,y1,depth);
    drawleaf(x2,y2,depth);
  }
}

function drawleaf(x,y,depth){
  if(depth<4){
  noStroke();
  fill(random(255),random(255),random(255));
  circle(x,y,randomGaussian(depth*8,6));
  }
}