const myCanvas = document.querySelector("#my-canvas3");
const context = myCanvas.getContext("2d");

const gradient = context.createLinearGradient(0, 0, 1600, 0);
gradient.addColorStop(0, "limegreen");
gradient.addColorStop(1, "blue");
context.lineWidth = 2;
context.strokeStyle = gradient;
context.fillStyle = "white";
//
const particleAvoid = false;
const canvasWidth = 1600;
const canvasHeight = 800;
const pointRadius = 2;
const numberOfPoints = 160;
const allowedDistanceBP = 240;
const mouseCircleRadius = 160;
const xThreshold = [-50, canvasWidth + 50];
const yThreshold = [-50, canvasHeight + 50];
const xRateChange = 8;
const yRateChange = 8;
const frameRate = 30;
const maxLines = 10;

const mousePos = {
  x: undefined,
  y: undefined,
};
const pointsArray = [];
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
  pointsArray.push([posX, posY, xRate, yRate]);
}
// console.log(pointsArray);

const intervalId = setInterval(() => {
  createNewPoint();
}, 1000 / frameRate);
setTimeout(() => {
  clearInterval(intervalId);
}, 1000);
function createNewPoint() {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);
  for (let i = 0; i < pointsArray.length; i++) {
    const element = pointsArray[i];
    movePointOnCollission(element);
    let x = element[0];
    let y = element[1];
    connectPoints(i);
    context.beginPath();
    context.arc(x, y, pointRadius, 0, 2 * Math.PI);
    context.fill();
    element[0] += element[2] * 0.1;
    element[1] += element[3] * 0.1;
    if (mousePos.x && !particleAvoid) {
      // context.arc(mousePos.x, mousePos.y, 2, 0, 2 * Math.PI);
      // context.fill();
      drawLineBetween([mousePos.x, mousePos.y], element);
    }

    //
  }
}
function connectPoints(index) {
  let count = 0;
  const elementFrom = pointsArray[index];
  for (let j = index + 1; j < pointsArray.length; j++) {
    const elementTo = pointsArray[j];
    if (count > maxLines) {
      return;
    }
    const drawn = drawLineBetween(elementTo, elementFrom);
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

document.addEventListener("mousemove", (e) => {
  mousePos.x = e.pageX;
  mousePos.y = e.pageY;
});

function movePointOnCollission(point) {
  if (point[1] > yThreshold[1] || point[1] < yThreshold[0]) {
    point[1] = point[1] < yThreshold[0] ? yThreshold[1] : yThreshold[0];
    return;
  }
  if (point[0] > xThreshold[1] || point[0] < xThreshold[0]) {
    point[0] = point[0] < xThreshold[0] ? xThreshold[1] : xThreshold[0];
    return;
  }
  if (!particleAvoid) return;
  const distance = findDistanceBetween(point, [mousePos.x, mousePos.y]);
  if (distance < mouseCircleRadius) {
    const newLocation = findNewLocation(
      [mousePos.x, mousePos.y],
      point,
      distance
    );
    point[0] = newLocation[0];
    point[1] = newLocation[1];
  }
}
function findNewLocation(point1, point2, distance) {
  const x3 =
    ((point2[0] - point1[0]) * mouseCircleRadius) / distance + point1[0];
  const y3 =
    ((point2[1] - point1[1]) * mouseCircleRadius) / distance + point1[1];
  return [x3, y3];
}
// function calculatePosition(x, y) {
//   const newX = (2000 * x) / window.innerWidth;
//   const newY = (1000 * y) / window.innerHeight;
//   return [x, y];
// }
