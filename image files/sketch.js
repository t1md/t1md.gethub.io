// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let lionL,lionR,facing = "left";
let pinImg = [];
let curPin = 0;

function preload(){
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");
  for(let i = 0; i<9;i++ ){
    pinImg.push(loadImage("assets/pin-0"+i+".png"));
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  // stepOne();
  stepTwo();
}

function stepOne(){
  if(movedX > 0 )facing = "right";
  else if(movedX < 0 )facing = "left";

  if (facing ==="left"){
    image(lionL,mouseX,mouseY,lionL.width/2,lionL.height/2);
  }
  else{
    image(lionR,mouseX,mouseY,lionR.width/2,lionR.height/2);
  }
}

function stepTwo(){
  image(pinImg[curPin],width/2,height/2);
  curPin++;
  if (curPin>8){
    curPin = 0;
  }
}
