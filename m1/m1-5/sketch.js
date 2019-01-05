const sketch = (p) => {
  let octaves = 4;
  let falloff = 0.5;

  let tileSize = 40;
  let gridResolutionX;
  let gridResolutionY;
  let debugMode = true;
  let arrow;

  p.preload = () => {
    arrow = p.loadImage('data/arrow.svg');
  };

  p.setup = () => {
    p.createCanvas(800,800);
    p.cursor(p.CROSS);
    gridResolutionX = p.round(p.width / tileSize);
    gridResolutionY = p.round(p.height / tileSize);
    p.strokeCap(p.SQUARE);
  };

  p.draw = () => {
    p.background(255);

    p.noiseDetail(octaves, falloff);

    let noiseXRange = p.mouseX / 100;
    let noiseYRange = p.mouseY / 100;

    for (let gY = 0; gY <= gridResolutionY; gY += 1) {
      for (let gX = 0; gX <= gridResolutionX; gX += 1) {
        const posX = tileSize * gX;
        const posY = tileSize * gY;
        const noiseX = p.map(gX, 0, gridResolutionX, 0, noiseXRange);
        const noiseY = p.map(gY, 0, gridResolutionY, 0, noiseYRange);
        const noiseValue = p.noise(noiseX, noiseY);
        const angle = noiseValue * p.TAU;

        p.push();
        p.translate(posX, posY);

        if (debugMode === true) {
          p.noStroke();
          p.fill(noiseValue * 255);
          p.ellipse(0, 0, tileSize * 0.25, tileSize * 0.25);
        }

        // arc
        p.noFill();
        p.strokeWeight(1);
        p.stroke(0,130,164,100);
        p.arc(0, 0, tileSize * 0.75, tileSize * 0.75, 0, angle);

        // arrow
        p.stroke(0);
        p.strokeWeight(0.75);
        p.rotate(angle);
        p.image(arrow, 0, 0, tileSize * 0.75, tileSize * 0.75);
        p.scale(1, -1); // mirror the other half of arrow shape
        p.image(arrow, 0, 0, tileSize * 0.75, tileSize * 0.75);

        p.pop();
      }
    }
  };

  p.mousePressed = () => {
  };

  p.keyReleased = () => {
    if (p.key === 's' || p.key === 'S') {
      p.saveCanvas(gd.timestamp(), 'png');
    }

    if (p.key === 'd' || p.key === 'D') {
      debugMode = !debugMode;
    }
    if (p.key === ' ') {
      p.noiseSeed(p.random(100000));
    }
  };

  p.keyPressed = () => {
    if (p.keyCode === p.UP_ARROW) {
      falloff += 0.05;
    }
    if (p.keyCode === p.DOWN_ARROW) {
      falloff -= 0.05;
    }
    if (falloff > 1) {
      falloff = 1;
    }
    if (falloff < 0) {
      falloff = 0;
    }

    if (p.keyCode === p.LEFT_ARROW) {
      octaves -= 1;
    }
    if (p.keyCode === p.RIGHT_ARROW) {
      octaves += 1;
    }
    if (octaves < 0) {
      octaves = 0;
    }
    console.log(octaves)
  };
};

const myp5 = new p5(sketch);