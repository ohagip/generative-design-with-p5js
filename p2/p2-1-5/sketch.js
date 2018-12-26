let drawMode = 1;

function setup() {
  createCanvas(800, 800);
  noFill();
}

function overlay() {
  const w = width - 100;
  const h = height - 100;

  if (drawMode === 1) {
    for (let i = -w / 2; i < w / 2; i += 5) {
      line(i, -h / 2, i, h / 2);
    }
  } else if (drawMode === 2) {
    for (let i = 0; i < w; i += 10) {
      ellipse(0, 0, i);
    }
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  strokeWeight(3);
  overlay();

  const x = map(mouseX, 0, width, -50, 50);
  const a = map(mouseX, 0, width, -0.5, 0.5);
  const s = map(mouseY, 0, height, 0.7, 1);

  if (drawMode === 1) rotate(a);
  if (drawMode === 2) translate(x, 0);
  scale(s);

  strokeWeight(2);
  overlay();
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }

  if (key === '1') {
    drawMode = 1;
  }
  if (key === '2') {
    drawMode = 2;
  }
}