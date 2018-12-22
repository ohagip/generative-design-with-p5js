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
let drawMode = 1;

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

  if (filled) {
    fill(random(255));
  } else {
    noFill();
  }

  switch (drawMode) {
    case 1: // circle
      beginShape();
      curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);

      for (let i = 0; i < formResolution; i += 1) {
        curveVertex(x[i] + centerX, y[i] + centerY);
      }
      curveVertex(x[0] + centerX, y[0] + centerY);

      curveVertex(x[1] + centerX, y[1] + centerY);
      endShape();
      break;
    case 2: // line
      beginShape();
      curveVertex(x[0] + centerX, y[0] + centerY);

      for (let i = 0; i < formResolution; i += 1) {
        curveVertex(x[i] + centerX, y[i] + centerY);
      }

      curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY);
      endShape();
      break;
  }
}

function mousePressed() {
  centerX = mouseX;
  centerY = mouseY;

  switch (drawMode) {
    case 1: // circle
      var angle = radians(360 / formResolution);
      var radius = initRadius * random(0.5, 1);
      for (let i = 0; i < formResolution; i += 1) {
        x[i] = cos(angle * i) * radius;
        y[i] = sin(angle * i) * radius;
      }
      break;
    case 2: // line
      var radius = initRadius * random(0.5, 5);
      var angle = random(PI);

      var x1 = cos(angle) * radius;
      var y1 = sin(angle) * radius;
      var x2 = cos(angle - PI) * radius;
      var y2 = sin(angle - PI) * radius;
      for (let i = 0; i < formResolution; i += 1) {
        x[i] = lerp(x1, x2, i / formResolution);
        y[i] = lerp(y1, y2, i / formResolution);
      }
      break;
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

  if (key === '3') {
    drawMode = 1;
  }
  if (key === '4') {
    drawMode = 2;
  }

  if (keyCode === UP_ARROW) {
    stepSize += 1;
  }
  if (keyCode === DOWN_ARROW) {
    stepSize -= 1;
  }
  stepSize = max(stepSize, 1);

  if (key === 'f' || key === 'F') {
    freeze = !freeze;
  }
  if (freeze === true) {
    noLoop();
  } else {
    loop();
  }
}