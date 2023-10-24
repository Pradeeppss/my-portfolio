// function imageData() {
//   const myCanvas = document.querySelector("#my-canvas3");
//   const context = myCanvas.getContext("2d");
//   const img = document.querySelector(".avatar");

//   context.lineWidth = 2;
//   context.fillStyle = "white";

//   context.scale(0.5, 0.5);
//   context.drawImage(img, 100, 100);
//   console.log(img.offsetHeight, img.offsetWidth);
//   const imgData = context.getImageData(
//     100,
//     100,
//     img.offsetHeight,
//     img.offsetWidth
//   );
//   console.log(imgData);
//   for (let i = 0; i < imgData.data.length; i += 4) {
//     if (i < 1440 + 720) {
//       imgData.data[i] = imgData.data[i];
//       imgData.data[i + 1] = imgData.data[i + 1];
//       imgData.data[i + 2] = imgData.data[i + 2];
//       continue;
//     }
//     imgData.data[i] = 255 - imgData.data[i];
//     imgData.data[i + 1] = 255 - imgData.data[i + 1];
//     imgData.data[i + 2] = 255 - imgData.data[i + 2];
//   }
//   context.putImageData(imgData, 280, 100);
// }
// imageData();
