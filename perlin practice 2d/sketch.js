// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let inc = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let yoff = 0;
  loadPixels();
  for(let x = 0;x<width;x++){
    let xoff = 0;
    for(let y = 0;y<height;y++){
      let index = (x+y*width)*4;
      let r = noise(xoff,yoff)*255;
      pixels[index+0] = r;
      pixels[index+1] = r;
      pixels[index+2] = r;
      pixels[index+3] = 255;
      xoff+=inc;
    }
    yoff+=inc;
  }
  updatePixels();
}
