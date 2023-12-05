// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




let grid =[];
let numRows = 15;
let numCols = 15;
let rectWidth, rectHeight;
let row,col;
let defence = [];
let bullet = [];

function setup() {
  for(let i = 0; i<numRows;i++){
    grid.push([0]);
  }
  rectWidth = 75;
  rectHeight = 75;
  createCanvas(numCols*rectWidth+200, numRows*rectHeight);
}

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  background(0,255,0);
  base();
  for(let d of defence){
    d.action();
  }
}

function base(){
  for(let x = 0;x<numCols;x++){
    for(let y = 0; y<numRows;y++){
      rect(x*rectWidth,y*rectHeight,rectWidth,rectHeight);
    }
  }
}

function getCurrentX(){
  let constrainMouseX = constrain(mouseX, 0, numCols*rectWidth-1);
  return floor(constrainMouseX/rectWidth); 
}

function getCurrentY(){
  let constrainMouseY = constrain(mouseY, 0, height-1);
  return floor(constrainMouseY/rectHeight);
}

function mousePressed(){
  if(mouseX>0&&mouseX<numCols*rectWidth&&mouseY>0&&mouseY<height){
    defence.push(new Tower(col,row));
  }
}

class Tower{
  constructor(x,y){
    this.x = x*rectWidth+rectWidth/2;
    this.y = y*rectHeight+rectHeight/2;
    this.size = rectWidth;
    this.fireRate = 1;

  }

  createBase(){
    circle(this.x,this.y,this.size);
    for(let b of bullet){
      b.fire();
    }
  }

  shoot(){
    bullet.push(new Bullet(this.x,this.y));
  }

  action(){
    this.createBase();
    this.fireRate+=1;
    if(this.fireRate%15===0){ 
      this.shoot();
    }
  }

}

class Bullet{
  constructor(x,y){
    this.position = createVector(x,y);
    this.velocity = createVector(5,0);
  }

  fire(){
    // if (this.position.x<0&&this.position.x>numCols*rectWidth&&
    // this.position.y<0&&this.position.y>height){
    //   bullet.splice(bullet.length-1,1);
    // }
    this.position.add(this.velocity);
    circle(this.position.x,this.position.y,10);
  }
}