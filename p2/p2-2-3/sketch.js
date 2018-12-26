let formResolution = 15;
let stepSize = 2;
let distortionFactor = 1;
let initRadius = 150;
let centerX;
let centerY;
let x = [];
let y = [];

let filled = false;
let freeze = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  centerX = width / 2;
  centerY = height / 2;
  const angle = radians(360 / formResolution);
  for (let i = 0; i < formResolution; i += 1) {
    x.push(cos(angle * i) * initRadius);
    y.push(sin(angle * i) * initRadius);
  }

  stroke(0, 50);
  strokeWeight(0.75);
  background(255);
}

function draw() {
  centerX += (mouseX - centerX) * 0.01;
  centerY += (mouseY - centerY) * 0.01;

  for (let i = 0; i < formResolution; i += 1) {
    x[i] += random(-stepSize, stepSize);
    y[i] += random(-stepSize, stepSize);
  }

  if (filled === true) {
    fill(random(255));
  } else {
    noFill();
  }

  beginShape();
  curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);
  for (let i = 0; i < formResolution; i += 1) {
    curveVertex(x[i] + centerX, y[i] + centerY);
  }
  curveVertex(x[0] + centerX, y[0] + centerY);
  curveVertex(x[1] + centerX, y[1] + centerY);
  endShape();
}

function mousePressed() {
  centerX = mouseX;
  centerY = mouseY;
  const angle = radians(360 / formResolution);
  for (let i = 0; i < formResolution; i++) {
    x[i] = cos(angle * i) * initRadius;
    y[i] = sin(angle * i) * initRadius;
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    background(255);
  }

  if (key === '1') {
    filled = false;
  }
  if (key === '2') {
    filled = true;
  }

  if (key === 'f' || key === 'F') {
    freeze = !freeze;
  }
  if (freeze === true) {
    noLoop();
  } else {
    loop();
  }
}