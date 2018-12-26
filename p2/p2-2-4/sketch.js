const maxCount = 5000;
let currentCount = 1;
let x = [];
let y = [];
let r = [];

function setup() {
  createCanvas(800, 800);
  strokeWeight(0.5);

  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 10;
}

function draw() {
  clear();

  const newR = random(1, 7);
  const newX = random(newR, width - newR);
  const newY = random(newR, height - newR);

  let closestDist = Number.MAX_VALUE;
  let closestIndex = 0;
  // which circle is the closest?
  for (let i = 0; i < currentCount; i += 1) {
    const newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }

  // show original position of the circle and a line to the new position
  fill(230);
  ellipse(newX, newY, newR * 2, newR * 2);
  line(newX, newY, x[closestIndex], y[closestIndex]);

  const angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount += 1;

  for (let i = 0; i < currentCount; i++) {
    fill(50);
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
}