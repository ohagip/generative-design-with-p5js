const sketch = (p) => {
  let pointCount = 600;
  let freq = 2;
  let phi = 0;
  let modFreq = 12;

  let drawFrequency = true;
  let drawModulation = true;
  let drawCombination = true;

  let angle;
  let y;

  p.setup = () => {
    p.createCanvas(p.windowWidth, 800);
    p.noFill();
    pointCount = p.width;
  };

  p.draw = () => {
    p.background(255);
    p.strokeWeight(1);

    p.translate(0, p.height / 2);

    // draw oscillator with freq and phi
    if (drawFrequency === true) {
      p.beginShape();
      for (let i = 0; i <= pointCount; i += 1) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        y = p.sin(angle * freq + p.radians(phi));
        y *= p.height / 4;
        p.vertex(i,y);
      }
      p.endShape();
    }

    // draw oscillator with modFreq
    if (drawModulation === true) {
      p.stroke(0,130,164,128);
      p.beginShape();
      for (let i = 0; i <= pointCount; i += 1) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        y = p.cos(angle * modFreq);
        y *= p.height / 4;
        p.vertex(i,y);
      }
      p.endShape();
    }

    // draw both combined
    p.stroke(0);
    p.strokeWeight(2);
    p.beginShape();
    for (let i = 0; i <= pointCount; i += 1) {
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      const info = p.sin(angle * freq + p.radians(phi));
      const carrier = p.cos(angle * modFreq);
      y = info * carrier;
      y *= p.height / 4;
      p.vertex(i, y);
    }
    p.endShape();
  };

  p.keyReleased = () => {
    if (p.key === 's' || p.key === 'S') {
      p.saveCanvas(gd.timestamp(), 'png');
    }

    if (p.key === 'i' || p.key === 'I') {
      drawFrequency = !drawFrequency;
    }
    if (p.key === 'c' || p.key === 'C') {
      drawModulation = !drawModulation;
    }

    if (p.key === '1') {
      freq -= 1;
    }
    if (p.key === '2') {
      freq += 1;
    }
    freq = p.max(freq, 1);

    if (p.keyCode === p.LEFT_ARROW) {
      phi -= 15;
    }
    if (p.keyCode === p.RIGHT_ARROW) {
      phi += 15;
    }

    if (p.key === '7') {
      modFreq -= 1;
    }
    if (p.key === '8') {
      modFreq += 1;
    }
    modFreq = p.max(modFreq, 1);

    console.log('freq: ' + freq + ', phi: ' + phi + ', modFreq: ' + modFreq);
  };
};

const myp5 = new p5(sketch);