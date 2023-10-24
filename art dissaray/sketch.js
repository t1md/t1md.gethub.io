// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let squareSize = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noFill();
  squares();
}

// function draw() {
//   background(220);
// }

function squares(){
  for(let x = squareSize/2;x<width-squareSize/2;x+=squareSize){
    for(let y = squareSize/2;y<height-squareSize/2;y+=squareSize){
      push();
      translate(x,y);
      let r = map(y,0,height,0,135);
      rotate(radians(random(-r,r)));
      let yoff = (y,0,height,0,15);
      square(random(-yoff,yoff),random(-yoff,yoff),squareSize);
      pop();
    }
  }
}