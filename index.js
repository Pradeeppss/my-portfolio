import particleWithLines from "./js/particle.js";
const navlist = document.querySelector(".navlist");
const navButtons = document.querySelectorAll(".nav-button");
const allPages = document.querySelectorAll(".full-sections");

navlist.addEventListener("click", (e) => {
  let pageNo = e.target.getAttribute("data-pageNo");

  if (allPages[pageNo].getAttribute("data-side") === "middle") return;
  if (pageNo) {
    navigateToPageNo(pageNo);
    toggleActivationOfCanvasInterval(pageNo);
  }
});

function navigateToPageNo(pageNo) {
  for (let i = 0; i < allPages.length; i++) {
    const element = allPages[i];
    const navElement = navButtons[i];
    if (Number(pageNo) === i) {
      navElement.setAttribute("aria-selected", true);
      element.setAttribute("data-side", "middle");
    } else {
      navElement.setAttribute("aria-selected", false);
      if (Number(pageNo) > i) {
        element.setAttribute("data-side", "left");
      } else {
        element.setAttribute("data-side", "right");
      }
    }
  }
}

let particleWithLinesId;

function toggleActivationOfCanvasInterval(pageNo) {
  switch (allPages[pageNo].getAttribute("aria-label")) {
    case "projects":
      particleWithLinesId = particleWithLines();
      console.log(particleWithLinesId);
      break;
    case "home":
      clearAllIntervals(particleWithLinesId);
      break;
    case "about":
      clearAllIntervals(particleWithLinesId);
      break;
    default:
      break;
  }
}

function clearAllIntervals(...ids) {
  for (let id of ids) {
    console.log(id);
    cancelAnimationFrame(id);
  }
}
