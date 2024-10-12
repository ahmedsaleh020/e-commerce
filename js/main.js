import { openClose } from "./common.js";

// close and open menu
function menuManager() {
  const menu = document.querySelector(".links");
  const menuBars = document.querySelector(".menu-icon");
  const menuCloseBtn = document.querySelector(".close-menu");
  menuBars.addEventListener("click", function () {
    openClose(menu, "active-menu");
  });
  menuCloseBtn.addEventListener("click", function () {
    openClose(menu, "active-menu");
  });
}
menuManager();
// close and open cart card
function cartCardMAnager() {
  const cartIcon = document.querySelector(".cart-container");
  const cartCard = document.querySelector(".cart-card");
  const cartCloseBtn = document.querySelector(".close-cart");
  cartIcon.addEventListener("click", function () {
    openClose(cartCard, "active-cart");
  });
  cartCloseBtn.addEventListener("click", function () {
    openClose(cartCard, "active-cart");
  });
}
cartCardMAnager();
// back to top
function toTop() {
  const toTopBtn = document.querySelector(".back-to-top");
  toTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}
toTop();
