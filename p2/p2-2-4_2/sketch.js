const maxCount = 5000;
let currentCount = 1;
let x = [];
let y = [];
let r = [];
let x2 = [];
let y2 = [];
let drawGhosts = false;

function setup() {
  createCanvas(800, 800);
  strokeWeight(0.5);

  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 10;
}

function draw() {
  clear();

  strokeWeight(0.5);
  noFill();

  const newR = random(1, 7);
  const newX = random(newR, width - newR);
  const newY = random(newR, height - newR);

  let closestDist = Number.MAX_VALUE;
  let closestIndex = 0;

  for (let i = 0; i < currentCount; i += 1) {
    const newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  const angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x2[currentCount] = newX;
  y2[currentCount] = newY;
  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;

  // draw circles at random position and lines
  if (drawGhosts === true) {
    for (let i = 1; i < currentCount; i += 1) {
      fill(230);
      ellipse(x2[i], y2[i], r[i] * 2, r[i] * 2);
      line(x2[i], y2[i], x[i], y[i]);
    }
  }

  for (let i = 0; i < currentCount; i += 1) {
    if (i === 0) {
      noFill();
    } else {
      fill(50);
    }
    ellipse(x[i], y[i], r[i] * 2, r[i] * 2);
  }

  if (currentCount >= maxCount) {
    noLoop();
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }

  if (key === '1') {
    drawGhosts = !drawGhosts;
  }
}