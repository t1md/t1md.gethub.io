// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




let numRows = 15;
let numCols = 15;
let rectWidth = 75;
let rectHeight =75;
let row,col;
let defence = [];
let grid = [];
let enemies = [];

function setup() {
  createCanvas(numCols*rectWidth+200, numRows*rectHeight);
  for (let i = 0; i < numRows; i++) {
    grid.push(Array(numCols).fill(0));
  }
  for(let i = 0;i<10;i++){
    enemies.push(new Enemy(0,10,5));
  }
}

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  background(0,255,0);
  base();
  for(let d of defence){
    d.action();
  }
  for(let b of enemies){
    b.action();
  }
}

function base(){
  for(let y = 0;y<numRows;y++){
    for(let x = 0;x<numCols;x++){
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
    if(grid[col][row] === 0){
      defence.push(new Tower(col,row));
      grid[col][row] = 1;
    }
  }
}

class Tower{
  constructor(x,y){
    this.col = x;
    this.row = y;
    this.x = x*rectWidth+rectWidth/2;
    this.y = y*rectHeight+rectHeight/2;
    this.size = rectWidth;
    this.fireRate = 1;
    this.counter = 0;
    this.bullets = [];
  }

  getColPosition(){
    return this.col;
  }
  getRowPosition(){
    return this.row;
  }

  createBase(){
    circle(this.x,this.y,this.size);
  }

  createBullet(){
    this.bullets.push(new Bullet(this.x,this.y,-5,5));
  }

  bulletTravel(){
    for(let b of this.bullets){
      b.fire();
      if(b.offscreen()){
        this.bullets.splice(b,1);
      }
    }
  }

  action(){
    this.createBase();
    this.counter+=1;
    if(this.counter%(this.fireRate*60)===0){ 
      this.createBullet();
    }
    this.bulletTravel();
  }

}

class Bullet{
  constructor(x,y,speed){
    this.position = createVector(x,y);
    this.bulletSpeed = createVector(speed,0);
  }

  createBase(){
    circle(this.position.x,this.position.y,10);
  }

  movement(){
    this.position.add(this.bulletSpeed);
  }

  fire(){
    this.createBase();
    this.movement();
  }

  offscreen(){
    if(this.position.x > numCols*rectWidth || this.position.x < 0 || this.position.y > height || this.position.y < 0){
      return true;
    }
  }
}

class Enemy{
  constructor(x,y){
    this.position = createVector(x,y*rectHeight+rectHeight/2);
    this.travelSpeed = createVector(5,0);
  }

  movement(){
    this.position.add(this.travelSpeed);
  }

  createEnemy(){
    fill("red");
    circle(this.position.x,this.position.y,25);
    fill(255);
  }

  action(){
    this.createEnemy();
    this.movement();
  }
}