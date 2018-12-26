let strokeColor;

function setup() {
  createCanvas(550, 550);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  // background(255);
  strokeWeight(2);
  stroke(0, 25);
  strokeColor = color(0, 10);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    push();
    translate(width / 2, height / 2);

    const circleResolution = int(map(mouseY + 100, 0, height, 2, 10));
    const radius = mouseX - width / 2;
    const angle = TAU / circleResolution;

    stroke(strokeColor);

    beginShape();
    for (let i = 0; i <= circleResolution; i += 1) {
      const x = cos(angle * i) * radius;
      const y = sin(angle * i) * radius;
      vertex(x, y);
    }
    endShape();

    pop();
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    background(0, 0, 100);
  }

  if (key === '1') {
    strokeColor = color(0, 10);
  }
  if (key === '2') {
    strokeColor = color(192, 100, 64, 10);
  }
  if (key === '3') {
    strokeColor = color(52, 100, 71, 10);
  }
}