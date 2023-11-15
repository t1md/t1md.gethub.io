// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tiles = [];
let playerX = 3;
let playerY = 4;
let colums = 5;
let rows = 5;
let tileSize = 100;
let level= [
[0,0,0,1,0],
[0,1,0,0,0],
[0,0,1,0,0],
[1,0,0,0,1],
[0,1,0,0,0]
];

function preload(){
  for (let i = 0;i<3;i++){
    tiles.push(loadImage("assets/"+i+".png"));
  }

}

function setup() {
  createCanvas(colums*tileSize, rows*tileSize);
  level[playerY][playerX] = 2;
}
function render(){
  for(let y = 0;y<rows;y++){
    for(let x = 0;x<colums;x++){
      let currentItem = level[y][x];
      image(tiles[currentItem],x*tileSize,y*tileSize);
    }
  }
}

function draw() {
  render();
}

function swap(x1,y1,x2,y2){
  let temp = level[y1][x1];
  level[y1][x1] = level[y2][x2];
  level[y2][x2] = temp;
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    swap(playerX,playerY,playerX,playerY+1);
    playerY--;
    
  }

}