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
// render products in cart card
export function renderProductsInCart() {
  // variables
  const cartCard = document.querySelector(".cart-items");
  const cartCounter = document.querySelector(".cart-counter");
  const cartTotal = document.querySelector(".cart-total");
  let total = 0;
  // get the array of cart products from the local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // get the account if there is logged in acc
  const myAccount = JSON.parse(localStorage.getItem("my-account"));
  // empty array
  let userCart;

  // if there is account logged in
  if (myAccount) {
    // so render his cart products and if the cart has some items so  merge the products from the cart and his account cart
    if (cart) {
      userCart = [...myAccount["usercart"], ...cart];
      // empty the cart so not every time add the same products in the usercart
      cart = [];
      updateLocalStorg("cart", cart);
      myAccount.usercart = userCart;
      updateLocalStorg("my-account", myAccount);
    } else {
      // if there is no products in the cart so render his account cart only
      userCart = myAccount["usercart"];
    }
    renderProductsInCartHelper(userCart);
  } else {
    // if he has not account render the cart that any visitor has
    renderProductsInCartHelper(cart);
  }
  // helper function that render the products in cart and accept array of products as [param]
  function renderProductsInCartHelper(cartArr) {
    // clean the cart card
    cartCard.innerHTML = "";
    cartArr.forEach((element) => {
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
    cartCounter.textContent = cartArr.length;
    // update the subtotal of the cart
    cartTotal.textContent = `${priceFormatter(total)}$`;
  }
}
// add to cart
export function addToCart() {
  const productsContainer = document.querySelector(".products-container");
  const myAccount = JSON.parse(localStorage.getItem("my-account"));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (productsContainer) {
    productsContainer.addEventListener("click", function (e) {
      //add to cart functionality
      if (e.target.classList.contains("addToCart")) {
        if (myAccount) {
          addToCartHelper(e, myAccount["usercart"], true);
        } else {
          addToCartHelper(e, cart);
        }
      }
    });
  }
  function addToCartHelper(e, cartArr, account = false) {
    let prodPrice = e.target.dataset.price;
    let prodTitle = e.target.dataset.title;
    let prodImg = e.target.dataset.image;
    let prodId = e.target.dataset.id;
    // update the cart array with the new product
    cartArr.push({ prodImg, prodPrice, prodTitle, prodId });
    // update local storage
    if (account) {
      updateLocalStorg(`my-account`, myAccount);
    } else {
      updateLocalStorg(`cart`, cartArr);
    }
    // add toast
    toastCreator(
      createToastStructure("Added To Cart !", "fas fa-shopping-cart")
    );
    // update dom
    renderProductsInCart();
  }
}
// remove from cart
export function removeFromCart() {
  const cartItemsContainer = document.querySelector(".cart-items");
  let cart = JSON.parse(localStorage.getItem("cart"));
  const myAccount = JSON.parse(localStorage.getItem("my-account"));
  cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("item-remove")) {
      if (myAccount) {
        removeFromCartHelper(e, myAccount["usercart"], true);
      } else {
        removeFromCartHelper(e, cart);
      }
    }
    function removeFromCartHelper(e, cartArr, account = false) {
      let itemId = e.target.dataset.id;
      // remove item from cart array
      cartArr.splice(
        cartArr.findIndex((item) => item.prodId == itemId),
        1
      );
      // update local storage

      if (account) {
        updateLocalStorg("my-account", myAccount);
      } else {
        updateLocalStorg("cart", cartArr);
      }
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
    return Promise.reject(error);
  }
}
// create toast
export function toastCreator(toastStructure) {
  const toastContainer = document.querySelector(".toasts-container");
  if (toastContainer) {
    const toast = toastStructure;
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
        // to be removed smooth
        setTimeout(() => {
          e.target.parentElement.remove();
        }, 100);
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
  const cartItemsContainer = document.querySelector(".cart-items");
  if (toastsContainer) {
    toastsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("view-cart")) {
        const cartCard = document.querySelector(".cart-card");
        openClose(cartCard, "active-cart");
        // scroll to bottom when the cart opened
        scrollTo(cartItemsContainer, document.body.scrollHeight);
      }
    });
  }
}
export function scrollTo(element, position) {
  element.scrollTo({
    top: position,
    left: 0,
    behavior: "smooth",
  });
}
// back to top
export function toTop() {
  const toTopBtn = document.querySelector(".back-to-top");
  if (toTopBtn) {
    toTopBtn.addEventListener("click", function () {
      scrollTo(window, 0);
    });
  }
}
export function createToastStructure(
  message,
  icon = "fa-solid fa-circle-exclamation"
) {
  let toastStructure = `
  <div class="toast">
   <i class="${icon} toast-icon"></i>
   <p>${message}</p>
   <i class="fa-solid fa-xmark remove-toast"></i>
  </div>
  
  `;
  return toastStructure;
}
export function formValidator(login, signup, name, email, Password, callback) {
  let message = "";

  if (signup) {
    if (email == "" || name == "" || Password == "") {
      message = "Complete All Fields!";
      toastCreator(createToastStructure(message));
    } else if (!email.includes("@")) {
      message = "Email Must includes The @ Sign";
      toastCreator(createToastStructure(message));
    } else if (Password.length <= 8) {
      message = "Password Length Must be More Than 8";
      toastCreator(createToastStructure(message));
    } else {
      callback();
      return;
    }
  } else if (login) {
    if (email == "" || Password == "") {
      message = "Complete All Fields!";
      toastCreator(createToastStructure(message));
    } else if (!email.includes("@")) {
      message = "Email Must includes The @ Sign";
      toastCreator(createToastStructure(message));
    } else {
      callback();
      return;
    }
  } else {
    throw new Error("Wrong Arguments");
  }
}

// get users Array
export let getUsers = async function () {
  const api = "https://api.jsonbin.io/v3/b/6711051de41b4d34e4445bf0?meta=false";
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
    return error;
  }
};
// update users array
export function updateUsers(usersArr) {
  return fetch("https://api.jsonbin.io/v3/b/6711051de41b4d34e4445bf0", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key":
        "$2a$10$Nv7DRlqErVa4H50Kycw6p.V6XTwrfj9KFkpuEPE7v8QsDW3XbWoXO",
    },
    body: JSON.stringify(usersArr),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
export function loginandSignupBtnsHandler() {
  const loginBtn = document.querySelector(".login-btn");
  const signUpBtn = document.querySelector(".signup-btn");
  const myAccountBtn = document.querySelector(".account-btn");
  // conditon here to not let function works in pages that does.t have login AND signup btns
  if (loginBtn && signUpBtn) {
    const account = JSON.parse(localStorage.getItem("my-account"));
    if (!account) {
      signUpBtn.style.display = "flex";
      loginBtn.style.display = "flex";
    } else {
      myAccountBtn.style.display = "flex";
    }
  }
}
