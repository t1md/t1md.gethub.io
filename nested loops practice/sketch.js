// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let sqrcount = 9 ;
let wh,ww;

function setup() {
  createCanvas(windowWidth, windowHeight);
  wh = height/sqrcount;
  ww = width/sqrcount;
}

function draw() {
  background(220);
  chess();
}


function chess(){
  for(let i = 0; i< sqrcount ; i+=1){
    for(let j = 0; j<sqrcount ; j+= 1){
      ww= ww*i;
      wh*j;
      rect(ww,wh,100,100);
    }
  }
}