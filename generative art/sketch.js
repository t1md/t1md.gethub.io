// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let zoom = 4;
let x1,y1,x2,y2;
let num1,num2;
function setup() {
  createCanvas(500*zoom, 500*zoom);
  colorMode(HSB);
  noLoop();
}

function draw() {
  background(0);
  for(let i = 0;i<25;i++){
    lines();
  }
}


function lines(){
  stroke(random(255),255,255);
  strokeWeight(4);
  x1 = random(width);
  y1 = random(height);
  x2 = random(width);
  y2 = random(height);
  num1 = Math.floor(random(4));
  if(num1 === 0){
    num2 = Math.floor(random(2));
    if(num2 === 0){
      line(x1,0,0,y1);
    }
    if(num2 === 1){
      line(x1,0,width,y1);
    }
  }
  if (num1 === 1){
    num2 = Math.floor(random(2));
    if(num2 === 0){
      line(x1,height,0,y1);
    }
    if (num2 === 1){
      line(x1,height,0,y1);
    }
  }
  if(num1 === 2){

    num2 = Math.floor(random(2));
    if(num2 === 0){
      line(x1,0,x1,height);
    }
    if (num2 === 1){
      line(0,y1,width,y1);
    }
  }
  if(num1 === 3){

    num2 = Math.floor(random(2));
    if(num2 === 0){
      line(x1,0,x2,height);
    }
    if (num2 === 1){
      line(0,y1,width,y2);
    }
  }

}

function keyPressed(){
  save("diagonalandstraightlines.png");
}
