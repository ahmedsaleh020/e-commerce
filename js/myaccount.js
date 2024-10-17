import { createToastStructure, toastCreator } from "./common.js";
const accountSection = document.querySelector(".account-section");
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
          Password : <span>${userpassword}</span>
          <i class="fa-solid fa-pen-to-square edit-password"></i
          ><i class="fa-solid fa-eye show-password"></i>
        </p>
        <form class="hide-change-password">
          <input
            type="password"
            class="change password"
            placeholder="New Password"
          />
          <input type="submit" value="Save" />
        </form>
       ${addControlPanelBtn(role)}
      </div>`;
      accountSection.insertAdjacentHTML("beforeend",html)
} else {
  let message = "You Are Not Allowed To Be Here";
  toastCreator(createToastStructure(message));
  setTimeout(() => {
    window.location.href = "../pages/signup.html";
  }, 3000);
}

function addControlPanelBtn(role) {
  if (role == "admin") {
    return `<a class="control-panel-btn" href="./control-panel.html">
        Control Panel
      </a>`;
  } else {
    return "";
  }
}
