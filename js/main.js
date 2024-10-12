import {
  renderProducts,
  toTop,
  cartCardMAnager,
  menuManager,
  renderProductsInCart,
} from "./common.js";
// show and hide menu,cart card and the back to top btn functionality
toTop();
menuManager();
cartCardMAnager();
// render products of the cart
renderProductsInCart();
// render products in dom
const productsContainer = document.querySelector(".products-container");
