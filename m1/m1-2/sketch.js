const sketch = (p) => {
  let actRandomSeed = 0;
  let count = 150;

  p.setup = () => {
    p.createCanvas(800, 800);
    p.cursor(p.CROSS);
    p.noStroke();
    p.fill(0, 130, 164);
  };

  p.draw = () => {
    p.background(255);

    const faderX = p.mouseX / p.width;

    p.randomSeed(actRandomSeed);
    const angle = p.radians(360 / count);
    for (let i = 0; i < count; i += 1) {
      const randomX = p.random(0, p.width);
      const randomY = p.random(0, p.height);
      const circleX = p.width / 2 + p.cos(angle * i) * 300;
      const circleY = p.height / 2 + p.sin(angle * i) * 300;

      const x = p.lerp(randomX, circleX, faderX);
      const y = p.lerp(randomY, circleY, faderX);

      p.ellipse(x, y, 11, 11);
    }
  };

  p.mousePressed = () => {
    actRandomSeed = p.random(100000);
  };

  p.keyReleased = () => {
    if (p.key === 's' || p.key === 'S') {
      p.saveCanvas(gd.timestamp(), 'png');
    }
  };
};

const myp5 = new p5(sketch);