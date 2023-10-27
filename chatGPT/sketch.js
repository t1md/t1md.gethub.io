let numSinusoids = 90;
let amplitude = 50;
let timeScale = 0.02;

function setup() {
  createCanvas(800, 400);
  noLoop();
}

function draw() {
  background(255);

  for (let i = 0; i < numSinusoids; i++) {
    let phase = (i / numSinusoids) * TWO_PI;
    let frequencyScale = 0.02 + (i / numSinusoids) * 0.02; // Linearly increasing frequency
    drawSinusoid(phase, frequencyScale);
  }
}

function drawSinusoid(phase, frequencyScale) {
  beginShape();
  noFill();
  stroke(0);

  for (let x = 0; x < width; x++) {
    let y = amplitude * sin(x * frequencyScale + phase + millis() * timeScale);
    vertex(x, height / 2 + y);
  }

  endShape();
}