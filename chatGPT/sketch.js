// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let overlay;
let shape;
let shapeType = 'rectangle'; // Default shape type
let backgroundColor = 255; // Default background color

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(windowWidth, windowHeight);
  overlay.rectMode(CENTER);
}

function draw() {
  background(backgroundColor);

  if (shapeType === 'rectangle') {
    overlay.rect(mouseX, mouseY, 100, 100);
  } else if (shapeType === 'ellipse') {
    overlay.ellipse(mouseX, mouseY, 100, 100);
  } else if (shapeType === 'triangle') {
    overlay.triangle(
      mouseX, mouseY - 50,
      mouseX - 50, mouseY + 50,
      mouseX + 50, mouseY + 50
    );
  }

  image(overlay, 0, 0);
  myname();
}

function myname() {
  fill(0);
  textSize(20);
  text("Timothy Dobson", width * 0.84, height * 0.99);
}

function keyPressed() {
  if (key === 'a') {
    shapeType = 'rectangle';
  } else if (key === 's') {
    shapeType = 'ellipse';
  } else if (key === 'd') {
    shapeType = 'triangle';
  } else if (key === 'c') {
    // Generate a random fill color
    let r = random(256);
    let g = random(256);
    let b = random(256);
    overlay.fill(r, g, b);
  } else if (key === ' ') {
    // Clear the overlay
    overlay.background(backgroundColor);
  }

  // Prevent the default behavior of keys
  return false;
}