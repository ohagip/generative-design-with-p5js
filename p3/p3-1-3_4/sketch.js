let joinedText;
let charSet;
let counters = [];
let drawLetters = [];

let posX;
let posY;

let drawGreyLines = true;
let drawColoredLines = true;
let drawText = true;

function preload() {
  joinedText = loadStrings('data/faust_kurz.txt');
  console.log(joinedText)
}

function getUniqCharacters() {
  let charsArray = joinedText.toUpperCase().split('');
  let uniqCharsArray = charsArray.filter(function(char, index) {
    return charsArray.indexOf(char) === index;
  }).sort();
  return uniqCharsArray.join('');
}

function countCharacters() {
  for (let i = 0; i < joinedText.length; i += 1) {
    let index = charSet.indexOf(joinedText.charAt(i).toUpperCase());
    if (index >= 0) counters[index]++;
  }
}

function setup() {
  createCanvas(1200, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  textFont('monospace', 18);
  fill(0);

  joinedText = joinedText.join(' ');
  charSet = getUniqCharacters();
  for (let i = 0; i < charSet.length; i += 1) {
    counters[i] = 0;
    drawLetters[i] = true;
  }

  countCharacters();
}

function draw() {
  background(360);

  translate(50, 0);

  noStroke();

  posX = 0;
  posY = 200;

  let oldX = 0;
  let oldY = 0;
  let sortPositionsX = [];
  let oldPositionsX = [];
  let oldPositionsY = [];
  for (let i = 0; i < joinedText.length; i += 1) {
    sortPositionsX[i] = 0;
    oldPositionsX[i] = 0;
    oldPositionsY[i] = 0;
  }

  // draw counters
  if (mouseX >= width - 50) {
    textSize(10);
    for (let i = 0; i < charSet.length; i += 1) {
      textAlign(LEFT);
      text(charSet.charAt(i), -15, i * 20 + 40);
      textAlign(RIGHT);
      text(counters[i], -20, i * 20 + 40);
    }
    textAlign(LEFT);
    textSize(18);
  }


  for (let i = 0; i < joinedText.length; i += 1) {
    let upperCaseChar = joinedText.charAt(i).toUpperCase();
    let index = charSet.indexOf(upperCaseChar);
    if (index < 0) continue;

    let m = map(mouseX, 50, width - 50, 0, 1);
    m = constrain(m, 0, 1);

    let sortX = sortPositionsX[index];
    let interX = lerp(posX, sortX, m);

    let sortY = index * 20 + 40;
    let interY = lerp(posY, sortY, m);

    if (drawLetters[index] === true) {
      if (drawGreyLines === true) {
        if (oldX !== 0 && oldY !== 0) {
          stroke(0, 10);
          line(oldX, oldY, interX, interY);
        }
        oldX = interX;
        oldY = interY;
      }

      if (drawColoredLines === true) {
        if (oldPositionsX[index] !== 0 && oldPositionsY[index] !== 0) {
          stroke(index * 10, 80, 60, 50);
          line(oldPositionsX[index], oldPositionsY[index], interX, interY);
        }
        oldPositionsX[index] = interX;
        oldPositionsY[index] = interY;
      }

      if (drawText === true) {
        text(joinedText.charAt(i), interX, interY);
      }
    } else {
      oldX = 0;
      oldY = 0;
    }

    sortPositionsX[index] += textWidth(joinedText.charAt(i));
    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar === ' ') {
      posY += 40;
      posX = 0;
    }
  }
}

function keyReleased() {
  if (keyCode === CONTROL) {
    saveCanvas('canvas', 'png');
  }

  if (key === '1') {
    drawGreyLines = !drawGreyLines;
  }
  if (key === '2') {
    drawColoredLines = !drawColoredLines;
  }
  if (key === '3') {
    drawText = !drawText;
  }
  if (key === '4') {
    for (let i = 0; i < charSet.length; i += 1) {
      drawLetters[i] = false;
    }
  }
  if (key === '5') {
    for (let i = 0; i < charSet.length; i += 1) {
      drawLetters[i] = true;
    }
  }

  let index = charSet.indexOf(key.toUpperCase());
  if (index >= 0) {
    drawLetters[index] = !drawLetters[index];
  }
}