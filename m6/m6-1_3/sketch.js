const sketch = (p) => {
  const nodeCount = 100;
  let nodes = [];
  let springs = [];

  let selectedNode = null;
  let nodeDiameter = 16;

  const initNodesAndSprings = () => {
    nodes = [];
    const rad = nodeDiameter / 2;
    for (let i = 0; i < nodeCount; i += 1) {
      const newNode = new Node(p.width / 2 + p.random(-200, 200), p.height / 2 + p.random(-200, 200));
      newNode.minX = rad;
      newNode.minY = rad;
      newNode.maxX = p.width - rad;
      newNode.maxY = p.height - rad;
      newNode.radius = 100;
      newNode.strength = -5;
      nodes.push(newNode);
    }

    springs = [];
    for (let j = 0; j < nodeCount - 1; j += 1) {
      const rCount = p.floor(p.random(1, 2));
      for (let i = 0; i < rCount; i += 1) {
        const r = p.floor(p.random(j + 1, nodeCount));
        const newSpring = new Spring(nodes[j], nodes[r]);
        newSpring.length = 20;
        newSpring.stiffness = 1;
        springs.push(newSpring);
      }
    }

  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.noStroke();

    initNodesAndSprings();
  };

  p.draw = () => {
    p.background(255);

    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].attractNodes(nodes);
    }

    for (let i = 0; i < springs.length; i += 1) {
      springs[i].update();
    }

    for (let i = 0; i < nodes.length; i += 1) {
      nodes[i].update();
    }

    if (selectedNode != null) {
      selectedNode.x = p.mouseX;
      selectedNode.y = p.mouseY;
    }

    p.stroke(0, 130, 164);
    p.strokeWeight(2);
    for (let i = 0; i < springs.length; i += 1) {
      p.line(springs[i].fromNode.x, springs[i].fromNode.y, springs[i].toNode.x, springs[i].toNode.y);
    }
    p.noStroke();
    for (let i = 0; i < nodes.length; i += 1) {
      p.fill(255);
      p.ellipse(nodes[i].x, nodes[i].y, nodeDiameter, nodeDiameter);
      p.fill(0);
      p.ellipse(nodes[i].x, nodes[i].y, nodeDiameter - 4, nodeDiameter - 4);
    }
  };

  p.mousePressed = () => {
    let maxDist = 20;
    for (let i = 0; i < nodes.length; i += 1) {
      const checkNode = nodes[i];
      const d = p.dist(p.mouseX, p.mouseY, checkNode.x, checkNode.y);
      if (d < maxDist) {
        selectedNode = checkNode;
        maxDist = d;
      }
    }
  };

  p.mouseReleased = () => {
    if (selectedNode != null) {
      selectedNode = null;
    }
  };

  p.keyReleased = () => {
    if (p.key === 's' || p.key === 'S') {
      p.saveCanvas(gd.timestamp(), 'png');
    }

    if (key === 'r' || key === 'R') {
      p.background(255);
      initNodesAndSprings();
    }
  };
};

const myp5 = new p5(sketch);