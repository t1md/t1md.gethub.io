// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let zoom = 1;
let x,y;
let num;
function setup() {
  createCanvas(500*zoom, 500*zoom);
  colorMode(HSB);
  noLoop();
}

function draw() {
  background(0);
  for(let i = 0;i<10;i++){
    lines();
  }
  // save("processnum3.png");
}


function lines(){
// line from one side to a height
  stroke(random(255),255,255);
  x = random(width);
  y = random(height);
  num = random(2);
  print(num);

}
