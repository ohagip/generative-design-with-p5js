let shape;

let joints = 5;
let lineLength = 100;
let speedRelation = 2;
let center;
let pendulumPath = [];
let angle = 0;
let maxAngle = 360;
let speed;

let showPendulum = true;
let showPendulumPath = true;

function startDrawing() {
  for (let i = 0; i < joints; i += 1) {
    pendulumPath.push([]);
  }

  angle = 0;
  speed = (8 / pow(1.75, joints - 1) / pow(2, speedRelation - 1));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(1);

  center = createVector(width / 2, height / 2);

  startDrawing();
}

function draw() {
  background(0, 0, 100);

  angle += speed;

  if (angle <= maxAngle + speed) {
    let pos = center.copy();

    for (let i = 0; i < joints; i += 1) {
      let a = angle * pow(speedRelation, i);
      if (i % 2 === 1) {
        a = -a;
      }
      const nextPos = p5.Vector.fromAngle(radians(a));
      nextPos.setMag((joints - i) / joints * lineLength);
      nextPos.add(pos);

      if (showPendulum === true) {
        noStroke();
        fill(0, 10);
        ellipse(pos.x, pos.y, 4, 4);
        noFill();
        stroke(0, 10);
        line(pos.x, pos.y, nextPos.x, nextPos.y);
      }

      pendulumPath[i].push(nextPos);
      pos = nextPos;
    }
  }

  if (showPendulumPath === true) {
    strokeWeight(1.6);
    for (let i = 0; i < pendulumPath.length; i += 1) {
      let path = pendulumPath[i];

      beginShape();
      const hue = map(i, 0, joints, 120, 360);
      stroke(hue, 80, 60, 50);
      for (let j = 0; j < path.length; j += 1) {
        vertex(path[j].x, path[j].y);
      }
      endShape();
    }
  }
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }

  if (keyCode === DELETE || keyCode === BACKSPACE) {
    startDrawing();
  }

  if (keyCode === UP_ARROW) {
    lineLength += 2;
    startDrawing();
  }
  if (keyCode === DOWN_ARROW) {
    lineLength -= 2;
    startDrawing();
  }
  if (keyCode === LEFT_ARROW) {
    joints -= 1;
    if (joints < 1) {
      joints = 1;
    }
    startDrawing();
  }
  if (keyCode === RIGHT_ARROW) {
    joints += 1;
    if (joints > 10) joints = 10;
    startDrawing();
  }

  if (key === '+') {
    speedRelation += 0.5;
    if (speedRelation > 5) speedRelation = 5;
    startDrawing();
  }
  if (key === '-') {
    speedRelation -= 0.5;
    if (speedRelation < 2) speedRelation = 2;
    startDrawing();
  }

  if (key === '1') {
    showPendulum = !showPendulum;
  }
  if (key === '2') {
    showPendulumPath = !showPendulumPath;
  }
}