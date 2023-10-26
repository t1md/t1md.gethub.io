// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let sineY;
let h;
let num;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(0,height*0.1);
  background(220);
  Sinusoids(0);
}


function Sinusoids(lineY){
  noFill();
  beginShape();
  curveVertex(0, lineY);
  curveVertex(0, lineY);
  for(let x =0; x<width;x++){
    for (let y = 0;y<x;y++){
      h = x;
      sineY = h - h * Math.sin( x * 2 * Math.PI * (1/width) );
      curveVertex(x, lineY+sineY);
    }
  }
  curveVertex(width, lineY);
  curveVertex(width, lineY);
  endShape();
}
