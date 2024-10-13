import {
  openClose,
  menuManager,
  cartCardMAnager,
  toTop,
  addToCart,
  removeFromCart,
  renderProductsInCart,
  getProducts,
  renderProducts,
  updateLocalStorg,
  removeToast,
  viewCart,
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
// get products from api only when there is no products stored in local storage from the previous request so not every time make new request
const productsContainer = document.querySelector(".products-container");
const loader = document.querySelector(".loader");
let products = JSON.parse(localStorage.getItem("products")) || [];
if (products.length == 0) {
  getProducts().then((products) => {
    // remove loader
    loader.classList.add("hide-loader");
    // render products in dom
    renderProducts(productsContainer, products);
    // save the products to local storage so next time render them from it instead of make new req
    updateLocalStorg("products", products);
  });
} else {
  // render products in dom
  renderProducts(productsContainer, products);
}
// add to cart
addToCart();
// remove from cart
removeFromCart();
// remove toast
removeToast();
// view cart through toast
viewCart();
