// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let points = [];
let headlocation;
let speed = 10;
let snkLength = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  headlocation = new Point(width/2, height/2);
  initSnake;
}

function initSnake(){
  for (let i = 0; i <snkLength; i ++){
    points.push(createPoint);
  }
}

function createPoint(){
  if(keyCode===RIGHT_ARROW){
    headlocation.x+=speed;
  }
  else if(keyCode===LEFT_ARROW){
    headlocation.x-=speed;
  }
  else if(keyCode===UP_ARROW){
    headlocation.y-=speed;
  }
  else if(keyCode===DOWN_ARROW){
    headlocation.y+=speed;
  }
  return new Point(headlocation.x,headlocation.y);
}


function draw() {
  background(220);
  moveSnake();
  displaySnake();
}

function displaySnake(){
  for (let i = 0; i<points.length-1;i++){
    let curr = points[i];
    let right = points[i+1];
    line(curr.x,curr.y,right.x,right.y);
  }
}
function moveSnake(){
  points.splice(0,1);
  points.push(createPoint());

}
class Point{

  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}