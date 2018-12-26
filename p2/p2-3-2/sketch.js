let drawMode = 1;

let col;
let x = 0;
let y = 0;
let stepSize = 5.0;
let lineLength = 25;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255);
  col = color(random(255), random(255), random(255), random(100));
  x = mouseX;
  y = mouseY;
  cursor(CROSS);
}

function draw() {
  if (mouseIsPressed && mouseButton === LEFT) {
    let d = dist(x, y, mouseX, mouseY);

    if (d > stepSize) {
      let angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      rotate(angle);
      stroke(col);
      if (frameCount % 2 === 0) {
        stroke(150);
      }
      line(0, 0, 0, lineLength * random(0.95, 1) * d / 10);
      pop();

      if (drawMode === 1) {
        x = x + cos(angle) * stepSize;
        y = y + sin(angle) * stepSize;
      } else {
        x = mouseX;
        y = mouseY;
      }
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  col = color(random(255), random(255), random(255), random(100));
  // lineLength = random(15, 50);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    lineLength += 5;
  }
  if (keyCode === DOWN_ARROW) {
    lineLength -= 5;
  }
}

function keyReleased() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    background(255);
  }

  if (key === '1') {
    drawMode = 1;
  }
  if (key === '2') {
    drawMode = 2;
  }
}