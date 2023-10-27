// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let zoom = 1;
function setup() {
  createCanvas(700*zoom, 700*zoom);
  noLoop();
}

function draw() {
  background(0);
  fill(255);
  for(let stars = 1000*zoom;stars>0;stars--){
    let x = random(width);
    let y = random(height);
    size = randomGaussian(2,0.5);
    circle(x,y,size);
  }
}
