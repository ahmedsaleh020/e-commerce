export const openClose = function (element, cls) {
  element.classList.toggle(cls);
};
export const ratingCreator = function (rating) {
  return `<i class="fa-solid fa-star"></i>`.repeat(rating);
};
export const categoryCreator = function (category) {
  return `<span>${category}</span>`;
};
export const priceFormatter = function (price) {
  return Number(price).toFixed(2);
};
export const renderProducts = function (container, productsArr) {
  // handling the error in pages that doesn't have containers for products
  if (!container) {
    console.log("there is no products to show here");
  } else {
    // clean the container
    container.innerHTML = "";
    productsArr.forEach((element) => {
      // destruct the element object
      const {
        image,
        title,
        price,
        category,
        rating: { rate, count },
      } = element;
      // product card
      console.log(image, title, price, category, rate, count);
      const productCard = `
    <div class="product">
                <div class="overlay">
                  <span><i data-price="${price}" data-image="${image}"  data-title="${title}" class="fa-solid fa-cart-plus addToCart"></i></span>
                  <span><i data-price="${price}" data-image="${image}"  data-title="${title}" class="fa-solid fa-heart addToWishList"></i></span>
                </div>
                <img
                  src="${image}"
                  alt="product-image"
                  class="product-img"
                />
                <p class="product-title">
                  ${title}
                </p>
                <div class="product-rating">
  ${ratingCreator(rate)}
                </div>
                <p class="product-price">${priceFormatter(price)}$</p>
                <div class="categories">
  ${categoryCreator(category)}
              </div>
              </div>
  `;

      // add card to container
      container.insertAdjacentHTML("beforeend", productCard);
    });
  }
};
// close and open menu
export function menuManager() {
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

// close and open cart card
export function cartCardMAnager() {
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
// back to top
export function toTop() {
  const toTopBtn = document.querySelector(".back-to-top");
  toTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
}
// render products in cart card
export function renderProductsInCart() {
  // variables
  const cartCard = document.querySelector(".cart-items");
  const cartCounter = document.querySelector(".cart-counter");
  const cartTotal = document.querySelector(".cart-total");
  let total = 0;
  // get the array of cart products from the local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // clean the cart card
  cartCard.innerHTML = "";
  cart.forEach((element) => {
    const { prodTitle, prodImg, prodPrice } = element;
    // calc the total
    total += Number(prodPrice);
    const productCard = `
    <div class="cart-item">
    <img
      class="item-img"
      src="${prodImg}"
      alt="item-img"
    />
    <div class="item-detailes">
      <h4 class="item-title">
        ${prodTitle}
      </h4>
      <p class="item-price">${priceFormatter(prodPrice)}$</p>
     </div>
     <i class="fa-solid fa-trash-can item-remove"></i>
     </div>`;
    cartCard.insertAdjacentHTML("beforeend", productCard);
  });
  //update the cart total
  cartCounter.textContent = cart.length;
  // update the subtotal of the cart
  cartTotal.textContent = `${priceFormatter(total)}$`;
}
// add to cart
export function addToCart() {
  const productsContainer = document.querySelector(".products-container");

  productsContainer.addEventListener("click", function (e) {
    //add to cart functionality
    if (e.target.classList.contains("addToCart")) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      console.log(cart);
      let prodPrice = e.target.dataset.price;
      let prodTitle = e.target.dataset.title;
      let prodImg = e.target.dataset.image;
      console.log(prodPrice, prodTitle, prodImg);
      // update the cart array with the new product
      cart.push({ prodImg, prodPrice, prodTitle });
      console.log(cart);
      // update local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      // update dom
      renderProductsInCart();
    }
  });
}
