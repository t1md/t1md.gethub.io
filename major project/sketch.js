// timothy,Dobson
// tower defence 
// place towers and try to stop the enemies from reaching the end

// names for pictures
let health;
let dollarSign;
let settings;
let deleteBin;

// all global variables
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
let bank = 250;
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
let sell = false;
let left,right;
let targets = ["first","close"];
let hover = false;
let count = 0

// resets variables that get perminantly changed during game and recreates grid and path
function reset(){
  defence = [];
  enemies = [];
  grid = [];
  checkPointX = [];
  checkPointY = [];
  overlay = 0;
  lives = 10;
  bank = 250;
  waveCount = 0;
  enemyCount = 0;
  initialize = 0;
  exitUpgrades = false;
  for (let i = 0; i < numRows; i++) {
    grid.push(Array(numCols).fill(0));
  }
  drawPath(0,7);
}

// loads pictures
function preload(){
  health = loadImage("pictures/health.png");
  dollarSign = loadImage("pictures/money.png");
  settings = loadImage("pictures/settings.png");
  deleteBin = loadImage("pictures/delete.png");
}

// creates grid and draws initial path
function setup() {
  createCanvas(numCols*rectWidth+300, numRows*rectHeight);
  for (let i = 0; i < numRows; i++) {
    grid.push(Array(numCols).fill(0));
  }
  drawPath(0,7);
  // settingButton = new Button(width*0.95,height*0.01,50,50);
}

// draws what is needed depending on what is happening
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

// initial start screen with a button to start the game
function startScreen(){
  background(0,255,0);
  let startButton = new Button(width*0.3,height*0.5,width*0.4,height*0.1,"Start");
  startButton.startAction();
}

// tells you when you lost and lets you return to start screen to restart game
function endScreen(){
  textSize(width*0.1);
  text("you Lose!",width*0.3,height*0.4);
  let exitButton = new Button(width*0.3,height*0.5,width*0.4,height*0.1,"Exit");
  exitButton.exitAction();
}


// runs the main program
function runProgram(){
  towerChoice=false;
  rectMode(CORNER);
  strokeWeight(1);
  col = getCurrentX();
  row = getCurrentY();
  background(150);
  base();
  waves();
  // draws the towers
  for(let d of defence){
    d.createBase();
  }
  // runs the towers
  for(let d of defence){
    d.action();
  }
  // runs enemies
  for(let b of enemies){
    b.action();
  }
  // shows tower choices
  if (initialize === 0){
    showTowers();
  }
  // shows stats for chosen tower
  else{
    initialize.openUpgrades();
  }
  // creates a overlay of where the tower will be placed
  if (tower !== false){
    overlayTower(tower);
  }
  // draws chosen overlay
  if (overlay !== 0){
    overlay.createBase();
  }
  // draws the exit plcing button
  if(tower !== false ){
    let deleteButton = new Button(width*0.75,height*0.01,width*0.05,width*0.05);
    deleteButton.deleteAction();
  }
  drawStats();
  // if lives hit 0 game over
  if(lives <=0){
    gameOver = true;
  }
}
// shows tower choices
function showTowers(){
  fill(0);
  textSize(80);
  text("Towers",width*0.82,height*0.17);
  let firstTowerButton = new Button(width*0.82,height*0.2,width*0.07,width*0.07,0);
  firstTowerButton.towerAction();
  let secondTowerButton = new Button(width*0.92,height*0.2,width*0.07,width*0.07,1);
  secondTowerButton.towerAction();
  let thirdTowerButton = new Button(width*0.82,height*0.33,width*0.07,width*0.07,2);
  thirdTowerButton.towerAction();
  let fourthTowerButton = new Button(width*0.92,height*0.33,width*0.07,width*0.07,3);
  fourthTowerButton.towerAction();
}

// creates an overlay for where your tower will be placed
function overlayTower(){
  if(mouseX>0&&mouseX<numCols*rectWidth&&mouseY>0&&mouseY<height){
    if(grid[col][row] === 0){
      overlay = new Overlay(col,row,tower);
    }
    else{
      overlay = 0;
    }
  }
  else{
    overlay = 0;
  }
}

// creates each wave progressivly making the waves harder
function waves() {
  count++;
  if (enemies.length <= 0 && enemyCount <= 0 && lives > 0) {
    waveCount += 1;
    enemyCount = waveCount * 2;
    gain(50);
    count = 0
  }

  if (count % 50 === 0 && enemyCount > 0) {
    enemies.push(new Enemy(0,7,1));
    enemyCount -= 1;

    if (count % 60 === 0 && enemyCount > 5) {
      placeStrongerEnemies();

      if(count % 60 === 0 && enemyCount>15){
        enemies.push(new Enemy(0,7,4));
        enemyCount -= 15
      }
    }
  }
}

// chooses between two different strong enemies when activated
function placeStrongerEnemies() {
  let randType = floor(random(2,4));

  enemies.push(new Enemy(0, 7,randType));
  enemyCount -= 5;
}

// draws player stats and wave count
function drawStats(){
  textSize(35);
  fill(0);
  text("Lives: "+lives, numCols*rectWidth+50, height*0.04);
  image(health, numCols*rectWidth, height*0.01, 50,50);
  text("Money: "+ bank, numCols*rectWidth+50, height*0.09 );
  image(dollarSign, numCols*rectWidth+5, height*0.06, 40,50);
  text("Wave: "+ waveCount, 10, height*0.03);
}

// gives the price of towers
function costCalc(t){
  return 200*(t+1);
}

// removes money from how much you have
function cost(t){
  bank-=200*(t+1);
}

// adds money to how much you have
function gain(amount){
  bank+=amount;
}

// creates the colours for the grid
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

// gets which square the mouse is on the x axis
function getCurrentX(){
  let constrainMouseX = constrain(mouseX, 0, numCols*rectWidth-1);
  return floor(constrainMouseX/rectWidth); 
}

// gets which square the mouse is on the y axis
function getCurrentY(){
  let constrainMouseY = constrain(mouseY, 0, height-1);
  return floor(constrainMouseY/rectHeight);
}

// checks if mouse was pressed 
function mousePressed(){
  // only runs if the game is ongoing
  if (start === true && gameOver === false){
    // if the x or garbage bin in upgrades is pressed activates it exits the upgrades window
    if(exitUpgrades === true){
      // garbage: this sells the tower selected
      if (sell === true){
        let dCol = initialize.getColPosition();
        let dRow = initialize.getRowPosition();
        grid[dCol][dRow] = 0;
        let twr = defence.indexOf(initialize);
        gain((initialize.t+1)*150);
        defence.splice(twr,1);
        overlay = 0;
      }
      initialize = 0;
      exitUpgrades = false;
    }
    // chooses the targeting of the tower when arrows are pressed
    if(left === true){
      initialize.targeting = targets[0];
    }
    if(right === true){
      initialize.targeting = targets[1];
    }

    // this limits the position of mouse for placement to from inside the game
    else if(mouseX>0&&mouseX<numCols*rectWidth&&mouseY>0&&mouseY<height){
      // this checks if there is anything there
      if(grid[col][row] === 0 && tower!== false && deleter !== true){
        // checks if you have enough then if you do places tower
        if(bank>=costCalc(tower) ){
          defence.push(new BaseTower(col,row,tower));
          grid[col][row] = 1;
          cost(tower);
          tower = false;
          overlay = 0;
        }
      }
      // stops placement of tower if x is pressed
      else if(deleter === true){
        tower = false;
        overlay = 0;
      }
      // chooses the tower for the upgrader when a tower is pressed
      else if(grid[col][row] === 1 && deleter !== true){
        for(let d of defence){
          let dCol = d.getColPosition();
          let dRow = d.getRowPosition();
          if(dCol === col && dRow === row){
            initialize = d;
          }
        }
      }
    }
    // tells game which tower you chose 
    if(towerChoice !== false ){
      tower = towerChoice;
    }
  }
  // starts game when start game button is pressed
  if(startGame === true){
    start = true;
    startGame = false;
  }
  // exits game when exit game button is pressed
  if(exitGame === true){
    start = false;
    exitGame = false;
    gameOver = false;
    reset();
  }
}

// draws a path going up down or right randomly wont backtrack or go past area limits then creates a array that lists the x,y of where the path is for enemies
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
  checkPointX.push(x*rectWidth+rectWidth/2);
  checkPointY.push(y*rectHeight+rectHeight/2);
}

// tower class
class BaseTower{
  constructor(x,y,t){
    this.col = x;
    this.row = y;
    this.x = x*rectWidth+rectWidth/2;
    this.y = y*rectHeight+rectHeight/2;
    this.size = rectWidth;
    this.counter = 0;
    this.bullets = [];
    this.damageDealt = 0;
    this.exitButton;
    this.targeting = "first";
    this.sell = false;
    this.t = t
    // pick which tower you place
    if (t === 0){
      this.shooter();
    }
    if(t === 1){
      this.sprayer();
    }
    if(t === 2){
      this.sniper();
    }
    if(t===3){
      this.piercer();
    }
  }
  // basic tower
  shooter(){
    this.c =  255;
    this.fireRate = 1;
    this.bulletSpeed = 5;
    this.range = 50;
    this.damage = 1.5;
    this.pierce = 1;
  }
  // fast shooting low damage
  sprayer(){
    this.c = color(200,0,0);
    this.fireRate = 5;
    this.bulletSpeed = 4;
    this.range = 30;
    this.damage = 0.5;
    this.pierce = 1;
  }
  // long distance high damage
  sniper(){
    this.c = color(0,100,255);
    this.fireRate = 0.2;
    this.bulletSpeed = 10;
    this.range = 100;
    this.damage = 5;
    this.pierce = 1;
  }
  // pierces through multiple enemies
  piercer(){
    this.c = color(255,20,147);
    this.fireRate = 0.4;
    this.bulletSpeed = 6;
    this.range = 50;
    this.damage = 3;
    this.pierce = 4;
  }

  // gets the position on the array
  getColPosition(){
    return this.col;
  }
  // gets the position on the array
  getRowPosition(){
    return this.row;
  }
  // draws base
  createBase(){
    fill(this.c);
    circle(this.x,this.y,this.size);
  }
  // creates a bullet 
  createBullet(enemyX, enemyY) {
    this.bullets.push(new Bullet(this.x, this.y, enemyX, enemyY, this.bulletSpeed,this.c,this.damage,this.pierce));
  }
  // moves the bullet and removes any that hit enemies or go offscreen
  bulletTravel(){
    for(let b of this.bullets){
      b.fire();
      if(b.offscreen() || b.hit()){
        this.bullets.splice(this.bullets.indexOf(b),1);
      }
      if(b.hit()){
        this.damageDealt += b.findDamage();
      }
    }
  }
  // shows stats and creates the exit sell and targeting buttons
  openUpgrades(){
    noFill();
    circle(this.x,this.y,this.range*10);
    fill(0);
    textSize(35);
    this.exitButton = new Button(numCols*rectWidth+230, height*0.12,50,50);
    this.sellButton = new Button(numCols*rectWidth+230, height*0.9,50,50);
    text("FireRate: " + this.fireRate,numCols*rectWidth+10, height*0.15,);
    text("Damage: " + this.damage,numCols*rectWidth+10, height*0.175);
    text("BulletSpeed: " + this.bulletSpeed,numCols*rectWidth+10, height*0.2);
    text("Range: " + this.range,numCols*rectWidth+10, height*0.225);
    text("Pierce: " + this.pierce,numCols*rectWidth+10, height*0.25);
    textSize(25);
    text("DamageDealt: " + this.damageDealt,numCols*rectWidth, height*0.93);
    this.exitButton.exitUpgradesAction();
    this.sellButton.sellAction();
    let targeting = new Button(width*0.85,height*0.95,width*0.1,height*0.03,this.targeting);
    targeting.targetingAction();
  }
  // shows the range as a circle
  showRange(){
    noFill();
    circle(this.x,this.y,this.range*10);
  }
// finds the distance between the tower and the closest enemy
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
  // predicts where the enemie will be when the bullet will hit it
  predictEnemyPosition(enemy) {
    let timeToHit = dist(this.x, this.y, enemy.enemyX(), enemy.enemyY()) / this.bulletSpeed;
    let futureX = enemy.enemyX() + enemy.travelSpeed.x * timeToHit;
    let futureY = enemy.enemyY() + enemy.travelSpeed.y * timeToHit;

    return createVector(futureX, futureY);
  
  }
  // finds the closest enemy
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
  // finds the farthest along the track enemy thats within the towers range
  findFirstEnemy() {
    let maxDist = -Infinity;
    let firstEnemy = 0;
    for (let b of enemies) {
        let predictedPos = this.predictEnemyPosition(b);
        let d = dist(this.x, this.y, predictedPos.x, predictedPos.y);
        if (b.counter > maxDist && d < this.range * 5.5) {
            maxDist = b.counter;
            firstEnemy = { b, predictedPos };
        }
    }
    return firstEnemy;
}
// shootes at the nearest enemy
  nearestEnemyTarget(){
    this.counter += 1;
    if (floor(this.counter % (60/this.fireRate))===0) {
      this.distance = this.findEnemyDistance();
      let nearestEnemy = this.findNearestEnemy();
      if (enemies.length!==0 && this.distance<this.range*5.5) {
        this.createBullet(nearestEnemy.predictedPos.x, nearestEnemy.predictedPos.y);
      }
    }
  }
// shoots at the farthets along the track enemy
  firstEnemyTarget(){
    this.counter += 1;
    if (floor(this.counter % (60/this.fireRate))===0) {
      this.distance = this.findEnemyDistance();
      let firstEnemy = this.findFirstEnemy();
      if (enemies.length!==null && this.distance<this.range*5.5 && firstEnemy !== 0) {
        this.createBullet(firstEnemy.predictedPos.x, firstEnemy.predictedPos.y);
      } 
    }
  }

// chooses which to uses and activates them and moves the bullet
  action(){
    if(enemies.length!==0){
      if(this.targeting === "first"){
        this.firstEnemyTarget();
      }
      if(this.targeting === "close"){
        this.nearestEnemyTarget();
      }
    }
    this.bulletTravel();
  }
}

// draws an overlay of where the tower will be placed
class Overlay{
  constructor(x,y,t){
    this.col = x;
    this.row = y;
    this.x = x*rectWidth+rectWidth/2;
    this.y = y*rectHeight+rectHeight/2;
    this.size = rectWidth;
    if (t === 0){
      this.c =  255;
    }
    if(t===1){
      this.c = color(200,0,0);
    }
    if(t===2){
      this.c = color(0,100,255);
    }
    if(t===3){
      this.c = color(255,20,147);
    }
  }
  createBase(){
    fill(this.c);
    circle(this.x,this.y,this.size);
  }
}

// bullet
class Bullet{
  constructor(x, y, targetX, targetY, speed,c, damage, pierce) {
    this.position = createVector(x, y);
    this.target = createVector(targetX, targetY);
    this.direction = this.target.copy().sub(this.position).normalize();
    this.bulletSpeed = this.direction.copy().mult(speed);
    this.speed = speed;
    this.damage = damage;
    this.pierce = pierce;
    this.c = c;
    this.hasHit = [];
    this.damageDealt = 0;
    this.size = 10;
  }
  // draws bullet and gives it a tail
  createBase(){
    noStroke();
    let x = this.position.x;
    let y = this.position.y;
    for(let i = this.size;i>=0;i-=1*this.speed/5){
      fill(this.c,255/abs(i-10));
      x-=this.bulletSpeed.x;
      y-=this.bulletSpeed.y;
      circle(x,y,i);
    }
    stroke(1);
  }
  // returns the bullets total damage delt
  findDamage(){
    return this.damageDealt;
  }

  // figures out if the bullet hit an enemy
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

// moves bullet
  movement(){
    this.position.add(this.bulletSpeed);
  }
// runs previous functions
  fire(){
    this.createBase();
    this.movement();
    this.hitEnemy();
  }
// checks if bullet left screen
  offscreen(){
    if(this.position.x > numCols*rectWidth || this.position.x < 0 || this.position.y > height || this.position.y < 0){
      return true;
    }
  }
// tells if bullet has used all its pierce
  hit(){
    if(this.pierce<1){
      return true;
    }
  }
}

// enemy class
class Enemy{
  constructor(x,y,t){
    this.position = createVector(x,y*rectHeight+rectHeight/2);
    this.travelSpeed = createVector(0,0);
    this.counter = 0; 
    this.t = t
    // chooses type
    if(t === 1){
      this.basic();
    }
    if(t === 2){
      this.tank();
    }
    if(t === 3){
      this.speedy();
    }
    if(t === 4){
      this.evil();
    }
  }
// moderate speed and weak
  basic(){
    this.speed =  2;
    this.health = 3;
    this.colour = "green";
  }
// slow but lots of health
  tank(){
    this.speed = 1;
    this.health = 25;
    this.colour = "blue"
  }
  // quick but less health
  speedy(){
    this.speed = 5;
    this.health = 2;
    this.colour = "red"
  }
// bunch of health with good speed
  evil(){
    this.speed = 4;
    this.health = 20;
    this.colour = 0
  }

// finds where to go using the array from create path
  findPath() {
    this.goalX = checkPointX[this.counter];
    this.goalY = checkPointY[this.counter];
  
     let direction = createVector(this.goalX - this.position.x, this.goalY - this.position.y).normalize();

     this.travelSpeed.set(direction.x * this.speed, direction.y * this.speed);
   
     if (dist(this.position.x, this.position.y, this.goalX, this.goalY) < this.speed) {
       this.counter++;
       if (this.counter >= checkPointX.length) {
         this.travelSpeed.set(this.speed,0)
       }
     }
   }

// removes health in accordance to damage
  takeDamage(damage){
    this.health-=damage;
  }
// tells if the enemies has fallen below 0 health
  dead(){
    if(this.health <= 0){
      return true;
    }
  }
// tells if enemy is at the end
  atCastle(){
    if(this.position.x-16>=numCols*rectWidth){
      return true;
    }
  }
// finds x position
  enemyX(){
    return this.position.x;
  }
  // finds y position
  enemyY(){ 
    return this.position.y;
  }
// deletes enemies if at end or dead and makes you lose health or gain money correspondently
  remover(){
    for(let b = 0;b<enemies.length;b++){
      if(enemies[b].atCastle()){
        enemies.splice(b,1);
        b--;
        if (lives>0){
          lives-=1;
        }
      }
      else if(enemies[b].dead()){
        enemies.splice(b,1);
        b--;
        gain(25*this.t);
      }
    }
  }
// moves enemy
  movement(){
    this.position.add(this.travelSpeed);
  }
// draws the enemy
  createEnemy(){
    fill(this.colour);
    circle(this.position.x,this.position.y,30);
    fill(255);
  }
// runs the functions
  action(){
    this.createEnemy();
    this.findPath();
    this.movement();
    this.remover();
  }
}

// creates buttons all of the variables are to tell the mose pressed what action to take
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
// craetes a grey rectangle with a message
  textInitialize(){
    fill(this.grey);
    rect(this.x,this.y,this.w,this.h);
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(this.h);
    text(this.message, this.x+this.w/2,this.y+this.h/2);
    textAlign(LEFT,BASELINE);
  }

  // if the start is hoverd over tells computer and changes tone of grey
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
// not in use 
  settingsInitialize(){
    image(settings,this.x,this.y,this.w,this.h);
  }
// not in use
  settingsHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      setting = true;
    }
    else{
      setting = false;
    }
  }
// draws a red square with a black x inside
  exitUpgradesInitialize(){
    fill(this.r,0,0);
    rect(this.x,this.y,this.w,this.h,10,10,10,10);
    fill(0);
    strokeWeight(5);
    line(this.x+5,this.y+5,this.x+this.w-5,this.y+this.h-5);
    line(this.x+this.w-5,this.y+5,this.x+5,this.y+this.h-5);
    strokeWeight(1);
  }
// changes shade of red and tells computer its hoverd over
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
// creates a grey rectangle with writing inside
  exitInitialize(){
    fill(this.grey);
    rect(this.x,this.y,this.w,this.h);
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(this.h);
    text(this.message, this.x+this.w/2,this.y+this.h/2);
    textAlign(LEFT,BASELINE);
  }
// tells computer its hoverd over and changes tone of grey
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
// creates a grey square
  towerBaseInitialize(){
    fill(this.grey);
    rect(this.x,this.y,this.w,this.h,10,10,10,10);
  }
// shows which tower you would get if you chose this square
  towerInitialize(){
    textSize(25);
    fill(0);
    if (this.message === 0){
      text("Basic",this.x+25,this.y-10);
      text("200$",this.x+this.w/4,this.y+this.h+20);
      fill(255);
    }
    if(this.message === 1){
      text("Sprayer",this.x+15,this.y-10);
      text("400$",this.x+this.w/4,this.y+this.h+20);
      fill(color(200,0,0));
    }
    if(this.message === 2){
      text("sniper",this.x+15,this.y-10);
      text("600$",this.x+this.w/4,this.y+this.h+20);
      fill(color(0,100,255));
    }
    if(this.message === 3){
      text("piercer",this.x+15,this.y-10);
      text("800$",this.x+this.w/4,this.y+this.h+20);
      fill(color(255,20,147));
    }
    circle(this.x+this.w/2,this.y+this.h/2,this.w*0.9);
  }
// if hoverd over changes the grey tone then tells computer your tower choice
  towerHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      this.grey = 100;
      towerChoice = this.message;
    }
    else{
      this.grey = 200;
    }
  }
// draws a red square with a garbage bin ontop
  sellInitialize(){
    fill(this.r,0,0);
    rect(this.x,this.y,this.w,this.h,10,10,10,10);
    fill(0);
    image(deleteBin,this.x,this.y,this.w,this.h);
  }
// changes the shade of red and tells computer you are hovered over
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
// tells computer if you are hovered over and changes shade of red
  sellHoverOver(){
    if(mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+this.h){
      this.r  = 200;
      sell = true;
      exitUpgrades = true;
    }
    else{
      this.r = 255;
      sell = false;
    }
  }
// creates a rectangle with the current targeting option and two quares on either side which change the targeting option
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
// check whick of the squares your hovering over and tells the computer the corresponding choice it also changes the shade of grey of the one your hovering over
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
// all of these just pair the initializes with the right hoverOver and puts it in a nice on line function
  sellAction(){
    this.sellHoverOver();
    this.sellInitialize();
  }

  deleteAction(){
    this.deleteHoverOver();
    this.exitUpgradesInitialize();
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