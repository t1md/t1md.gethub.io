// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let textFile;
let imageFile;
let colorImage;
let grid, rows, cols;
let colorMap;

function preload(){
  textFile = loadStrings("assets/info.txt");
  imageFile = loadStrings("assets/image.txt");
  colorImage = loadStrings("assets/colorImage.txt");
}

function setup() {
  cols = colorImage[0].length;
  rows = colorImage.length;
  createCanvas(windowWidth,windowHeight);

  grid = [];
  for(let i = 0;i<colorImage.length;i++){
    grid.push([...colorImage[i]]);
  }
  colorMap = new Map([["b","black"],["w","white"],["r","sienna"],
  ["l","peru"],["p",color(110,110,255)]]);
}

function renderGrid(){
  let cellWidth = width/cols;
  let cellHeight = height/rows;
  for(let x = 0;x<cols;x++){
    for(let y = 0;y<rows;y++){
      let currentKey = grid[y][x];
      fill(colorMap.get(currentKey));
      rect(x*cellWidth,y*cellHeight,cellWidth,cellHeight);
    }
  }
}

function windowResized(){
  createCanvas(windowWidth,windowHeight);
}


function draw(){
//   background(220);
  renderGrid();
}


// function one(){
//   print("split into words: ");
//   let stringSplit = textFile[0].split(" ");
//   print(stringSplit);
//   print("split into charecters: ");
//   let stringSplit2 = textFile[0].split("");
//   print(stringSplit2);
//   print("spread syntax for charectures: ");
//   let stringSpread = [...textFile[1]];
//   print(stringSpread);
//   print(textFile);
// }