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
let users = [];

submit.addEventListener("click", function (e) {
  e.preventDefault();

  let callback = () => {
    getUsers()
      .then((usersArr) => {
        users = usersArr;
        users.push(
          createNewUser(userName.value, userEmail.value, userPassword.value)
        );
        updateUsers(users)
          .then((data) => {
            let message = "Account Created. Enjoy Shopping";
            toastCreator(createToastStructure(message, "fa-solid fa-check"));
            setTimeout(() => {
              window.location.href = "../pages/login.html";
            }, 2500);
          })
          .catch((error) => {
            let toastStructure = ` 
            <div class="toast">
             <i class="fa-solid fa-circle-exclamation toast-icon"></i>
             <p>Failed .. Try Again !</p>
             <i class="fa-solid fa-xmark remove-toast"></i>
            </div>
            `;
            toastCreator(toastStructure);
          });
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
  formValidator(
    false,
    true,
    userName.value,
    userEmail.value,
    userPassword.value,
    callback
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
