let circles = [];

const minRadius = 3;
const maxRadius = 50;

let mouseRect = 15;

let freeze = false;

let showCircle = true;
let showLine = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  cursor(CROSS);
  ellipseMode(RADIUS);
  rectMode(RADIUS);
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  Circle.prototype.draw = function() {
    stroke(0);
    strokeWeight(1.5);
    ellipse(this.x, this.y, this.r);
  };
}

function draw() {
  background(255);

  let newX = random(maxRadius, width - maxRadius);
  let newY = random(maxRadius, height - maxRadius);
  if (mouseIsPressed && mouseButton === LEFT) {
    newX = random(mouseX - mouseRect, mouseX + mouseRect);
    newY = random(mouseY - mouseRect, mouseY + mouseRect);
  }

  let intersection = false;

  for (let newR = maxRadius; newR >= minRadius; newR -= 1) {
    for (let i = 0; i < circles.length; i += 1) {
      const d = dist(newX, newY, circles[i].x, circles[i].y);
      intersection = d < circles[i].r + newR;
      if (intersection === true) {
        break;
      }
    }
    if (intersection === false) {
      circles.push(new Circle(newX, newY, newR));
      break;
    }
  }

  for (let i = 0; i < circles.length; i += 1) {
    if (showLine === true) {
      let closestCircle;
      for (let j = 0; j < circles.length; j += 1) {
        const d = dist(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
        if (d <= circles[i].r + circles[j].r + 1) {
          closestCircle = circles[j];
          break;
        }
      }
      if (closestCircle !== undefined) {
        stroke(100, 230, 100);
        strokeWeight(0.75);
        line(circles[i].x, circles[i].y, closestCircle.x, closestCircle.y);
      }
    }

    if (showCircle === true) {
      circles[i].draw();
    }
  }

  if (mouseIsPressed === true && mouseButton === LEFT) {
    stroke(100, 230, 100);
    strokeWeight(2);
    rect(mouseX, mouseY, mouseRect, mouseRect);
  }
}


function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }

  if (keyCode === UP_ARROW) {
    mouseRect += 4;
  }
  if (keyCode === DOWN_ARROW) {
    mouseRect -= 4;
  }

  if (key === 'f' || key === 'F') {
    freeze = !freeze;
    if (freeze === true) {
      noLoop();
    } else {
      loop();
    }
  }

  if (key === '1') {
    showCircle = !showCircle;
  }
  if (key === '2') {
    showLine = !showLine;
  }
}