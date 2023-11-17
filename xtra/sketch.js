// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  // dogTreats();
  createFrame();
}
function dogTreats(){
  let S = floor(random(11));
  let M = floor(random(11));
  let L = floor(random(11));
  let happiness = 1*S + 2*M + 3*L;
  print(S,M,L);
  if(happiness>=10){
    print("Barley is Happy");
  }
  else{
    print("Barley is sad");
  }
}

function createFrame(){
  let N = floor(random(2,101));
  for(let num = 0;num<N;num++){
  }
}