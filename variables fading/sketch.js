// state variables and fading
// tim
//practice with state variables and making fading events
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let mouseSide,fillvalue=255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  mousepos();
}

function draw() {
  background(255);
  splitrect();
  mousepos();
  console.log(mouseSide);
}
function mousepos(){
  if (mouseX<= width/2){
    mouseSide = 0;
  }
  else{
    mouseSide = 1;
  }
}
function splitrect(){
  if (mouseSide === 0){
    fill(0);
  }
  else{
    fill(255);
  }
  rect(0,0,width/2,height);
  if (mouseSide === 1){
    fillvalue=10;
  }
  else{
    fillvalue+=10;
  }
  fillvalue = constrain(fillvalue,0,255);
  fill(fillvalue);
  rect(width/2,0,width/2,height);
}
