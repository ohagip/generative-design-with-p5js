let letters = [];
let density = 2.5;
let ribbonWidth = 92;
let shapeColor;
let fontSize = 800;
let pathSimplification = 0;
let pathSampleFactor = 0.1;

let textTyped = 'a';

let font;

function preload() {
  font = loadFont('data/NotoSans-Bold.ttf');
}

function Letter(char, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;

  Letter.prototype.draw = function() {
    let path = font.textToPoints(this.char, this.x, this.y, fontSize, {sampleFactor: pathSampleFactor});
    stroke(shapeColor);

    for (let d = 0; d < ribbonWidth; d += density) {
      beginShape();

      for (let i = 0; i < path.length; i += 1) {
        let pos = path[i];
        let nextPos = path[i + 1];

        if (nextPos) {
          let p0 = createVector(pos.x, pos.y);
          let p1 = createVector(nextPos.x, nextPos.y);
          let v = p5.Vector.sub(p1, p0);
          v.normalize();
          v.rotate(HALF_PI);
          v.mult(d);
          let pneu = p5.Vector.add(p0, v);
          curveVertex(pneu.x, pneu.y);
        }
      }

      endShape(CLOSE);
    }
  };
}

function createLetters() {
  letters = [];
  let chars = textTyped.split('');

  let x = 0;
  for (let i = 0; i < chars.length; i += 1) {
    if (i > 0) {
      let charsBefore = textTyped.substring(0, i);
      x = font.textBounds(charsBefore, 0, 0, fontSize).w;
    }
    let newLetter = new Letter(chars[i], x, 0);
    letters.push(newLetter);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);
  shapeColor = color(0);

  createLetters();
}

function draw() {
  background(255);

  translate(100, height * 0.75);

  pathSampleFactor = 0.1 * pow(0.02, mouseX / width);
  ribbonWidth = map(mouseY, 0, height, 1, 200);

  for (let i = 0; i < letters.length; i += 1) {
    letters[i].draw();
  }
}

function keyReleased() {
  if (keyCode === CONTROL) {
    saveCanvas('canvas', 'png');
  }

  if (keyCode === LEFT_ARROW) {
    density *= 1.25;
  }
  if (keyCode === RIGHT_ARROW) {
    density /= 1.25;
  }

  if (keyCode === UP_ARROW) {
    fontSize *= 1.1;
    createLetters();
  }
  if (keyCode == DOWN_ARROW) {
    fontSize /= 1.1;
    createLetters();
  }

  if (keyCode == ENTER) createLetters();
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
      createLetters();
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    createLetters();
  }
}