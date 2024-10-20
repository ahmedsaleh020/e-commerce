import {
  toastCreator,
  formValidator,
  createToastStructure,
  getUsers,
  updateLocalStorg,
} from "./common.js";
const submit = document.querySelector("input[value='Login']");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const loader = document.querySelector(".loader");
let callback = (user) => {
  getUsers()
    .then((data) => {
      let user = data.find((user) => {
        return user["useremail"] == userEmail.value;
      });
      if (user) {
        if (
          user["useremail"] == userEmail.value &&
          user["userpassword"] == userPassword.value
        ) {
          updateLocalStorg("my-account", user);
          loader.classList.add("hide-loader");
          let message = `Welcome Back ${user.username}`;
          toastCreator(createToastStructure(message, "fa-solid fa-check"));
          setTimeout(() => {
            window.location.href = "../pages/myaccount.html";
          }, 2000);
        } else {
          loader.classList.add("hide-loader");
          let message = `Wrong Password Or Email !`;
          toastCreator(createToastStructure(message));
        }
      } else {
        loader.classList.add("hide-loader");
        let message = `Account Hasn't Found !`;
        toastCreator(createToastStructure(message));
      }
    })
    .catch((error) => {
      loader.classList.add("hide-loader");
      toastCreator(
        createToastStructure("No Internet Available .. Try Again Later")
      );
    });
};
submit.addEventListener("click", function (e) {
  e.preventDefault();
  loader.classList.remove("hide-loader");
  formValidator(true, false, "", userEmail.value, userPassword.value, callback,loader);
});
