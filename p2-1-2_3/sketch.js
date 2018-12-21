const tileCount = 20;

let moduleColor;
let moduleAlpha = 180;
let maxDistance = 500;

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(3);
  moduleColor = color(0, 0, 0, moduleAlpha);
}

function draw() {
  clear();
  stroke(moduleColor);

  for (let gridY = 0; gridY < width; gridY += 25) {
    for (let gridX = 0; gridX < height; gridX += 25) {
      let diameter = dist(mouseX, mouseY, gridX, gridY);
      diameter = diameter / maxDistance * 40;
      push();
      translate(gridX, gridY, diameter * 5);
      rect(0, 0, diameter, diameter); // also nice: ellipse(...)
      pop();
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('canvas', 'png');
  }
}