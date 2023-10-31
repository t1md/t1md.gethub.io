// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let zoom = 1;
let x,y;
function setup() {
  createCanvas(500*zoom, 500*zoom);
  colorMode(HSB);
  noLoop();
}

function draw() {
  background(0);
  fill(255);
  star();
  for(let i = 0; i<2.5*zoom;i++){
    art();
  }
  // save("processnum4.png");
}


function star(){
  for(let stars = 750*zoom;stars>0;stars--){
    let x = random(width);
    let y = random(height);
    size = randomGaussian(2,0.5);
    circle(x,y,size);
  }
}

function art(){
  stroke(random(255),255,255);
  noFill();
  x = random(0,width);
  y = random(0,height);
  let len = random(50,100);
  for(let i = 0; i <2; i ++){
    stroke(random(255),255,255);
    for(let fire = 0; fire<360;fire+=randomGaussian(20,10)){
      push();
      translate(x,y);
      rotate(radians(fire));
      beginShape();
      curveVertex(0,0);
      curveVertex(0,0);
      curveVertex(0,0);
      curveVertex(200,len*2);
      curveVertex(0,len);
      curveVertex(-50,len);
      curveVertex(-50,len);
      endShape();
      pop();
    }
  }

}
// as fire gets closer to 180 the line gets straighter

// save("processnum3.png");
