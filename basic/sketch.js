// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  movebus();
  greenrect();
  drawbus();
  
}

function movebus(){
  if (keyIsPressed) {
    if(keyCode===LEFT_ARROW ){
      x-=10;
    }
    if(keyCode===RIGHT_ARROW){
      x+=10;
    }
    if(keyCode===DOWN_ARROW){
      y+=10;
    }
    if(keyCode===UP_ARROW){
      y-=10;
    }
  }
}
function drawbus(){
  fill(255);
  rect(50+x,50+y,100,50);
  fill(0);
  circle(80+x,100+y,20);
  circle(120+x,100+y,20);

}
function greenrect(){
  fill(0,255,0);
  rect(windowWidth/2, windowHeight/2,windowWidth/2,windowHeight/2);

}

// function keyPressed(){
//   print("key: ", key, "\tkeyCode: ", keyCode );
//   if(keyCode===LEFT_ARROW){
//     x-=10;
//   }
//   if(keyCode===RIGHT_ARROW){
//     x+=10;
//   }
// }
