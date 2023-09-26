// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg;
let sqrheight, sqrwidth;
let r,g,b;
let sqrnum;
let x,y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  sqrnum = 10;
  sqrwidth = width/sqrnum;
  sqrheight = map(y,0,height,0,width);
  sqrdraw();
}

function draw() {
}

function sqrdraw(){
  for (x = 0;x<width;x+=sqrwidth){
    for (y = 0;y<height;y+=sqrheight){
      r = random(0,256);
      g = random(0,256);
      b = random(0,256);
      fill(r,g,b);
      square(x,y,100);
    }
  }
}
function mousePressed(event){
  if(mouseButton === RIGHT){
    sqrnum-=1;
    sqrdraw();
  }
  if(mouseButton === LEFT){
    sqrnum+=1; 
    sqrdraw();

  }
}
