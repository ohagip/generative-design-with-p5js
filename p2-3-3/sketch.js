let drawMode = 1;
let x = 0;
let y = 0;
let stepSize = 5.0;

let font = 'Georgia';
let letters = 'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.';
let fontSizeMin = 3;
let angleDistortion = 0.0;

let counter = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(255);
  cursor(CROSS);

  x = mouseX;
  y = mouseY;

  textFont(font);
  textAlign(LEFT);
  fill(0);
}

function draw() {
  if (mouseIsPressed && mouseButton === LEFT) {
    let d = dist(x, y, mouseX, mouseY);
    textSize(fontSizeMin + d / 2);
    let newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      let angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
      if (counter >= letters.length) {
        counter = 0;
      }

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    angleDistortion += 0.1;
  }
  if (keyCode === DOWN_ARROW) {
    angleDistortion -= 0.1;
  }
}

function keyReleased() {
  if (key === 's' || key === 'S') {
    saveCanvas(gd.timestamp(), 'png');
  }
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    background(255);
  }
}