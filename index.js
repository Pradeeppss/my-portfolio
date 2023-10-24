const navlist = document.querySelector(".navlist");
const allPages = document.querySelectorAll(".full-sections");

navlist.addEventListener("click", (e) => {
  let pageno = e.target.getAttribute("data-pageNo");
  if (pageno) {
    navigateToPageNo(pageno);
  }
});

function navigateToPageNo(pageNo) {
  for (let i = 0; i < allPages.length; i++) {
    const element = allPages[i];
    if (Number(pageNo) === i) {
      element.setAttribute("aria-expanded", "true");
    } else {
      element.setAttribute("aria-expanded", "false");
    }
  }
}
