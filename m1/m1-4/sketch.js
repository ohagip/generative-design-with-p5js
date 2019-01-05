const sketch = (p) => {
  // mesh
  let tileCount = 50;
  let zScale = 150;

  // noise
  let noiseXRange = 10;
  let noiseYRange = 10;
  let octaves = 4;
  let falloff = 0.5;

  // mesh coloring
  let midColor = p.color(0, 0, 100);
  let topColor = p.color(191, 99, 63);
  let bottomColor = p.color(0, 0, 0);
  let strokeColor = p.color(180, 100, 100);
  let threshold = 0.30;

  // mouse interaction
  let offsetX = 0;
  let offsetY = 0;
  let clickX = 0;
  let clickY = 0;
  let zoom = -300;
  let rotationX = 0;
  let rotationZ = 0;
  let targetRotationX = p.PI / 3;
  let targetRotationZ = 0;
  let clickRotationX;
  let clickRotationZ;


  p.setup = () => {
    p.createCanvas(600, 600, p.WEBGL);
    p.colorMode(p.HSB, 360, 100, 100);
    p.cursor(p.CROSS);
  };

  p.draw = () => {
    p.background(0, 0, 100);
    p.ambientLight(150);

    p.push();
    p.translate(p.width * 0.05, p.height * 0.05, zoom);

    if (p.mouseIsPressed && p.mouseButton === p.RIGHT) {
      offsetX = p.mouseX - clickX;
      offsetY = p.mouseY - clickY;
      targetRotationX = p.min(p.max(clickRotationX + offsetY / p.float(p.width) * p.TWO_PI, -p.HALF_PI), p.HALF_PI);
      targetRotationZ = clickRotationZ + offsetX / p.float(p.height) * p.TWO_PI;
    }
    rotationX += (targetRotationX - rotationX) * 0.25;
    rotationZ += (targetRotationZ - rotationZ) * 0.25;
    p.rotateX(-rotationX);
    p.rotateZ(-rotationZ);

    // ------ mesh noise ------
    if (p.mouseIsPressed && p.mouseButton === p.LEFT) {
      noiseXRange = p.mouseX / 10;
      noiseYRange = p.mouseY / 10;
    }

    p.noiseDetail(octaves, falloff);
    let noiseYMax = 0;

    const tileSizeY = p.height / tileCount;
    let noiseStepY = noiseYRange / tileCount;

    for (let meshY = 0; meshY <= tileCount; meshY += 1) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (let meshX = 0; meshX <= tileCount; meshX += 1) {

        const x = p.map(meshX, 0, tileCount, -p.width / 2, p.width / 2);
        const y = p.map(meshY, 0, tileCount, -p.height / 2, p.height / 2);

        const noiseX = p.map(meshX, 0, tileCount, 0, noiseXRange);
        const noiseY = p.map(meshY, 0, tileCount, 0, noiseYRange);
        const z1 = p.noise(noiseX, noiseY);
        const z2 = p.noise(noiseX, noiseY + noiseStepY);

        noiseYMax = p.max(noiseYMax, z1);
        let interColor;
        p.colorMode(p.RGB);
        let amount;
        if (z1 <= threshold) {
          amount = p.map(z1, 0, threshold, 0.15, 1);
          interColor = p.lerpColor(bottomColor, midColor, amount);
        } else {
          amount = p.map(z1, threshold, noiseYMax, 0, 1);
          interColor = p.lerpColor(midColor, topColor, amount);
        }
        p.fill(interColor);
        p.stroke(strokeColor);
        p.strokeWeight(1);
        p.vertex(x, y, z1 * zScale);
        p.vertex(x, y + tileSizeY, z2 * zScale);
      }
      p.endShape();
    }
    p.pop();
  };

  p.mousePressed = () => {
    clickX = p.mouseX;
    clickY = p.mouseY;
    clickRotationX = rotationX;
    clickRotationZ = rotationZ;
  };

  p.keyReleased = () => {
    if (p.key === 's' || p.key === 'S') {
      p.saveCanvas(gd.timestamp(), 'png');
    }

    if (p.keyCode === p.UP_ARROW) {
      falloff += 0.05;
    }
    if (p.keyCode === p.DOWN_ARROW) {
      falloff -= 0.05;
    }
    if (falloff > 1.0) {
      falloff = 1.0;
    }
    if (falloff < 0.0) {
      falloff = 0.0;
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

    if (p.keyCode === 187) {
      zoom += 20;
    } // '+'
    if (p.keyCode === 189) {
      zoom -= 20;
    } // '-'
    if (p.key === ' ') {
      p.noiseSeed(p.floor(p.random(100000)));
    }
  };
};

const myp5 = new p5(sketch);