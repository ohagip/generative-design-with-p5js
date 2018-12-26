let circles = [];

const minRadius = 3;
const maxRadius = 50;

let mouseRect = 15;

let freeze = false;

let module1;
let module2;

let showCircle = true;
let showLine = true;
let showSVG = true;

function preload() {
  module1 = loadImage('data/01.svg');
  module2 = loadImage('data/02.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  cursor(CROSS);
  ellipseMode(RADIUS);
  rectMode(RADIUS);
  imageMode(CENTER);
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.rotation = random(TAU);


  Circle.prototype.draw = function() {
    if (showSVG === true) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      if (this.r === maxRadius) {
        image(module1, 0, 0, this.r * 2, this.r * 2);
      } else {
        image(module2, 0, 0, this.r * 2, this.r * 2);
      }
      pop();
    }
    if (showCircle === true) {
      stroke(0);
      strokeWeight(1.5);
      ellipse(this.x, this.y, this.r);
    }
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

  circles.forEach(function(circle) {
    if (showLine === true) {
      const closestCircle = circles.find(function(otherCircle) {
        return dist(circle.x, circle.y, otherCircle.x, otherCircle.y) <= circle.r + otherCircle.r + 1;
      });

      if (closestCircle) {
        stroke(100, 230, 100);
        strokeWeight(0.75);
        line(circle.x, circle.y, closestCircle.x, closestCircle.y);
      }
    }

    circle.draw();
  });

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
  if (key === '3') {
    showSVG = !showSVG;
  }
}