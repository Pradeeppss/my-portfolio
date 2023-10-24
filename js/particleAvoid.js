function RunParticleAvoid() {
  const myCanvas = document.querySelector("#my-canvas1");
  const context = myCanvas.getContext("2d");
  const img = document.querySelector(".avatar");
  myCanvas.style.opacity = "0";

  const gradient = context.createLinearGradient(0, 0, 1600, 0);
  gradient.addColorStop(0, "limegreen");
  gradient.addColorStop(1, "blue");
  context.lineWidth = 2;
  context.strokeStyle = gradient;
  //
  const squareSize = 2;
  const squareContainSize = squareSize + 0;
  const xOffset = 100;
  const yOffset = 100;
  const mouseCircleRadius = 25;
  // const mouseOuterCircleRadius = 1000;
  const movementRate = 1;
  const frameRate = 40;
  const imgHeight = img.offsetHeight;
  const imgWidth = img.offsetWidth;

  const mousePos = {
    x: 5000,
    y: 5000,
  };
  context.drawImage(img, 0, 0);
  const imgData = context.getImageData(0, 0, img.offsetHeight, img.offsetWidth);
  let xOff = 0;
  let yOff = 0;
  const pointsArray = [];
  for (let i = 0; i < imgData.data.length; i += 8) {
    let divider = 0;
    let red = 0;
    let green = 0;
    let blue = 0;
    const red1 = imgData.data[i];
    const green1 = imgData.data[i + 1];
    const blue1 = imgData.data[i + 2];
    const tran1 = imgData.data[i + 3];
    if (red1 + green1 + blue1 < 700) {
      red += red1;
      green += green1;
      blue += blue1;
      divider++;
    }
    const red2 = imgData.data[i + imgWidth * 4];
    const green2 = imgData.data[i + 1 + imgWidth * 4];
    const blue2 = imgData.data[i + 2 + imgWidth * 4];
    const tran2 = imgData.data[i + 3 + imgWidth * 4];
    if (red2 + green2 + blue2 < 700) {
      red += red2;
      green += green2;
      blue += blue2;
      divider++;
    }
    const red3 = imgData.data[i + 4];
    const green3 = imgData.data[i + 1 + 4];
    const blue3 = imgData.data[i + 2 + 4];
    const tran3 = imgData.data[i + 3 + 4];
    if (red3 + green3 + blue3 < 700) {
      red += red3;
      green += green3;
      blue += blue3;
      divider++;
    }
    const red4 = imgData.data[i + 4 + imgWidth * 4];
    const green4 = imgData.data[i + 1 + 4 + imgWidth * 4];
    const blue4 = imgData.data[i + 2 + 4 + imgWidth * 4];
    const tran4 = imgData.data[i + 3 + 4 + imgWidth * 4];
    if (red4 + green4 + blue4 < 700) {
      red += red4;
      green += green4;
      blue += blue4;
      divider++;
    }
    if (divider !== 0) {
      red = red / divider;
      green = green / divider;
      blue = blue / divider;
    }
    if (!(tran1 === 0 || tran2 === 0 || tran3 === 0 || tran4 === 0)) {
      if (divider !== 0) {
        pointsArray.push([
          xOff + 50,
          yOff + 50,
          xOff + 50,
          yOff + 50,
          `rgba(${red},${green},${blue})`,
        ]);

        context.beginPath();
        context.rect(xOff, yOff, squareSize, squareSize);
        context.fill();
      }
    }
    if (xOff > imgWidth - 2) {
      yOff += 2;
      xOff = 0;
      i += imgWidth * 4;
    }
    xOff += 2;
  }
  console.log(pointsArray.length);
  // for (let i = 0; i < squareNumber; i++) {
  //   for (let j = 0; j < squareNumber; j++) {
  //     let posX = startPos + squareContainSize * i;
  //     let posY = startPos + squareContainSize * j;
  //     pointsArray.push([posX, posY, posX, posY]);
  //     context.beginPath();
  //     context.rect(posX, posY, squareSize, squareSize);
  //     context.fill();
  //   }
  // }
  context.clearRect(0, 0, myCanvas.offsetWidth, myCanvas.offsetHeight);
  console.log(myCanvas.offsetWidth, myCanvas.offsetHeight);
  img.style.display = "none";
  myCanvas.style.opacity = 1;
  const intervalId = setInterval(() => {
    drawNewPoints();
  }, 1000 / frameRate);
  // setTimeout(() => {
  //   clearInterval(intervalId);
  // }, 5000);

  //   main function
  function drawNewPoints() {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    for (let i = 0; i < pointsArray.length; i++) {
      const element = pointsArray[i];
      movePointToDefaultPosition(element);
      movePointOnCollission(element);
      context.fillStyle = element[4];
      context.beginPath();
      context.rect(element[0], element[1], squareSize, squareSize);
      context.fill();
      // console.log("drawing");
    }
  }
  function movePointOnCollission(point) {
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
    // if (distance < mouseOuterCircleRadius) {
    const newLocation = movePointSlightly(
      [mousePos.x, mousePos.y],
      point,
      distance
    );
    point[0] = newLocation[0];
    point[1] = newLocation[1];
    // }
  }
  function findNewLocation(point1, point2, distance) {
    const x3 =
      ((point2[0] - point1[0]) * mouseCircleRadius) / distance + point1[0];
    const y3 =
      ((point2[1] - point1[1]) * mouseCircleRadius) / distance + point1[1];
    return [x3, y3];
  }
  function movePointSlightly(point1, point2, distance) {
    const distanceToMove = ((6000 - distance) / distance) * 0.03;
    const limit = 6;
    const x3 =
      ((point2[0] - point1[0]) * (distance + Math.min(distanceToMove, limit))) /
        distance +
      point1[0];
    const y3 =
      ((point2[1] - point1[1]) * (distance + Math.min(distanceToMove, limit))) /
        distance +
      point1[1];
    return [x3, y3];
  }
  function movePointToDefaultPosition(point) {
    if (point[0] !== point[2] || point[1] !== point[3]) {
      if (
        Math.abs(point[0] - point[2]) < 0.2 &&
        Math.abs(point[1] - point[3]) < 0.2
      ) {
        point[0] = point[2];
        point[1] = point[3];
        return;
      }
      const distance = findDistanceBetween(point, [point[2], point[3]]);
      moveCloser(point, distance);
    }
  }
  function moveCloser(point, distance) {
    // console.log("closer");
    const movementSpeed = (movementRate * distance * 4) / mouseCircleRadius;
    const x3 =
      ((point[0] - point[2]) * (distance - movementSpeed)) / distance +
      point[2];
    const y3 =
      ((point[1] - point[3]) * (distance - movementSpeed)) / distance +
      point[3];
    point[0] = x3;
    point[1] = y3;
  }
  myCanvas.addEventListener("mousemove", (e) => {
    mousePos.x = e.offsetX;
    mousePos.y = e.offsetY;
  });
}
RunParticleAvoid();
