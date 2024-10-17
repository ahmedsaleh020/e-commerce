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
          let message = `Welcome Back ${user.username}`;
          toastCreator(createToastStructure(message, "fa-solid fa-check"));
          setTimeout(() => {
            window.location.href = "../pages/myaccount.html";
          }, 2000);
        } else {
          let message = `Wrong Password Or Email !`;
          toastCreator(createToastStructure(message));
        }
      } else {
        let message = `Account Hasn't Found !`;
        toastCreator(createToastStructure(message));
      }
    })
    .catch((error) => {
      let toastStructure = `
<div class="toast">
 <i class="fa-solid fa-circle-exclamation toast-icon"></i>
 <p>No Internet Available .. Try Again Later</p>
 <i class="fa-solid fa-xmark remove-toast"></i>
</div>
`;
      toastCreator(toastStructure);
    });
};
submit.addEventListener("click", function (e) {
  e.preventDefault();
  formValidator(true, false, "", userEmail.value, userPassword.value, callback);
});
