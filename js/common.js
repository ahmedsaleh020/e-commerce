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
  return price.toFixed(2);
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
      const productCard = `
    <div class="product">
                <div class="overlay">
                  <span><i data-price="${price}" data-image="${image}"  data-title="${title}" class="fa-solid fa-cart-plus"></i></span>
                  <span><i data-price="${price}" data-image="${image}"  data-title="${title}" class="fa-solid fa-heart"></i></span>
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
