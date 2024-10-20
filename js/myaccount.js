import {
  createToastStructure,
  getUsers,
  toastCreator,
  updateLocalStorg,
  updateUsers,
} from "./common.js";
const accountSection = document.querySelector(".account-section");
const logOutBtn = document.querySelector(".log-out");
const logOutLoader = document.querySelector(".btns .loader")
let myAccount = JSON.parse(localStorage.getItem("my-account"));
if (myAccount) {
  let { username, useremail, userpassword, role } = myAccount;
  const html = `      <div class="container">
        <img
          class="account-image"
          src="../images/default-account-img.jpg"
          alt=""
        />

        <p class="account-name">Name : <span>${username}</span></p>
        <p class="account-email">Email : <span>${useremail}</span></p>
        <p class="account-password">
          Password : <span>${mask(userpassword)}</span>
          <i class="fa-solid fa-pen-to-square edit-password"></i
          ><i class="fa-solid fa-eye show-password"></i>
        </p>
        <form class="hide-change-password">
          <input
            type="password"
            class="change-password-input"
            placeholder="New Password"
          />
          <input class="save-btn" type="submit" value="Save" />
          <div class="loader hide-loader"></div>
        </form>
       ${addControlPanelBtn(role)}
      </div>`;
  accountSection.insertAdjacentHTML("beforeend", html);
} else {
  // redirect user to 404 page
  window.location.href = "./404.html";
}
// render control panel btn only for admin
function addControlPanelBtn(role) {
  if (role == "admin") {
    return `<a class="control-panel-btn" href="./control-panel.html">
        Control Panel
      </a>`;
  } else {
    return "";
  }
}
// log out
logOutBtn.addEventListener("click", function (e) {
  logOutLoader.classList.remove("hide-loader")
  e.preventDefault();
  // update his account cart on the json bin aka server so when logged in from other browser can reach his updated cart
  getUsers()
    .then((data) => {
      let users = data;
      let userIndex = users.findIndex(
        (user) => user["userid"] == myAccount["userid"]
      );
      users[userIndex]["usercart"] = myAccount["usercart"];
      updateUsers(users)
        .then((data) => {
          // remove login data
          logOutLoader.classList.add("hide-loader")
          removeLoginData();
        })
        .catch((error) => {
          logOutLoader.classList.add("hide-loader")
          message = "No Connection ! Try Log Out Later";
          toastCreator(createToastStructure(message));
        });
    })
    .catch((error) => {
      logOutLoader.classList.add("hide-loader")
      message = "No Connection ! Try Log Out Later";
      toastCreator(createToastStructure(message));
    });
});
function removeLoginData(href = "../index.html") {
  myAccount = null;
  updateLocalStorg("my-account", myAccount);
  setTimeout(() => {
    window.location.href = href;
  }, 500);
}
function mask(str) {
  return "*".repeat(str.length);
}
const chagePasswordForm = document.querySelector(".account-section form");
const newPassword = document.querySelector(".change-password-input");
// change password
const changePasswordLoader = document.querySelector(".hide-change-password .loader")
const editPasswordBtn = document.querySelector(".edit-password");
editPasswordBtn.addEventListener("click", function () {
  changePassword();
});
function changePassword() {
  chagePasswordForm.classList.remove("hide-change-password");
  getUsers()
    .then((data) => {
      let users = data;
      let userIndex = users.findIndex((user) => {
        return user["userid"] == myAccount.userid;
      });
      const saveBtn = document.querySelector(".save-btn");
      saveBtn.addEventListener("click", function (e) {
        changePasswordLoader.classList.remove("hide-loader")
        e.preventDefault();
        if (newPassword.value == "") {
          changePasswordLoader.classList.add("hide-loader")
          let message = "Can't Save Empty Password !";
          toastCreator(createToastStructure(message));
        } else if (newPassword.value.length <= 8) {
          changePasswordLoader.classList.add("hide-loader")
          let message = "Password must be more than 8 characters";
          toastCreator(createToastStructure(message));
        } else {
          users[userIndex].userpassword = newPassword.value;
          updateUsers(users)
            .then((data) => {
              changePasswordLoader.classList.add("hide-loader")
              let message = "password saved successfully";
              toastCreator(createToastStructure(message));
              removeLoginData("../pages/login.html");
            })
            .catch((error) => {
              changePasswordLoader.classList.add("hide-loader")
              let message = "Not Saved, Try Again!";
              toastCreator(createToastStructure(message));
            });
        }
      });
    })
    .catch((error) => {
      changePasswordLoader.classList.add("hide-loader")
      let message = "No Connection !";
      toastCreator(createToastStructure(message));
    });
}
// show and hide password
const showBtn = document.querySelector(".show-password");
showBtn.addEventListener("click", function (e) {
  showPassword(e);
});
function showPassword(e) {
  if (e.target.classList.contains("fa-eye")) {
    document.querySelector(".account-password span").textContent =
      myAccount.userpassword;
    document.querySelector(".fa-eye").classList.add("fa-eye-slash");
    document.querySelector(".fa-eye").classList.remove("fa-eye");
  } else if (e.target.classList.contains("fa-eye-slash")) {
    document.querySelector(".account-password span").textContent = mask(
      myAccount.userpassword
    );
    document.querySelector(".fa-eye-slash").classList.add("fa-eye");
    document.querySelector(".fa-eye").classList.remove("fa-eye-slash");
  }
}
