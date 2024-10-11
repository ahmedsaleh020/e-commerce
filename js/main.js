// Global Functions
const openClose = function (element, cls) {
  element.classList.toggle(cls);
};
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
