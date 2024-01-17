// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"




let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function setup() {
  let i=0;
  let i2 = 0
  for (let num of numbers) {
    i2++
    if (num === 5) {
      numbers.splice(numbers.indexOf(num), 1);
      i++
    }
    num = numbers[(i2-i)];
    print(num);

  }
}