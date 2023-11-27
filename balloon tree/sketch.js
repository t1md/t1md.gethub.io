// balloon tree
// Timothy Dobson
// 11/24/2023

// in this program it craetes a tree that branches into three every time 
// it goes up and puts a leaf with a randomized color and size but the 
// size has a higer chance to get smaller as you go up this program allows
// you to change the width of the tree by moving the mouse from side to side
// and change how many leaves there are with the keys "z" and "x" the branches
// also get smaller the higher up it goes

// global variables
let mult = 15;
let num;
let seedNum;
let leafDepth = 5;

// creates canvas and finds a random number for the random seed
function setup() {
  createCanvas(500, 500);
  background(255);
  seedNum = random(9999999999);
}

//draws a white background, resets the random seed, runs the program 
// and maps the mouse
function draw() {
  background(255);
  randomSeed(seedNum);
  drawTree(width/2, height*0.8, 90, 6);
  num = map(mouseX,0,500,18,35);
}

// gets the strokeweight so it gets smallet the higher and draws the lines
function drawLine( x1, y1, x2, y2, depth) {
  strokeWeight(depth-depth/5);
  line(x1, y1, x2, y2);
}

// draws a tree with a recursive function by getting the second x,y for the
// lines and then drawing a line using them then using these numbers
// in the location of the first x,y stars over using changed numbers 
// such as angle and depth to make the lines different it also draws
// a leaf at the end of the lines
function drawTree(x1, y1, angle, depth) {
  if (depth > 0) {
    stroke(0);
    let x2 = x1 + cos(radians(angle))*depth*mult;
    let y2 = y1 - sin(radians(angle))*depth*mult; 
    drawLine(x1, y1, x2, y2, depth);
    drawTree(x2, y2, angle-num, depth-1);
    drawTree(x2, y2, angle+num, depth-1);
    drawTree(x2, y2, angle, depth-1);
    drawleaf(x2,y2,depth);
  }
}

// draws a randomly colored cicle 'or leaf' at the givin positions
function drawleaf(x,y,depth){
  if(depth<leafDepth){
    noStroke();
    fill(random(255),random(255),random(255));
    circle(x,y,randomGaussian(depth*8,6));
  }
}

// changes the minimum and maximum depth it will draw leaves with the 
// buttons "z" and "x"
function keyPressed(){
  if(key === "z" && leafDepth>1){
    leafDepth-=1;
  }
  if(key === "x" && leafDepth<7){
    leafDepth+=1;
  }
}