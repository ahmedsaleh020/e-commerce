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
// filter functionality
const filterBtn = document.querySelector(".filter-btn");
filterBtn.addEventListener("click", function () {
  const products = JSON.parse(localStorage.getItem("products"));
  const selectedFilters = getSelectedFilters();
  const filteredProducts = applyFilters(products, selectedFilters);
  // render the filtered products in dom
  renderProducts(productsContainer, filteredProducts);
  // uncheck all the checkboxes
  document
    .querySelectorAll(".filter input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
  // close the filter page to show the page of products
  const filterCard = document.querySelector(".filter");
  openClose(filterCard, "active-filter");
});

function getSelectedFilters() {
  const selectedCategories = [];
  document
    .querySelectorAll('.filter-category input[type="checkbox"]:checked')
    .forEach((checkbox) => {
      selectedCategories.push(checkbox.id);
    });

  const priceFilter = document.querySelector(
    '.filter-price input[type="checkbox"]:checked'
  )?.id;
  const ratingFilter = document.querySelector(
    '.filter-rate input[type="checkbox"]:checked'
  )?.id;

  return {
    categories: selectedCategories,
    price: priceFilter,
    rating: ratingFilter,
  };
}

function applyFilters(products, filters) {
  let filteredProducts = products;

  // Filter by categories
  if (filters.categories.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.categories.includes(product.category.toLowerCase())
    );
  }

  // Filter by price
  if (filters.price === "high-price") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (filters.price === "low-price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  // Filter by rating
  if (filters.rating === "high-rate") {
    filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
  } else if (filters.rating === "low-rate") {
    filteredProducts.sort((a, b) => a.rating.rate - b.rating.rate);
  }

  return filteredProducts;
}
