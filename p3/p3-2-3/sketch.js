let typedKey = 'a';
let fontPath;

let spacing = 20;
let spaceWidth = 80;
let fontSize = 200;
let lineSpacing = fontSize * 1.2;
let textW = 0;
let letterX = 50 + spacing;
let letterY = lineSpacing;

let stepSize = 2;
let danceFactor = 1;

let font;
let pnts;

let freeze = false;

function getPoints() {
  fontPath = font.getPath(typedKey, 0, 0, 200);
  var path = new g.Path(fontPath.commands);
  path = g.resampleByLength(path, 25);
  textW = path.bounds().width;
  for (let i = path.commands.length - 1; i >= 0 ; i -= 1) {
    if (path.commands[i].x === undefined) {
      path.commands.splice(i, 1);
    }
  }
  return path.commands;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  opentype.load('data/FreeSansNoPunch.otf', function(err, f) {
    if (err) {
      print(err);
    } else {
      font = f;
      pnts = getPoints(typedKey);
      loop();
    }
  });
}

function draw() {
  if (!font) {
    return;
  }

  noFill();
  push();

  translate(letterX, letterY);

  danceFactor = 1;
  if (mouseIsPressed && mouseButton === LEFT) {
    danceFactor = map(mouseX, 0, width, 0, 3);
  }

  if (pnts.length > 0) {
    for (let i = 0; i < pnts.length; i += 1) {
      pnts[i].x += random(-stepSize, stepSize) * danceFactor;
      pnts[i].y += random(-stepSize, stepSize) * danceFactor;
    }

    strokeWeight(0.1);
    stroke(0);
    beginShape();
    for (let i = 0; i < pnts.length; i += 1) {
      vertex(pnts[i].x, pnts[i].y);
      ellipse(pnts[i].x, pnts[i].y, 7, 7);
    }
    vertex(pnts[0].x, pnts[0].y);
    endShape();

    //   strokeWeight(0.08);
    //   beginShape();
    //   // start controlpoint
    //   curveVertex(pnts[pnts.length-1].x, pnts[pnts.length-1].y);
    //   // only these points are drawn
    //   for (var i = 0; i < pnts.length; i++) {
    //     curveVertex(pnts[i].x, pnts[i].y);
    //   }
    //   curveVertex(pnts[0].x, pnts[0].y);
    //   // end controlpoint
    //   curveVertex(pnts[1].x, pnts[1].y);
    //   endShape();

  }

  pop();
}

function keyReleased() {
  if (keyCode === CONTROL) {
    saveCanvas('canvas', 'png');
  }

  if (keyCode === ALT) {
    freeze = !freeze;
    if (freeze === true) {
      noLoop();
    } else {
      loop();
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case ENTER:
    case RETURN:
      typedKey = '';
      pnts = getPoints(typedKey);
      letterY += lineSpacing;
      letterX = 50;
      break;
    case BACKSPACE:
    case DELETE:
      background(255);
      typedKey = '';
      pnts = getPoints(typedKey);
      letterX = 50;
      letterY = lineSpacing;
      freeze = false;
      loop();
      break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    if (keyCode === 32) {
      typedKey = '';
      letterX += textW + spaceWidth;
      pnts = getPoints(typedKey);
    } else {
      typedKey = key;
      letterX += textW + spacing;
      pnts = getPoints(typedKey);
    }
    freeze = false;
    loop();
  }
}