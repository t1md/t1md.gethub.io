// CS30 - Final Programming Challenge
// Complete this comment header - - - (it's being graded!)
//
//
//
//
//

//variable declarations - included for convenience, but you don't have to use these.
//                        feel free to handle this in a different way if you prefer.

let staticImages = [];      //array to hold 1 image for each direction -> should use this to start  
let animationImagesLeft = [];   //array to hold all 8 images in left direction
let animationImagesRight = [];   //array to hold all 8 images in right direction
let animationImagesUp = [];   //array to hold all 8 images in up direction
let animationImagesDown = [];   //array to hold all 8 images in down direction
let fox;
let pepsi = false;
let baseSize = 1

function preload(){
  loadStatic();     //defined at bottom
  loadAnimation();  //also defined at bottom

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fox = new Fox(width/2,height/2,0,1);
}

function draw() {
  background(220);
  fox.drawFox();
  movement();
  if(pepsi !== false){
    pepsiMode()
  }
  else{
    fox.tint = false
  }
}


function loadStatic(){
  staticImages.push(loadImage("/assets/left1.png"));   //0 - left
  staticImages.push(loadImage("/assets/right1.png"));   //1 - right
  staticImages.push(loadImage("/assets/up1.png"));   //2 - up
  staticImages.push(loadImage("/assets/down1.png"));   //3 - down
}

function loadAnimation(){
  for(let i = 1; i <= 8; i++){  //LEFT
    animationImagesLeft.push(loadImage("/assets/left" + i + ".png"));
  }

  for(let i = 1; i <= 8; i++){  //RIGHT
    animationImagesRight.push(loadImage("/assets/right" + i + ".png"));
  }

  for(let i = 1; i <= 8; i++){  //UP
    animationImagesUp.push(loadImage("/assets/up" + i + ".png"));
  }

  for(let i = 1; i <= 8; i++){  //DOWN
    animationImagesDown.push(loadImage("/assets/down" + i + ".png"));
  }
}

function movement(){
  if(keyIsDown(87)){
    fox.direction = 2
    fox.speed.y = -10
  }
  if(keyIsDown(65)){
    fox.direction = 0
    fox.speed.x = -10
  }
  if(keyIsDown(83)){
    fox.direction = 3
    fox.speed.y = 10
  }
  if(keyIsDown(68)){
    fox.direction = 1 
    fox.speed.x = 10
  }
  fox.movement();
  fox.speed.x = 0;
  fox.speed.y = 0;
}

function pepsiMode(){
fox.tint = color(random(0,256),random(0,256),random(0,256))
let num = random(-0.2,0.3)
fox.size+=num
if(fox.size>=baseSize+1 || fox.size<=baseSize-1)
fox.size-=num
}

function keyTyped(){
  if(key === 'p'){
    if(pepsi === false){
    pepsi = true
    }
  
  else{
    pepsi = false
  }
}
if(key === 'r'){
  pepsi = false
  baseSize = 1
}
}

function mousePressed(){
  if(mouseY>=height/2){
    baseSize-=0.1
  }
  if(mouseY<=height/2){
    baseSize+=0.1
  }
}

class Fox{
  constructor(x,y,direction,size){
    this.position = createVector(x,y)
    this.speed = createVector(0,0);
    this.direction = direction
    this.size = size
    this.tint = false
  }
  drawFox(){
    if (this.tint === false){
      noTint();
      this.size = baseSize
    }
    else{
      tint(this.tint)
    }
    push();
    translate(this.position.x, this.position.y);
    scale(this.size);
    imageMode(CENTER); 
    image(staticImages[this.direction], 0, 0);
    pop();
  }
  
  movement(){
    this.position.add(this.speed);
    
  }
}