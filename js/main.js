import {
  renderProducts,
  toTop,
  cartCardMAnager,
  menuManager,
} from "./common.js";
// show and hide menu,cart card and the back to top btn functionality
toTop();
menuManager();
cartCardMAnager();

// render products in dom
const productsContainer = document.querySelector(".products-container");
