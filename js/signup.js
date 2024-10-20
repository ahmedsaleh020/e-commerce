import {
  formValidator,
  getUsers,
  toastCreator,
  createToastStructure,
  updateUsers,
} from "./common.js";
const submit = document.querySelector("input[value='Sign up']");
const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");
const loader = document.querySelector(".loader");
let users = [];

submit.addEventListener("click", function (e) {
  e.preventDefault();
  loader.classList.remove("hide-loader");
  let callback = () => {
    getUsers()
      .then((usersArr) => {
        users = usersArr;
        users.push(
          createNewUser(userName.value, userEmail.value, userPassword.value)
        );
        updateUsers(users)
          .then((data) => {
            loader.classList.add("hide-loader");
            let message = "Account Created. Enjoy Shopping";
            toastCreator(createToastStructure(message, "fa-solid fa-check"));
            setTimeout(() => {
              window.location.href = "../pages/login.html";
            }, 2500);
          })
          .catch((error) => {
            loader.classList.add("hide-loader");
            toastCreator(createToastStructure("Failed .. Try Again !"));
          });
      })
      .catch((error) => {
        loader.classList.add("hide-loader");
        toastCreator(
          createToastStructure("No Internet Available .. Try Again Later")
        );
      });
  };
  formValidator(
    false,
    true,
    userName.value,
    userEmail.value,
    userPassword.value,
    callback,
    loader
  );
});

const createNewUser = (userName, userEmail, userPassword) => {
  let user = {
    username: `${userName}`,
    useremail: `${userEmail}`,
    userpassword: `${userPassword}`,
    usercart: [],
    userid: `${+new Date()}`,
    role: "user",
  };
  return user;
};
