// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(3000, 1000);
  noStroke();
  frameRate(60);
}

function draw() {
  background(220);
  for(let i = 0;i<1;i++){
    let x = random(width);
    let y = random(height);
    if(y<height*0.7&&y>height*0.3){
      circle(x,y,50);
    }
  }
}
