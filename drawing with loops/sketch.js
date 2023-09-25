// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let numsegments =1000 ;
let segmentheight;
let bg = 0;
const GRIDSIZE = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  segmentheight = height/numsegments;
}

function gradient(){
  noStroke();
  for(let i = 0; i < numsegments;i++){
    let y = i *segmentheight;
    let grad = map(y,0,height,0,255);
    fill(grad,255,255-grad);
    rect(0,y,width,segmentheight);
  }
  stroke(0);
}
function selectbackground(){
if (bg === 0) gradient();
else if (bg ===1) background(255);
else background(60,240,120);
}

function mousePressed(event){
  print(mouseButton);
  if (mouseButton === LEFT){
    bg -=1;
    if(bg<0){
      bg = 2;
    }
  }
  if (mouseButton === RIGHT){
    bg +=1;
    if(bg>2){
      bg = 0;
    }
  } 

  return false;
}

function grid(){
  for (let x = 0;x<width;x+=GRIDSIZE){
    for(let y =0;y<height;y+=GRIDSIZE){
      fill(0);
      // circle(x,y,10);
      line(x,y,mouseX,mouseY);
    }
  }
}

function draw() {
  selectbackground();
  grid();

}
