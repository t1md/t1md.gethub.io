// cars cars cars
// timothy dobson
// 10/20/2023
//
//this creates cars that goe across the road then wrap the screen 
//continously it allws you to add cars with left click
//and shift+leftclick and stop them with the space bar and with the 
//traffic light

// global variables
let recty, rectheight;
let eastBound = [];
let westBound = [];
let count = 20;
let myTraffic;
let stopped = false;
let counter = 0;

//this sets it up and places all the cars into the proper array according
//to which direction there going and makes the trafficlight
function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i<count;i++){
    eastBound.push(new Vehicle(1));
  }
  for(let i = 0; i<count;i++){
    westBound.push(new Vehicle(0));
  }
  myTraffic = new TrafficLight(100,100,1);
}

//this draws the raod all the cars and the trafficlight
function draw() {
  background(200);
  drawRoad();
  for(let e of eastBound){
    e.action();
  }
  for(let w of westBound){
    w.action();
  }
  myTraffic.drawLight();
}

//this draws a road in the middle of the screen with a dotted yellow 
// line across the middle it also changes the rect mode
function drawRoad(){
  rectMode(RADIUS);
  fill(0);
  rect(width/2,height/2,width,height*0.2);
  fill(color("yellow"));
  for( let i = 0; i<width; i+=30){
    rect(i+10,height/2,11,1.5);
  }

  //this stops the cars by changing the light to red with a space bar press
}
function keyPressed(){ 
  if(keyCode === 32){
    myTraffic.stop();
  }
}

//this adds cars according to if you press the shift button while pressing
// left click addin more going left if yes and more right if no
function mouseClicked(){
  if(keyIsPressed && keyCode===SHIFT){
    westBound.push(new Vehicle(0));
  }
  else{
    eastBound.push(new Vehicle(1));
  }
}

//this is the class for vehicle
class Vehicle{

  //takes the direction and puts it in the right side of the road
  // puts it on a random x position along the road gives them a random 
  // type color and sets the base speed to 10
  constructor(direction){
    this.x = random(0,width);
    if (direction === 1 ){
      this.y = random(height/2+15,height/2+height*0.2-15);
    }
    else if(direction === 0){
      this.y = random(height/2-height*0.2+15,height/2-15,);
    }
    this.type = round(random(3));
    this.color = color(random(255),random(255),random(255));
    this.direction = direction;
    this.speed = 10;
  }

  //draws the type of car with a 3:1 chance of it being a car
  display(){
    if(this.type === 0){
      drawVan(this.x,this.y,this.color,this.direction);
    }
    else{
      drawCar(this.x,this.y,this.color,);
    }
  }

  // moves the car according to the cars current speed and wraps the 
  // screen upon reaching the edge
  move(){
    if(this.direction === 1){
      this.x+=this.speed;
      if(this.x>width){
        this.x = 0;
      }
    }
    else if(this.direction === 0){
      this.x-=this.speed;
      if(this.x<0){
        this.x = width;
      }
    }
  }
  //increases the speed with a max of 15
  speedup(){
    if(this.speed<15){
      this.speed+=1;
    }
  }
  //decreases the speed with a min of 1
  speeddown(){
    if(this.speed>1){
      this.speed-=1;
    }
  }
  // sets the color to a random color
  changecolor(){
    this.color = color(random(255),random(255),random(255));
  }

  // unless theres a red light moves the vehicle then
  //  has a 1 in 100 cahnce each time to raise the speed or lower the 
  // speed and to change the color i then no matter what draws the car 
  action(){
    if (stopped === false){
      this.move();
      if (Math.random() > 0.99){
        this.speedup();
      }
      if (Math.random() > 0.99){
        this.speeddown();
      }
      if (Math.random() > 0.99){
        this.changecolor();
      }
    }
    this.display();
  }

}
//tells what a car looks like
function drawCar(x,y,color){
  fill(255);
  rect(x+12,y-8,6,4);
  rect(x+12,y+8,6,4);
  rect(x-12,y-8,6,4);
  rect(x-12,y+8,6,4);
  fill(color);
  rect(x,y,20,9);
}
//tells what a van looks like
function drawVan(x,y,color,direction){
  fill(color);
  if (direction === 1){
    rect(x,y,11,11);
    rect(x-10,y,12,11);
  }
  else if(direction === 0){
    rect(x,y,11,11);
    rect(x+10,y,12,11);
  }
}
//this is the trafficlight
class TrafficLight{
//takes the x,y position you want it
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  //draws the background of light to be yellow then draws a red or green
  // light depending on if the cars need to be stopped and fills the other 
  // with white when stpped it counts how long and when its been 120 frames
  // it changes the light to green
  drawLight(){ 
    fill(color("yellow"));
    rect(this.x,this.y,20,40);
    fill(255);
    if(stopped === true){
      fill(color("red"));
      counter++;
      if (counter>=120){
        stopped = false;
      }
    }
    circle(this.x,this.y-18,30);
    fill(255);
    if(stopped === false){
      fill(color("green"));
    }
    circle(this.x,this.y+18,30);
  }
  //stops the cars when called and sets the counter to 0
  stop(){
    counter = 0;
    stopped = true;
  }

}