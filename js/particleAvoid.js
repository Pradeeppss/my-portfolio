function RunParticleAvoid() {
  const myCanvas = document.querySelector("#my-canvas1");
  const context = myCanvas.getContext("2d");
  const codeImg = document.querySelector(".avatar");
  myCanvas.style.opacity = "0";
  context.fillStyle = "white";
  context.lineWidth = 2;
  let intervalId;
  let shoulIntervalRun = true;
  let intervalRunningStatus = true;
  //
  const squareSize = 2;
  const squareContainSize = squareSize + 0;
  const Offset = 50;
  const mouseCircleRadius = 35;
  // const mouseOuterCircleRadius = 1000;
  const movementRate = 3;
  const frameRate = 40;

  const mousePos = {
    x: 5000,
    y: 5000,
  };
  const imgWidth = codeImg.offsetWidth;
  context.drawImage(codeImg, 0, 0);
  const imgData = context.getImageData(
    0,
    0,
    codeImg.offsetHeight,
    codeImg.offsetWidth
  );
  let xOff = 0;
  let yOff = 0;
  let pixelWidth = 0;
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
      red = 255 - red / divider;
      green = 255 - green / divider;
      blue = 255 - blue / divider;
    }
    if (!(tran1 === 0 || tran2 === 0 || tran3 === 0 || tran4 === 0)) {
      if (divider !== 0) {
        // console.log(x, y);
        pointsArray.push([
          Math.floor(Math.random() * 500),
          Math.floor(Math.random() * 500),
          xOff + Offset,
          yOff + Offset,
          `rgba(${red - xOff / 2 - yOff / 2},${green - yOff / 2},${
            blue - xOff / 2 + yOff / 2
          })`,
          xOff + Offset,
        ]);

        context.beginPath();
        context.rect(xOff, yOff, squareSize, squareSize);
        context.fill();
      }
    }
    if (pixelWidth > imgWidth - 2) {
      yOff += squareContainSize;
      xOff = 0;
      pixelWidth = 0;
      i += imgWidth * 4;
    }
    xOff += squareContainSize;
    pixelWidth += 2;
  }
  console.log(pointsArray.length);
  context.clearRect(0, 0, myCanvas.offsetWidth, myCanvas.offsetHeight);

  myCanvas.style.opacity = 1;
  codeImg.style.display = "none";
  //
  function StartInterval() {
    intervalRunningStatus = true;
    const intervalId = setInterval(() => {
      shoulIntervalRun = false;
      drawNewPoints(pointsArray);
    }, 1000 / frameRate);
    return intervalId;
  }
  function closeInterval() {
    intervalRunningStatus = false;
    clearInterval(intervalId);
  }
  intervalId = StartInterval();

  //   main function
  function drawNewPoints(pointsArr) {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    for (let i = 0; i < pointsArr.length; i++) {
      const element = pointsArr[i];
      // rotateImage(element);
      movePointOnCollission(element);
      movePointToDefaultPosition(element);
      // context.fillStyle = element[4];
      context.strokeStyle = element[4];
      context.beginPath();
      context.moveTo(element[0], element[1]);
      context.lineTo(element[0] + squareSize, element[1]);
      context.stroke();
      // context.rect(element[0], element[1], squareSize, squareSize);
      // context.fill();
      // console.log("drawing");
    }
    if (shoulIntervalRun === false) {
      closeInterval();
    }
  }
  function findDistanceBetween(point1, point2) {
    let xDistance = (point1[0] - point2[0]) ** 2;
    let yDistance = (point1[1] - point2[1]) ** 2;
    return Math.sqrt(xDistance + yDistance);
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
        Math.abs(point[0] - point[2]) < 0.3 &&
        Math.abs(point[1] - point[3]) < 0.3
      ) {
        point[0] = point[2];
        point[1] = point[3];
        return;
      }
      const distance = findDistanceBetween(point, [point[2], point[3]]);
      shoulIntervalRun = true;
      pointMoved = true;
      moveCloser(point, distance);
    }
  }
  function moveCloser(point, distance) {
    // console.log("closer");
    const movementSpeed = (movementRate * distance) / mouseCircleRadius;
    const x3 =
      ((point[0] - point[2]) * (distance - movementSpeed)) / distance +
      point[2];
    const y3 =
      ((point[1] - point[3]) * (distance - movementSpeed)) / distance +
      point[3];
    point[0] = x3;
    point[1] = y3;
  }
  document.addEventListener("mousemove", (e) => {
    if (e.target === myCanvas) {
      mousePos.x = (e.offsetX / myCanvas.offsetWidth) * 500;
      mousePos.y = (e.offsetY / myCanvas.offsetHeight) * 500;
    } else {
      mousePos.x = 5000;
      mousePos.y = 5000;
    }
  });
  myCanvas.addEventListener("mouseover", () => {
    if (intervalRunningStatus === false) {
      intervalId = StartInterval();
    }
  });
}
RunParticleAvoid();
