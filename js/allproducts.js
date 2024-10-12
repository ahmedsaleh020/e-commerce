import {
  renderProducts,
  toTop,
  cartCardMAnager,
  menuManager,
  renderProductsInCart,
  addToCart,
  openClose,
  priceFormatter,
  removeFromCart,
} from "./common.js";
//show and hide filter card
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
// show and hide menu,cart card and the back to top btn functionality
toTop();
menuManager();
cartCardMAnager();
// render products of the cart
renderProductsInCart();
// render products in dom
const productsContainer = document.querySelector(".products-container");
// add to cart
addToCart();
// remove from cart
removeFromCart();
