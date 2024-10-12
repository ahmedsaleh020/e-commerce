import { openClose } from "./common.js";
function filterManager() {
  const filterCard = document.querySelector(".filter");
  const filterIcon = document.querySelector(".filter-icon");
  const filterCloseBtn = document.querySelector(".close-filter");
  filterIcon.addEventListener("click", function () {
    openClose(filterCard, "active-filter");
  });
  filterCloseBtn.addEventListener("click", function () {
    openClose(filterCard, "active-filter");
  });
}
filterManager();
