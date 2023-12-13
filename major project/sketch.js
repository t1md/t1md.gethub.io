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
  drawPath(0,7);
}

let intheway

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  background(150);
  base();
  for(let d of defence){
    d.createBase();
  }
  for(let d of defence){
    d.action();
  }
  for(let b of enemies){
    b.action();
  }
  if(enemies.length === 0){
    enemies.push(new Enemy(0,7,5));
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


intheway


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

  createBullet(enemyX, enemyY) {
    this.bullets.push(new Bullet(this.x, this.y, enemyX, enemyY, this.bulletSpeed, 255));
  }

  bulletTravel(){
    for(let b of this.bullets){
      b.fire();
      if(b.offscreen()){
        this.bullets.splice(b,1);
      }
    }
  }

  findEnemyDistance() {
    let minDist = Infinity;
    for (let b of enemies) {
      let d = dist(this.x, this.y, b.enemyX(), b.enemyY());
      if (d < minDist) {
        minDist = b;
      }
    }
    return minDist;
  }

  findNearestEnemy() {
    let minDist = Infinity;
    let nearestEnemy;
    for (let b of enemies) {
      let d = dist(this.x, this.y, b.enemyX(), b.enemyY());
      if (d < minDist) {
        minDist = d;
        nearestEnemy = b;
      }
    }
    return nearestEnemy;
  }

  action(){
    this.counter += 1;
    if (this.counter % (this.fireRate * 60)===0) {
      let nearestEnemy = this.findNearestEnemy();
      if (nearestEnemy) {
        this.createBullet(nearestEnemy.enemyX(), nearestEnemy.enemyY(),nearestEnemy.enemyDirection);
      }
    }

    this.bulletTravel();
  }

}

intheway

class Bullet{
  constructor(x, y, targetX, targetY, speed, c) {
    this.position = createVector(x, y);
    this.target = createVector(targetX, targetY);
    this.direction = this.target.copy().sub(this.position).normalize();
    this.bulletSpeed = this.direction.copy().mult(speed);
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

intheway

class Enemy{
  constructor(x,y,s){
    this.position = createVector(x,y*rectHeight+rectHeight/2);
    this.travelSpeed = createVector(0,0);
    this.counter = 0;
    this.speed = s;
  }

  findPath(){
    this.goalX = checkPointX[this.counter];
    this.goalY = checkPointY[this.counter];
    if(this.goalX > this.position.x){
      this.travelSpeed.set(this.speed,0);
      this.direction = 2;
    }
    else if(this.goalY > this.position.y){
      this.travelSpeed.set(0,this.speed );
      this.direction = 3;
    }
    else if(this.goalY < this.position.y){
      this.travelSpeed.set(0,-this.speed );
      this.direction = 1;
    }
    else{
      this.travelSpeed.set(0,0);
      this.counter +=1;
      if(this.counter >= checkPointX.length){
        this.travelSpeed.set(this.speed,0);
        this.direction = 2;
      }
    }
  }

  atCastle(){
    if(this.position.x-16>=numCols*rectWidth){
      return true;
    }
  }

  enemyX(){
    return this.position.x;
  }
  enemyY(){ 
    return this.position.y;
  }
  enemyDirection(){
    return this.direction;
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