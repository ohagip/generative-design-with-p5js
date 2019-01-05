const sketch = (p) => {

  let octaves = 4;
  let falloff = 0.5;
  let noiseMode = 1;

  p.setup = () => {
    p.createCanvas(512, 512);
    p.cursor(p.CROSS);
  };

  p.draw = () => {
    p.background(0);

    p.noiseDetail(octaves, falloff);

    const noiseXRange = p.mouseX / 10;
    const noiseYRange = p.mouseY / 10;

    for (let x = 0; x < p.width; x += 1) {
      for (let y = 0; y < p.height; y += 1) {
        const noiseX = p.map(x, 0, p.width, 0, noiseXRange);
        const noiseY = p.map(y, 0, p.height, 0, noiseYRange);

        let noiseValue = 0;
        if (noiseMode === 1) {
          noiseValue = p.noise(noiseX, noiseY) * 255;
        } else if (noiseMode === 2) {
          const n = p.noise(noiseX, noiseY) * 24;
          noiseValue = (n - p.floor(n)) * 255;
        }

        p.set(x, y, noiseValue);
      }
    }
    p.updatePixels();
  };

  p.keyReleased = () => {
    if (p.key === 's' || p.key === 'S') {
      p.saveCanvas(gd.timestamp(), 'png');
    }

    if (p.key === ' ') {
      p.noiseSeed(p.random(100000));
    }
    if (p.key === '1') {
      noiseMode = 1;
    }
    if (p.key === '2') {
      noiseMode = 2;
    }
  };

  p.keyPressed = function() {
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
  };
};

const myp5 = new p5(sketch);