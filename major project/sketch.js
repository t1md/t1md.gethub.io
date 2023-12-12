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
let checkPointX = [];
let checkPointY = [];


function setup() {
  createCanvas(numCols*rectWidth+200, numRows*rectHeight);
  for (let i = 0; i < numRows; i++) {
    grid.push(Array(numCols).fill(0));
  }
  for(let i = 0;i<1;i++){
    enemies.push(new Enemy(0,7));
  }
  drawPath(0,7);
}

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  background(150);
  base();
  for(let d of defence){
    d.action();
  }
  for(let b of enemies){
    b.action();
  }
  if(frameCount%60===0){
    enemies.push(new Enemy(0,7));
  }
}

function base(){
  for(let y = 0;y<numRows;y++){
    for(let x = 0;x<numCols;x++){
      if(grid[x][y] === 0){
        fill(0,255,0);
      }
      if(grid[x][y] === 1){
        fill(100);
      }
      if(grid[x][y] === 2){
        fill("brown");
      }
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
      defence.push(new Tower(col,row,255));
      grid[col][row] = 1;
    }
  }
}

function drawPath(x,y){
  let direction = floor(random(4));
  while(direction >4 || direction<0 ){
    direction = floor(random(4));
  }
  if(x < 15){
    grid[x][y] = 2;
    checkPointX.push(x*rectWidth+rectWidth/2);
    checkPointY.push(y*rectHeight+rectHeight/2);
    if(direction === 0 || direction === 1 ){
      drawPath(x+1,y);
    }
    else if(direction === 2 && y!==14){
      if(grid[x][y+1]===2){
        drawPath(x+1,y);
      }
      else{
        drawPath(x,y+1);
      }
    }
    else if(direction === 3 && y!==0){
      if(grid[x][y-1]===2){
        drawPath(x+1,y);
      }
      else{
        drawPath(x,y-1);
      }
    }
    else{
      drawPath(x+1,y);
    }
  }
}

class Tower{
  constructor(x,y,c){
    this.col = x;
    this.row = y;
    this.x = x*rectWidth+rectWidth/2;
    this.y = y*rectHeight+rectHeight/2;
    this.size = rectWidth;
    this.fireRate = 1;
    this.counter = 0;
    this.bullets = [];
    this.bulletSpeed = 5;
    this.c =  c;
  }

  getColPosition(){
    return this.col;
  }
  getRowPosition(){
    return this.row;
  }

  createBase(){
    fill(this.c);
    circle(this.x,this.y,this.size);
  }

  createBullet(){
    this.bullets.push(new Bullet(this.x,this.y,5,255));
  }

  bulletTravel(){
    for(let b of this.bullets){
      b.fire();
      if(b.offscreen()){
        this.bullets.splice(b,1);
      }
    }
  }

  findEnemies(){
    for(let b of enemies){
      this.badX = b.enemyX;
      this.badY = b.enemyY;
    }
  }

  action(){
    this.createBase();
    this.findEnemies();
    this.counter+=1;
    if(this.counter%(this.fireRate*60)===0){ 
      this.createBullet();
    }
    this.bulletTravel();
  }

}

class Bullet{
  constructor(x,y,speed,c){
    this.position = createVector(x,y);
    this.bulletSpeed = createVector(speed,0);
    this.c = c;
  }

  createBase(){
    fill(this.c);
    circle(this.position.x,this.position.y,15);
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
    this.travelSpeed = createVector(0,0);
    this.counter = 0;
  }

  findPath(){
    this.goalX = checkPointX[this.counter];
    this.goalY = checkPointY[this.counter];
    if(this.goalX > this.position.x){
      this.travelSpeed.set(5,0);
    }
    else if(this.goalY > this.position.y){
      this.travelSpeed.set(0,5);
    }
    else if(this.goalY < this.position.y){
      this.travelSpeed.set(0,-5);
    }
    else{
      this.travelSpeed.set(0,0);
      this.counter +=1;
      if(this.counter >= checkPointX.length){
        this.travelSpeed.set(5,0);
      }
    }
  }

  atCastle(){
    if(this.position.x-15>=numCols*rectWidth){
      return true;
    }
  }

  enemyX(){
    return this.position.x;
  }
  enemyY(){ 
    return this.position.y;
  }

  movement(){
    this.position.add(this.travelSpeed);
    for(let b of enemies){
      if(b.atCastle()){
        enemies.splice(b,1);
      }
    }
  }

  createEnemy(){
    fill("red");
    circle(this.position.x,this.position.y,30);
    fill(255);
  }

  action(){
    this.createEnemy();
    this.findPath();
    this.movement();
  }
}