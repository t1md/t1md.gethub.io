// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let nodecolors = [];
let colorindex = 0;
let a,b,c;

function setup() {
  createCanvas(windowWidth, windowHeight);
  innitcolors();
  textAlign(CENTER);
}

function draw() {
  background(220);
  rendernodes();
}

function rendernodes(){
  // draw two nodes with circles connect line
  stroke(nodecolors[colorindex]);
  fill(nodecolors[colorindex]);
  line(mouseX,mouseY,width/2,height/2);
  circle(width/2,height/2,20);
  circle(mouseX,mouseY,20);
  let d =segmentdistance(width/2,mouseX,height/2,mouseY);
  text(round(d,1),mouseX,mouseY+30);
}

function innitcolors(){
  nodecolors.push(color("red"));
  nodecolors.push(color(200,100,0));
  nodecolors.push(color("blue"));
}

function mouseWheel(event){
  if(event.delta>0){
    colorindex+=1;
    if(colorindex>nodecolors.length-1){
      colorindex=0;
    }
  }
  if(event.delta<0){
    colorindex-=1;
    if(colorindex<0){
      colorindex=nodecolors.length-1;
    }
  }
}
function segmentdistance(x1,x2,y1,y2){
  a = Math.abs(x1-x2);
  b = Math.abs(y1-y2);
  c= Math.sqrt(a*a+b*b);
  return c;
}