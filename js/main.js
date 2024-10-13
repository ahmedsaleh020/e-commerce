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
  getProducts,
  updateLocalStorg,
} from "./common.js";
// show and hide menu,cart card and the back to top btn functionality
toTop();
menuManager();
cartCardMAnager();
// render products of the cart
renderProductsInCart();
// get products from api
let products = await getProducts();
if (products) {
  updateLocalStorg("products", products);
} else {
  console.log("no prods");
}
// render products in dom
const productsContainer = document.querySelector(".products-container");
let prods = JSON.parse(localStorage.getItem("products")).slice(0, 8);
renderProducts(productsContainer, prods);
// add to cart
addToCart();
// remove from cart
removeFromCart();
