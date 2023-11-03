// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let values = [];
let arraySize = 1000000;



function setup() {
  noCanvas();
  populate();
  print(values);
  selecSort();
  print(values);
}

function populate(){
  for (let i = 0; i<arraySize;i++){
    values.push(floor(random(1000)));
  }
}

function selecSort(){
  for (let index = 0;index<values.length;index++){
    let minimum = values[index];
    let minimumLoc = index;
    for(let search = index+1;search<values.length;search++){
      let cur = values[search];
      if(cur<minimum){
        minimum = cur;
        minimumLoc = search;
      }
    }
    let temp = values[index];
    values[index] = values[minimumLoc];
    values[minimumLoc] = temp;
  }
}