// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bg;
let sqrheight, sqrwidth;
let r,g,b;
let sqrnum,num ;
let x,y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  sqrnum = 10,
  sqrdraw();
}

function draw() {
}

function sqrdraw(){
  background(255);
  sqrwidth = width/sqrnum;
  num = map(sqrnum,0,width,0,height);
  sqrheight = height/num;
  for (x = 0;x<width;x+=sqrwidth){
    for (y = 0;y<height;y+=sqrheight){
      r = random(0,256);
      g = random(0,256);
      b = random(0,256);
      fill(r,g,b);
      if (sqrheight+y<height){
        square(x,y,sqrwidth);
      }

    }
  }
}
function mousePressed(event){
  if(mouseButton === RIGHT){
    if (sqrnum>0){
      sqrnum-=1;
    }
    sqrdraw();
  }
  if(mouseButton === LEFT){
    sqrnum+=1; 
    sqrdraw();

  }
}
