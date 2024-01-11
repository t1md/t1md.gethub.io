// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let health;
let dollarSign;
let settings;
let deleteBin;


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
let overlay = 0;
let start = false;
let startGame;
let setting;
let settingButton;
let volume = 100;
let gameOver = false;
let exitGame;
let tower = false;
let towerChoice;
let deleter = false;
let left,right;
let targets = ["first","close"];

// bullet delete, first = farthest not first spawn, more towers, change first and closest
// sell tower

function reset(){
  defence = [];
  enemies = [];
  grid = [];
  checkPointX = [];
  checkPointY = [];
  overlay = 0;
  lives = 10;
  bank = 200;
  waveCount = 0;
  enemyCount = 0;
  initialize = 0;
  exitUpgrades = false;
  for (let i = 0; i < numRows; i++) {
    grid.push(Array(numCols).fill(0));
  }
  drawPath(0,7);
}

function preload(){
  health = loadImage("pictures/health.png");
  dollarSign = loadImage("pictures/money.png");
  settings = loadImage("pictures/settings.png");
  deleteBin = loadImage("pictures/delete.png");
}


function setup() {
  createCanvas(numCols*rectWidth+300, numRows*rectHeight);
  for (let i = 0; i < numRows; i++) {
    grid.push(Array(numCols).fill(0));
  }
  drawPath(0,7);
  // settingButton = new Button(width*0.95,height*0.01,50,50);
}

let intheway

function draw() {
  if(start === false){
    startScreen();
  }
  if(start === true){
    runProgram();
  }
  if(gameOver === true){
    endScreen();
  }
  // settingButton.settingAction();
}

function startScreen(){
  background(0,255,0);
  let startButton = new Button(width*0.3,height*0.5,width*0.4,height*0.1,"Start");
  startButton.startAction();
}

function endScreen(){
  textSize(width*0.1);
  text("you Lose!",width*0.3,height*0.4);
  let exitButton = new Button(width*0.3,height*0.5,width*0.4,height*0.1,"Exit");
  exitButton.exitAction();
}

function runProgram(){
  rectMode(CORNER);
  strokeWeight(1);
  col = getCurrentX();
  row = getCurrentY();
  background(150);
  base();
  if (tower !== false){
    overlayTower(tower);
  }
  if (overlay !== 0){
    overlay.createBase();
  }
  if(tower !== false ){
    let deleteButton = new Button(width*0.75,height*0.01,width*0.05,width*0.05);
    deleteButton.deleteAction();
  }
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
  if (initialize === 0){
    showTowers();
  }
  else{
    initialize.openUpgrades();
  }
  drawStats();
  if(lives <=0){
    gameOver = true;
  }
}

function showTowers(){
  fill(0)
  textSize(80);
  text("Towers",width*0.82,height*0.17);
  let firstTowerButton = new Button(width*0.82,height*0.2,width*0.07,width*0.07,0);
  firstTowerButton.towerAction();
  // let secondTowerButton = new Button(width*0.92,height*0.2,width*0.07,width*0.07,1);
  // secondTowerButton.towerAction();
}

function overlayTower(tower){
  if(mouseX>0&&mouseX<numCols*rectWidth&&mouseY>0&&mouseY<height){
    if(grid[col][row] === 0){
      overlay = new Overlay(col,row,255);
    }
    else{
      overlay = 0;
    }
  }
  else{
    overlay = 0;
  }
}

function waves(){
  if(enemies.length <=0 && enemyCount === 0 && lives>0){
    waveCount+=1;
    enemyCount = waveCount*2;
  }
  if(floor(frameCount%50) === 0 && enemyCount>0){
    enemies.push(new Enemy(0,7,2,2,"green",1));
    enemyCount-=1;
    if(floor(frameCount%60) === 0 && enemyCount>10){
      enemies.push(new Enemy(0,7,4,6,"blue",2));
      enemyCount-=5;
      if(floor(frameCount%80) === 0 && enemyCount>100){
        enemies.push(new Enemy(0,7,8,12,"red",3));
        enemyCount-=20;
      }
    }
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
  if (start === true && gameOver === false){
    if(exitUpgrades === true){
      initialize = 0;
      exitUpgrades = false;
    }
    if(left === true){
      initialize.targeting = targets[0];
    }
    if(right === true){
      initialize.targeting = targets[1];
    }

    else if(mouseX>0&&mouseX<numCols*rectWidth&&mouseY>0&&mouseY<height){
      if(grid[col][row] === 0 && tower!== false){
        if(bank>=200 && deleter !== true){
          defence.push(new Tower(col,row,255));
          grid[col][row] = 1;
          cost(200);
          tower = false;
        }
        else if(deleter === true){
          tower = false;
          overlay = 0;
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
    if(towerChoice !== false){
      tower = towerChoice;
    }
  }
  if(startGame === true){
    start = true;
    startGame = false;
  }
  if(exitGame === true){
    start = false;
    exitGame = false;
    gameOver = false;
    reset();
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
    this.damage = 1;
    this.pierce = 1;
    this.damageDealt = 0;
    this.exitButton;
    this.targeting = "first";
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
    noFill();
    circle(this.x,this.y,this.range*10);
    fill(0);
    textSize(35);
    this.exitButton = new Button(numCols*rectWidth+230, height*0.12,50,50);
    text("FireRate: " + this.fireRate,numCols*rectWidth+10, height*0.15,);
    text("Damage: " + this.damage,numCols*rectWidth+10, height*0.175);
    text("BulletSpeed: " + this.bulletSpeed,numCols*rectWidth+10, height*0.2);
    text("Range: " + this.range,numCols*rectWidth+10, height*0.225);
    text("Pierce: " + this.pierce,numCols*rectWidth+10, height*0.25);
    textSize(25);
    text("DamageDealt: " + this.damageDealt,numCols*rectWidth, height*0.93);
    this.exitButton.exitUpgradesAction();
    let targeting = new Button(width*0.85,height*0.95,width*0.1,height*0.03,this.targeting);
    targeting.targetingAction();
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

  findFirstEnemy(){
    let firstEnemy;
    let count = 1;
    for(let b of enemies){
      if(count===1){
        let predictedPos = this.predictEnemyPosition(b);
        firstEnemy = {b,predictedPos};
        count-=1;
      }
    }
    return firstEnemy;
  }

  nearestEnemyTarget(){
    this.counter += 1;
    if (floor(this.counter % (60/this.fireRate))===0) {
      let nearestEnemy = this.findNearestEnemy();
      let distance = this.findEnemyDistance();
      if (enemies.length!==0 && distance<this.range*5.5) {
        this.createBullet(nearestEnemy.predictedPos.x, nearestEnemy.predictedPos.y);
      }
    }
  }

  firstEnemyTarget(){
    this.counter += 1;
    if (floor(this.counter % (60/this.fireRate))===0) {
      let firstEnemy = this.findFirstEnemy();
      let distance = this.findEnemyDistance();
      if (enemies.length!==0 && distance<this.range*5.5) {
        this.createBullet(firstEnemy.predictedPos.x, firstEnemy.predictedPos.y);
      }
    }
  }


  action(){
    if(this.targeting === "first"){
      this.firstEnemyTarget();
    }
    if(this.targeting === "close"){
      this.nearestEnemyTarget();
    }
    this.bulletTravel();
  }

}

class Overlay{
  constructor(x,y,c){
    this.col = x;
    this.row = y;
    this.x = x*rectWidth+rectWidth/2;
    this.y = y*rectHeight+rectHeight/2;
    this.size = rectWidth;
    this.c =  c;
  }
  createBase(){
    fill(this.c);
    circle(this.x,this.y,this.size);
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
    this.size = 10;
  }

  createBase(){
    noStroke();
    let x = this.position.x;
    let y = this.position.y;
    for(let i = this.size;i>=0;i--){
      fill(this.c,255/abs(i-10));
      x-=this.bulletSpeed.x;
      y-=this.bulletSpeed.y;
      circle(x,y,i);
    }
    stroke(1);
  }

  findDamage(){
    return this.damageDealt;
  }

  hitEnemy(){
    for (let b of enemies) {
      let d = dist(this.position.x, this.position.y, b.enemyX(), b.enemyY());
      if(d<20 && b.health>0){
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
  constructor(x,y,s,health, colour, str){
    this.position = createVector(x,y*rectHeight+rectHeight/2);
    this.travelSpeed = createVector(0,0);
    this.counter = 0;
    this.speed = s;
    this.health = health;
    this.colour = colour;
    this.str = str;
  }

  findPath(){
    this.goalX = checkPointX[this.counter];
    this.goalY = checkPointY[this.counter];
    if(this.goalX > this.position.x){
      this.travelSpeed.set(this.speed,0);
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
        if (lives>0){
          lives-=1;
        }
      }
      else if(b.dead()){
        enemies.splice(i,1);
        gain(25*this.str);
      }
    }
  }

  movement(){
    this.position.add(this.travelSpeed);
  }

  createEnemy(){
    fill(this.colour);
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
  constructor(x,y,w,h,message){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.gray = 0;
    this.message = message;
  }

  textInitialize(){
    fill(this.grey);
    rect(this.x,this.y,this.w,this.h);
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(this.h);
    text(this.message, this.x+this.w/2,this.y+this.h/2);
    textAlign(LEFT,BASELINE);
  }

  startHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      this.grey = 100;
      startGame = true;
    }
    else{
      this.grey = 200;
      startGame = false;
    }
  }

  settingsInitialize(){
    image(settings,this.x,this.y,this.w,this.h);
  }

  settingsHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      setting = true;
    }
    else{
      setting = false;
    }
  }

  exitUpgradesInitialize(){
    fill(this.r,0,0);
    rect(this.x,this.y,this.w,this.h,10,10,10,10);
    fill(0);
    strokeWeight(5);
    line(this.x+5,this.y+5,this.x+this.w-5,this.y+this.h-5);
    line(this.x+this.w-5,this.y+5,this.x+5,this.y+this.h-5);
    strokeWeight(1);
  }

  exitUpgradesHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      this.r  = 200;
      exitUpgrades = true;
    }
    else{
      this.r = 255;
      exitUpgrades = false;
    }
  }

  exitInitialize(){
    fill(this.grey);
    rect(this.x,this.y,this.w,this.h);
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(this.h);
    text(this.message, this.x+this.w/2,this.y+this.h/2);
    textAlign(LEFT,BASELINE);
  }

  exitHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      this.grey = 100;
      exitGame = true;
    }
    else{
      this.grey = 200;
      exitGame = false;
    }
  }

  towerBaseInitialize(){
    fill(this.grey);
    rect(this.x,this.y,this.w,this.h,10,10,10,10);
  }

  towerInitialize(){
    if (this.message === 0){
      fill(255);
      circle(this.x+this.w/2,this.y+this.h/2,this.w*0.9);
    }
  }

  towerHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      this.grey = 100;
      towerChoice = this.message;
    }
    else{
      this.grey = 200;
      towerChoice = false;
    }
  }

  deleteInitialize(){
    fill(this.r,0,0);
    rect(this.x,this.y,this.w,this.h,10,10,10,10);
    fill(0);
    image(deleteBin,this.x,this.y,this.w,this.h);
  }

  deleteHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      this.r  = 200;
      deleter = true;
    }
    else{
      this.r = 255;
      deleter = false;
    }
  }

  targetingInitialize(){
    fill(200);
    rect(this.x,this.y,this.w,this.h,10,10,10,10);
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(this.h);
    text(this.message, this.x+this.w/2,this.y+this.h/2);
    fill(this.Lgrey);
    square(this.x-this.w*0.25,this.y,this.w*0.25,10,10,10,10);
    fill(this.Rgrey);
    square(this.x+this.w,this.y,this.w*0.25,10,10,10,10);
    fill(0);
    text(">", this.x+this.w*1.13,this.y+this.h*0.55);
    text("<", this.x-this.w*0.13,this.y+this.h*0.55);
    textAlign(LEFT,BASELINE);
  }

  targetingHoverOver(){
    if(mouseX>this.x-this.w*0.25 && mouseY>this.y && mouseX<this.x && mouseY<this.y+this.h){
      this.Lgrey = 100;
      left = true;
    }
    else{
      this.Lgrey = 200;
      left = false;
    }
    if(mouseX>this.x+this.w && mouseY>this.y && mouseX<this.x+this.w+this.w*0.25 && mouseY<this.y+this.h){
      this.Rgrey = 100;
      right = true;
    }
    else{
      this.Rgrey = 200;
      right = false;
    }
  }

  deleteAction(){
    this.deleteHoverOver();
    this.deleteInitialize();
  }

  exitUpgradesAction(){
    this.exitUpgradesHoverOver();
    this.exitUpgradesInitialize();
  }

  startAction(){
    this.startHoverOver();
    this.textInitialize();

  }
  settingAction(){
    this.settingsHoverOver();
    this.settingsInitialize();
  }
  exitAction(){
    this.exitHoverOver();
    this.exitInitialize();
  }
  towerAction(){
    this.towerHoverOver();
    this.towerBaseInitialize();
    this.towerInitialize();
  }
  targetingAction(){
    this.targetingHoverOver();
    this.targetingInitialize();
  }
}