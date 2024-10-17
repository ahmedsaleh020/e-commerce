import {
  renderProducts,
  toTop,
  scrollTo,
  cartCardMAnager,
  menuManager,
  renderProductsInCart,
  addToCart,
  openClose,
  priceFormatter,
  removeFromCart,
  getProducts,
  updateLocalStorg,
  toastCreator,
  removeToast,
  viewCart,
  createToastStructure,
  loginandSignupBtnsHandler,
} from "./common.js";
// show and hide menu,cart card and the back to top btn functionality
toTop();
menuManager();
cartCardMAnager();
// render products of the cart
renderProductsInCart();
// get products from api only when there is no products stored in local storage from the previous request so not every time make new request
const productsContainer = document.querySelector(".products-container");
const loader = document.querySelector(".loader");
// this condition to not do req for products in non product based pages like about and contact pages etc
if (productsContainer) {
  getProducts()
    .then((products) => {
      // remove loader
      loader.classList.add("hide-loader");
      // render 8 products in home page dom
      renderProducts(productsContainer, products.slice(0, 8));
    })
    .catch((error) => {
      toastCreator(createToastStructure("Check Connection And Try Again!"));
    });
}

// add to cart
addToCart();
// remove from cart
removeFromCart();
// remove toast
removeToast();
// view cart through toast
viewCart();
// to hide login or signup btn 
loginandSignupBtnsHandler()