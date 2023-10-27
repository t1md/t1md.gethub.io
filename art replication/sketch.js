// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//globals variable

let sineY;
let h,y;
let num;

//setup
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//draws 100 sinusoidals 4 pixels apart vertically
function draw() {
  translate(0,height*0.1);
  background(220);
  for(let i = 0;i<400;i+=4){
    h = 50;
    num = 0;
    Sinusoids(i);
  }
}

//draws a beggining and end while filling with a horizontaly increasing
// line that oscilates increasingly. yep
function Sinusoids(lineY){
  noFill();
  beginShape();
  curveVertex(0, lineY);
  curveVertex(0, lineY);
  for(let x =0; x<width;x++){
    num+= 6/width;
    y = h * Math.sin( x * num * Math.PI * (1/width));
    curveVertex(x, lineY+y);
  }
  curveVertex(width, lineY);
  curveVertex(width, lineY);
  endShape();
}
