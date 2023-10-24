const myCanvas2 = document.querySelector("#my-canvas2");
const cxt = myCanvas2.getContext("2d");

cxt.lineWidth = 1;
cxt.strokeStyle = "white";
cxt.fillStyle = "white";

//
const newFrameRate = 30;
//

const circleArr = [
  [400, 400, 1, 0, Math.PI * 2, "#12345656"],
  //   [400, 500, 1, 0, Math.PI * 2, "red"],
  [500, 500, 1, 0, Math.PI * 2, "#fecdab45"],
  //   [500, 400, 1, 0, Math.PI * 2, "red"],
];

for (let i = 0; i < circleArr.length; i++) {
  const element = circleArr[i];
  cxt.beginPath();
  cxt.arc(element[0], element[1], element[2], element[3], element[4]);
  cxt.fill();
}

// setInterval(() => {
//   increaseCircleSize();
//   //   console.log("hello");
// }, 1000 / newFrameRate);

function increaseCircleSize() {
  cxt.clearRect(0, 0, myCanvas.width, myCanvas.height);
  for (let i = 0; i < circleArr.length; i++) {
    const element = circleArr[i];
    const [angleBtwCircle, angle] = findArcs(i);
    cxt.fillStyle = element[5];

    cxt.beginPath();
    cxt.arc(
      element[0],
      element[1],
      element[2],
      element[3] - angleBtwCircle + angle,
      element[4] - angleBtwCircle - angle
    );
    cxt.stroke();
    element[2] += 0.5;
  }
}

function findArcs(index) {
  const circle1 = circleArr[index];
  for (let i = 0; i < circleArr.length; i++) {
    const circle2 = circleArr[i];
    if (i !== index) {
      const distance = findDistanceBetween(circle1, circle2);
      const angleBtwCircle = findAngleBetweenCircles(circle1, circle2);
      if (circle1[2] + circle2[2] >= distance) {
        const angle = Math.acos(distance / (circle1[2] + circle2[2]));
        console.log(circle1[1], circle2[1]);
        if (circle1[1] > circle2[1]) {
          return [angleBtwCircle + Math.PI / 2, angle];
        } else {
          return [-angleBtwCircle, angle];
        }
      }
      return [0, 0];
    }
  }
}
function findAngleBetweenCircles(circle1, circle2) {
  const tanAngle = (circle2[1] - circle1[1]) / (circle2[0] - circle1[0]);
  console.log(tanAngle);
  return Math.atan(tanAngle);
}
