// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let health;
let dollarSign;


let numRows = 16;
let numCols = 16;
let rectWidth = 80;
let rectHeight =80;
let row,col;
let defence = [];
let grid = [];
let enemies = [];
let checkPointX = [];
let checkPointY = [];
let lives = 10;
let bank = 200;
let initialize = 0;
let exitUpgrades;
let waveCount = 0;
let enemyCount = 0;



function preload(){
  health = loadImage("pictures/health.png");
  dollarSign = loadImage("pictures/money.png");
}


function setup() {
  createCanvas(numCols*rectWidth+300, numRows*rectHeight);
  for (let i = 0; i < numRows; i++) {
    grid.push(Array(numCols).fill(0));
  }
  drawPath(0,7);
}

let intheway

function draw() {
  rectMode(CORNER);
  strokeWeight(1);
  col = getCurrentX();
  row = getCurrentY();
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
  waves();
  if (initialize!== 0){
    initialize.openUpgrades();
  }
  drawStats();
}

function waves(){
  if(enemies.length <=0 && enemyCount === 0){
    waveCount+=1;
    enemyCount = waveCount*2;
  }
  if(floor(frameCount%(150/waveCount)) === 0 && enemyCount>0){
    enemies.push(new Enemy(0,7,2.5,10));
    enemyCount-=1;
  }

}

function drawStats(){
  textSize(35);
  fill(0);
  text("Lives: "+lives, numCols*rectWidth+50, height*0.04);
  image(health, numCols*rectWidth, height*0.01, 50,50);
  text("Money: "+ bank, numCols*rectWidth+50, height*0.09 );
  image(dollarSign, numCols*rectWidth+5, height*0.06, 40,50);
  text("Wave: "+ waveCount, 10, height*0.03);
}

function cost(amount){
  bank-=amount;
}
function gain(amount){
  bank+=amount;
}

function base(){
  noStroke();
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
  stroke(1);
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
      if(bank>=200 || keyCode === SHIFT){
        defence.push(new Tower(col,row,255));
        grid[col][row] = 1;
        cost(200);
      }
    }
    else if(grid[col][row] === 1){
      for(let d of defence){
        let dCol = d.getColPosition();
        let dRow = d.getRowPosition();
        if(dCol === col && dRow === row){
          initialize = d;
        }
      }
    }
  }
  if(exitUpgrades === true){
    initialize = 0;
    exitUpgrades = false;
  }
}

function drawPath(x,y){
  let direction = floor(random(4));
  while(direction >4 || direction<0 ){
    direction = floor(random(4));
  }
  if(x < numCols){
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
    this.range = 50;
    this.damage = 5;
    this.pierce = 1;
    this.damageDealt = 0;
    this.exitButton;
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
    this.bullets.push(new Bullet(this.x, this.y, enemyX, enemyY, this.bulletSpeed,this.c,this.damage,this.pierce));
  }

  bulletTravel(){
    for(let b of this.bullets){
      b.fire();
      if(b.offscreen() || b.hit()){
        this.bullets.splice(b,1);
      }
      if(b.hit()){
        this.damageDealt += b.findDamage();
      }
    }
  }

  openUpgrades(){
    fill(0);
    this.exitButton = new Button(numCols*rectWidth+230, height*0.12,50);
    text("fireRate: " + this.fireRate,numCols*rectWidth+10, height*0.15,);
    text("Damage: " + this.damage,numCols*rectWidth+10, height*0.175);
    text("bulletSpeed: " + this.bulletSpeed,numCols*rectWidth+10, height*0.2);
    text("range: " + this.range,numCols*rectWidth+10, height*0.225);
    text("pierce: " + this.pierce,numCols*rectWidth+10, height*0.25);
    text("damageDealt: " + this.damageDealt,numCols*rectWidth+10, height*0.9);
    this.exitButton.exitAction();
  }

  showRange(){
    noFill();
    circle(this.x,this.y,this.range*10);
  }

  findEnemyDistance() {
    let minDist = Infinity;
    for (let b of enemies) {
      let d = dist(this.x, this.y, b.enemyX(), b.enemyY());
      if (d < minDist) {
        minDist = d;
      }
    }
    return minDist;
  }

  predictEnemyPosition(enemy) {
    let timeToHit = dist(this.x, this.y, enemy.enemyX(), enemy.enemyY()) / this.bulletSpeed;
    let futureX = enemy.enemyX() + enemy.travelSpeed.x * timeToHit;
    let futureY = enemy.enemyY() + enemy.travelSpeed.y * timeToHit;

    return createVector(futureX, futureY);
  }

  findNearestEnemy() {
    let minDist = Infinity;
    let nearestEnemy;
    for (let b of enemies) {
      let predictedPos = this.predictEnemyPosition(b);
      let d = dist(this.x, this.y, predictedPos.x, predictedPos.y);
      if (d < minDist) {
        minDist = d;
        nearestEnemy = {b,predictedPos};
      }
    }
    return nearestEnemy;
  }


  action(){
    this.counter += 1;
    if (this.counter % (60/this.fireRate)===0) {
      let nearestEnemy = this.findNearestEnemy();
      let distance = this.findEnemyDistance();
      if (enemies.length!==0 && distance<this.range*5.5) {
        this.createBullet(nearestEnemy.predictedPos.x, nearestEnemy.predictedPos.y);
      }
    }

    this.bulletTravel();
  }

}

intheway

class Bullet{
  constructor(x, y, targetX, targetY, speed,c, damage, pierce) {
    this.position = createVector(x, y);
    this.target = createVector(targetX, targetY);
    this.direction = this.target.copy().sub(this.position).normalize();
    this.bulletSpeed = this.direction.copy().mult(speed);
    this.damage = damage;
    this.pierce = pierce;
    this.c = c;
    this.hasHit = [];
    this.damageDealt = 0;
  }

  createBase(){
    fill(this.c);
    circle(this.position.x,this.position.y,10);
  }

  findDamage(){
    return this.damageDealt;
  }

  hitEnemy(){
    for (let b of enemies) {
      let d = dist(this.position.x, this.position.y, b.enemyX(), b.enemyY());
      if(d<20){
        let hit = false;
        for(let h of this.hasHit){
          if(h === b ){
            hit = true;
          }
          else{
            hit = false;
          }
        }
        if(hit === false){
          this.hasHit.push(b);
          b.takeDamage(this.damage);
          this.pierce-=1;
          this.damageDealt += this.damage;
        }
      }
    }

  }

  movement(){
    this.position.add(this.bulletSpeed);
  }

  fire(){
    this.createBase();
    this.movement();
    this.hitEnemy();
  }

  offscreen(){
    if(this.position.x > numCols*rectWidth || this.position.x < 0 || this.position.y > height || this.position.y < 0){
      return true;
    }
  }

  hit(){
    if(this.pierce<1){
      return true;
    }
  }
}

intheway

class Enemy{
  constructor(x,y,s,health){
    this.position = createVector(x,y*rectHeight+rectHeight/2);
    this.travelSpeed = createVector(0,0);
    this.counter = 0;
    this.speed = s;
    this.health = health;
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
    }
    else if(this.goalY < this.position.y){
      this.travelSpeed.set(0,-this.speed );
    }
    else{
      this.travelSpeed.set(0,0);
      this.counter +=1;
      if(this.counter >= checkPointX.length){
        this.travelSpeed.set(this.speed,0);
      }
    }
  }
  
  takeDamage(damage){
    this.health-=damage;
  }

  dead(){
    if(this.health <= 0){
      return true;
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

  remover(){
    let i = -1;
    for(let b of enemies){
      i++;
      if(b.atCastle()){
        enemies.splice(i,1);
        lives-=1;
      }
      else if(b.dead()){
        enemies.splice(i,1);
        gain(50);
      }
    }
  }

  movement(){
    this.position.add(this.travelSpeed);
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
    this.remover();
  }
}

class Button{
  constructor(x,y,s){
    this.x = x;
    this.y = y;
    this.s = s;
    this.r = 255;
  }

  exitInitialize(){
    fill(this.r,0,0);
    // rectMode(CENTER);
    square(this.x,this.y,this.s+5,10,10,10,10);
    fill(0);
    strokeWeight(5);
    line(this.x+5,this.y+5,this.x+this.s,this.y+this.s);
    line(this.x+this.s,this.y+5,this.x+5,this.y+this.s);
    strokeWeight(1);
  }

  exitHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.s && mouseY<this.y+this.s){
      this.r  = 200;
      exitUpgrades = true;
    }
    else{
      this.r = 255;
      exitUpgrades = false;
    }
  }
  exitAction(){
    this.exitHoverOver();
    this.exitInitialize();
  }
}