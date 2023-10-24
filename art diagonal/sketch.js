// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let spacing = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  grid();
}

// function draw() {
//   background(220);
// }

function grid(){
  for(let x = 0;x<width;x+=spacing){
    for(let y = 0;y<height;y+=spacing){
      let d = round(random(1));
      if(d === 1){
        line(x-spacing/2,y-spacing/2,x+spacing/2,y+spacing/2);
      }
      else{
        line(x-spacing/2,y+spacing/2,x+spacing/2,y-spacing/2);
      }
    }
  }
}