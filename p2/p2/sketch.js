function setup() {
  createCanvas(550, 550);
  strokeCap(SQUARE);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  const circleResolution = map(mouseY, 0, height, 2, 80);
  const radius = mouseX - width / 2 + 0.5;
  const angle = TWO_PI / circleResolution;

  strokeWeight(mouseY / 20);

  beginShape();
  for (let i = 0; i <= circleResolution; i += 1) {
    const x = cos(angle * i) * radius;
    const y = sin(angle * i) * radius;
    line(0, 0, x, y);
  }
  endShape(CLOSE);
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }
}