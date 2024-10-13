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
        id,
      } = element;
      // product card
      const productCard = `
    <div class="product">
                <div class="overlay">
                  <span><i data-price="${price}" data-image="${image}"  data-title="${title}" data-id=${id} class="fa-solid fa-cart-plus addToCart"></i></span>
                  <span><i data-price="${price}" data-image="${image}"  data-title="${title}" data-id=${id} class="fa-solid fa-heart addToWishList"></i></span>
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
    const { prodTitle, prodImg, prodPrice, prodId } = element;
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
     <i class="fa-solid fa-trash-can item-remove" data-id=${prodId} data-title=${prodTitle}></i>
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
  if (productsContainer) {
    productsContainer.addEventListener("click", function (e) {
      //add to cart functionality
      if (e.target.classList.contains("addToCart")) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(cart);
        let prodPrice = e.target.dataset.price;
        let prodTitle = e.target.dataset.title;
        let prodImg = e.target.dataset.image;
        let prodId = e.target.dataset.id;
        // update the cart array with the new product
        cart.push({ prodImg, prodPrice, prodTitle, prodId });
        // update local storage
        updateLocalStorg("cart", cart);
        // localStorage.setItem("cart", JSON.stringify(cart));
        // add toast
        toastCreator();
        // update dom
        renderProductsInCart();
      }
    });
  }
}
// remove from cart
export function removeFromCart() {
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("item-remove")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      let itemId = e.target.dataset.id;
      // remove item from cart array
      cart.splice(
        cart.findIndex((item) => item.prodId == itemId),
        1
      );
      // update local storage
      updateLocalStorg("cart", cart);
      // localStorage.setItem("cart", JSON.stringify(cart));
      // update dom
      renderProductsInCart();
    }
  });
}
// function that update local storage
export function updateLocalStorg(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// get products from api
export async function getProducts() {
  const api = "https://api.jsonbin.io/v3/b/67067371acd3cb34a893f8a9?meta=false";
  try {
    const res = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key":
          "$2a$10$QstHdfpftj1UKZ5ngyGQEuUNdSqdxGIiIV2QNH05enyCLBoDk9H/q",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
// create toast
export function toastCreator() {
  const toastContainer = document.querySelector(".toasts-container");
  if (toastContainer) {
    const toast = `
      <div class="toast">
          <i class="fa-solid fa-thumbs-up success-icon"></i>
          <div class="toast-txt">
            <h3>Success</h3>
            <p>Product has added to your cart successfully</p>
          </div>
          <button class="view-cart">View Cart</button>
          <i class="fa-solid fa-xmark remove-toast"></i>
        </div>
    
    `;
    toastContainer.insertAdjacentHTML("afterbegin", toast);
    // to let the toast slide in smooth
    setTimeout(() => {
      document.querySelector(".toast").classList.add("active-toast");
    }, 20);
    // store the new Toast in variable to easily removing it
    let newToast = toastContainer.querySelector(".toast");
    //     // to remove the toast by user
    removeToast();

    // remove the toast after 2 sec
    removeAfterDelay(newToast);
  } else {
    console.log("toasts are unavailable in this page");
  }
}
// remove toast
export function removeToast() {
  const toastsContainer = document.querySelector(".toasts-container");
  if (toastsContainer) {
    toastsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-toast")) {
        e.target.parentElement.classList.remove("active-toast");
        e.target.parentElement.remove();
      }
    });
  }
}
// function that remove element passed from dom after 2 sec
function removeAfterDelay(toastElement) {
  setTimeout(() => {
    toastElement.classList.remove("active-toast");
    setTimeout(() => {
      toastElement.remove();
    }, 200);
  }, 3000);
}
// view cart through toast btn
export function viewCart() {
  const toastsContainer = document.querySelector(".toasts-container");
  if (toastsContainer) {
    toastsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("view-cart")) {
        const cartCard = document.querySelector(".cart-card");
        openClose(cartCard, "active-cart");
      }
    });
  }
}
