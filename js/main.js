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
  getUsers,
  updateUsers,
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
loginandSignupBtnsHandler();
// contact page
const conactSection = document.querySelector(".contact-section");

function contact() {
  if (!conactSection) return;
  else {
    const loader = document.querySelector(".loader");
    const myAccount = JSON.parse(localStorage.getItem("my-account"));
    const nameField = document.querySelector("#name-field");
    const emailField = document.querySelector("#email-field");
    const messageField = document.querySelector("#message-field");
    const submitBtn = document.querySelector(".send-btn");
    if (myAccount) {
      nameField.value = myAccount["username"];
      emailField.value = myAccount["useremail"];
    }
    getUsers()
      .then((data) => {
        let users = data;
        let admin = users.find((user) => user["role"] == "admin");
        submitBtn.addEventListener("click", function (e) {
          e.preventDefault();
          loader.classList.remove("hide-loader");
          let message = {
            senderEmail: emailField.value,
            senderName: nameField.value,
            messageContent: messageField.value,
          };
          admin["messages"].push(message);
          updateUsers(users)
            .then((data) => {
              loader.classList.add("hide-loader");
              let message = "Sent Successfully !";
              let icon = "fas fa-check";
              toastCreator(createToastStructure(message, icon));
              messageField.value = "";
            })
            .catch((error) => {
              loader.classList.add("hide-loader");
              let message = "Failed!";
              toastCreator(createToastStructure(message));
            });
        });
      })
      .catch((error) => {
        loader.classList.add("hide-loader");
        let message = "No Connection !";
        toastCreator(createToastStructure(message));
      });
  }
}
contact();
// messages page
const myAccount = JSON.parse(localStorage.getItem("my-account"));
const messagesContainer = document.querySelector(".messages-container");

function messagesCreator() {
  // clean the container
  messagesContainer.innerHTML = "";
  if (myAccount["messages"].length == 0) {
    const messageStructure = `
    <div class="message" data-available="false">
   <P style="text-align:center;">No Messages ...</P> 
  </div>`;
    messagesContainer.insertAdjacentHTML("beforeend", messageStructure);
  } else {
    myAccount["messages"].forEach(
      ({ messageContent, senderEmail, senderName }) => {
        const messageStructure = `<div class="message" data-available="true" data-name="${senderName}" data-email="${senderEmail}" data-message="${messageContent}">
                <span class="sender-name-field"
                  >Sender Name: <span class="sender-name">${senderName}</span></span
                >
                <span class="sender-email-field"
                  >Sender Email: <span class="sender-email">${senderEmail}</span>
                </span>
                <p class="message-content-field">
                  Message :<br />
                  <span class="message-content"
                    >${messageContent}</span
                  >
                </p>
              </div>`;
        messagesContainer.insertAdjacentHTML("beforeend", messageStructure);
      }
    );
  }
}
function showMessageInPreview(element) {
  let messagePreviewerContainer = document.querySelector(".message-previewer");
  messagePreviewerContainer.innerHTML = "";
  let html = `
  <div class="sender-data">
      <img src="../images/default-account-img.jpg" alt="" />
      <p class="sender-name-prev">${element.dataset.name}</p>
      <p class="sender-email-prev">${element.dataset.email}</p>
    </div>

    <div class="message-content-prev">
      <p class="msg receiver-sign">
      ${element.dataset.message.replaceAll("\n", "<br>")}
      </p>
    </div>

    <form>
      <input type="text" placeholder="Write an reply here ..." />
      <input type="submit" value="Reply" />
    </form>
`;
  messagePreviewerContainer.insertAdjacentHTML("beforeend", html);
}
function selectMessage() {
  messagesContainer.addEventListener("click", function (e) {
    if (e.target.closest(".message")) {
      if (e.target.closest(".message").dataset.available == "true") {
        messagesContainer
          .querySelectorAll(".message")
          .forEach((message) => message.classList.remove("active-message"));

        e.target.closest(".message").classList.add("active-message");
        showMessageInPreview(e.target.closest(".message"));
      }
    } else {
      return;
    }
  });
}
function messagesManager() {
  const messagesSection = document.querySelector(".messages-section");
  if (messagesSection) {
    if (myAccount && myAccount["role"] == "admin") {
      messagesCreator();
      selectMessage();
    } else {
      window.location.href = "../pages/404.html";
    }
  }
}
messagesManager();
