// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectHeight = 10;
let rectWidth = 50;

let hexCodes = ["#FE4365","#FC9D9A","#F9CDAD","#C8C8A9","#83AF9B"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  drawColRGB(width*0.1);
  drawColHSB(width*0.4);
  drawColPallet(width*0.7);
}

function drawColRGB(xPos){
  colorMode(RGB);
  for(let y = 0;y<height;y+=rectHeight){
    fill(color(random(255),random(255),random(255)));
    rect(xPos,y,rectWidth,rectHeight)
  }
}

function drawColHSB(xPos){
  colorMode(HSB,height);
  for(let y = 0;y<height;y+=rectHeight){
    fill(color(y,height,height));
    rect(xPos,y,rectWidth,rectHeight);
  }
}

function drawColPallet(xPos){
  colorMode(RGB);
  let counter = 0;
  for(let y = 0;y<height;y+=rectHeight){
    fill(color(hexCodes[counter%4]));
    rect(xPos,y,rectWidth,rectHeight);
    counter++;
    fill(color(hexCodes[Math.floor(random(hexCodes.length))]));
    rect(xPos+rectWidth,y,rectWidth,rectHeight);
  }
}
// function draw() {
//   background(220);
// }
