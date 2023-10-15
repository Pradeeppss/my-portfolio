const myCanvas = document.querySelector("#my-canvas");
const context = myCanvas.getContext("2d");

const gradient = context.createLinearGradient(0, 0, 1600, 0);
gradient.addColorStop(0, "limegreen");
gradient.addColorStop(1, "blue");
context.lineWidth = 2;
context.strokeStyle = gradient;
context.fillStyle = "white";
//
const canvasWidth = 1600;
const canvasHeight = 800;
const pointRadius = 2;
const numberOfPoints = 130;
const allowedDistanceBP = 300;
const xThreshold = [-50, canvasWidth + 50];
const yThreshold = [-50, canvasHeight + 50];
const xRateChange = 3;
const yRateChange = 4;
const frameRate = 30;
const maxLines = 10;

const mousePos = {
  x: undefined,
  y: undefined,
};
const startArr = [];
for (let i = 0; i < numberOfPoints; i++) {
  let posX = Math.floor(Math.random() * xThreshold[1]);
  let posY = Math.floor(Math.random() * yThreshold[1]);
  let xRate = Math.floor(Math.random() * xRateChange) + 1;
  let yRate = Math.floor(Math.random() * yRateChange) + 1;
  if (Math.random() < 0.5) {
    xRate = 0 - xRate;
  }
  if (Math.random() < 0.5) {
    yRate = 0 - yRate;
  }
  startArr.push([posX, posY, xRate, yRate]);
}
console.log(startArr);

setInterval(() => {
  createNewPoint();
}, 1000 / frameRate);
function createNewPoint() {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  for (let i = 0; i < startArr.length; i++) {
    const element = startArr[i];
    createRandomPoint(element);
    let x = element[0];
    let y = element[1];
    connectPoints(i);
    context.beginPath();
    context.arc(x, y, pointRadius, 0, 2 * Math.PI);
    context.fill();
    element[0] += element[2] * 0.1;
    element[1] += element[3] * 0.1;
    if (mousePos.x) {
      // context.arc(mousePos.x, mousePos.y, 2, 0, 2 * Math.PI);
      // context.fill();
      drawLineBetween([mousePos.x, mousePos.y], element);
    }

    //
  }
}
function connectPoints(index) {
  let count = 0;
  const elementFrom = startArr[index];
  for (let j = index + 1; j < startArr.length; j++) {
    const element = startArr[j];
    if (count > maxLines) {
      return;
    }
    const drawn = drawLineBetween(element, elementFrom);
    if (drawn) {
      count++;
    }
  }
}
function drawLineBetween(point1, point2) {
  const distanceBetweenPoints = findDistanceBetween(point1, point2);
  if (distanceBetweenPoints < allowedDistanceBP) {
    context.lineWidth = 1 - distanceBetweenPoints / allowedDistanceBP + 0.03;
    context.beginPath();
    context.moveTo(point1[0], point1[1]);
    context.lineTo(point2[0], point2[1]);
    context.stroke();
    return true;
  }
  return false;
}
function findDistanceBetween(point1, point2) {
  let xDistance = (point1[0] - point2[0]) ** 2;
  let yDistance = (point1[1] - point2[1]) ** 2;
  return Math.sqrt(xDistance + yDistance);
}
console.log(window);

document.addEventListener("mousemove", (e) => {
  const [newX, newY] = calculatePosition(e.pageX, e.pageY);
  mousePos.x = newX;
  mousePos.y = newY;
});

function createRandomPoint(point) {
  if (point[1] > yThreshold[1] || point[1] < yThreshold[0]) {
    point[1] = point[1] < yThreshold[0] ? yThreshold[1] : yThreshold[0];
  }
  if (point[0] > xThreshold[1] || point[0] < xThreshold[0]) {
    point[0] = point[0] < xThreshold[0] ? xThreshold[1] : xThreshold[0];
  }
}
function calculatePosition(x, y) {
  const newX = (2000 * x) / window.innerWidth;
  const newY = (1000 * y) / window.innerHeight;
  return [x, y];
}
