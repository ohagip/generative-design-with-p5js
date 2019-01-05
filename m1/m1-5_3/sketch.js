const sketch = (p) => {
  let agents = [];
  let agentCount = 4000;
  let noiseScale = 100;
  let noiseStrength = 10;
  let noiseZRange = 0.4;
  let noiseZVelocity = 0.01;
  let overlayAlpha = 10;
  let agentAlpha = 90;
  let strokeWidth = 0.3;
  let drawMode = 1;

  p.preload = () => {
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);

    for (let i = 0; i < agentCount; i += 1) {
      agents[i] = new Agent(noiseZRange);
    }
  };

  p.draw = () => {
    p.fill(255, overlayAlpha);
    p.noStroke();
    p.rect(0, 0, p.width, p.height);

    p.stroke(0, agentAlpha);
    for (let i = 0; i < agentCount; i += 1) {
      if (drawMode === 1) {
        agents[i].update1(strokeWidth, noiseScale, noiseStrength, noiseZVelocity);

      } else {
        agents[i].update2(strokeWidth, noiseScale, noiseStrength, noiseZVelocity);

      }
    }
  };

  p.mousePressed = () => {
  };

  p.keyReleased = () => {
    if (p.key === 's' || p.key === 'S') {
      p.saveCanvas(gd.timestamp(), 'png');
    }

    if (p.key === '1') {
      drawMode = 1;
    }
    if (p.key === '2') {
      drawMode = 2;
    }
    if (p.key === ' ') {
      const newNoiseSeed = p.floor(p.random(10000));
      p.noiseSeed(newNoiseSeed);
    }
    if (p.keyCode === p.DELETE || p.keyCode === p.BACKSPACE) p.background(255);
  };

  p.keyPressed = () => {
  };
};

const myp5 = new p5(sketch);