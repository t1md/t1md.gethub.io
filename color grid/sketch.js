// multi-colour grid
// timothy dobson
//
//this program makes a gri dof perfect squares that are completly random 
//colors on screen allownig you to change there size which also changes
//their colours.

// global variables
let bg;
let sqrheight, sqrwidth;
let r,g,b;
let sqrnum,num ;
let x,y;

function setup() {
  //starts the program
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  sqrnum = 10,
  sqrdraw();
}

function sqrdraw(){
  //draws perfect squares througout the whole screen 
  background(0);
  //finds the size of the squares according to the screen size and the
  //number of squares wanted along the top
  sqrwidth = width/sqrnum;
  num = map(sqrnum,0,width,0,height);
  sqrheight = height/num;
  for (x = 0;x<width;x+=sqrwidth){
    for (y = 0;y<height;y+=sqrheight){
      //randomizes the colour
      r = random(0,256);
      g = random(0,256);
      b = random(0,256);
      fill(r,g,b);
      //makes sure they dont go over the edge and draws squares
      if (sqrheight+y<height){
        square(x,y,sqrwidth);
      }

    }
  }
}
function mousePressed(event){
  //changes the amount of squares you want along the top according to 
  //mouse presses then runs "sqrdraw"
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

function keyPressed(event){
  //when a key is pressed it'll redraw thus giving new colours
  if (event){
    sqrdraw();
  } 
  return false;
}
