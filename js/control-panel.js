import { toastCreator, removeToast, createToastStructure } from "./common.js";
const addBtn = document.querySelector("input[type='submit']");
let products = JSON.parse(localStorage.getItem("products"));
const controlPanelSection = document.querySelector(".add-new-product");
// prevent users from using control panel to be used by admin only
controlPanelSection.style.display = "none";
const myAccount = JSON.parse(localStorage.getItem("my-account"));
if (!myAccount || myAccount.role == "user") {
  // redirect user to 404 page
  window.location.href = "./404.html";
} else {
  controlPanelSection.style.display = "block";
}
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const price = document.querySelector("#price");
  const rate = document.querySelector("#rate");
  const title = document.querySelector("#title");
  const description = document.querySelector("#Description");
  const category = document.querySelector("#category");
  const file = document.querySelector("#fileInput");
  if (
    price.value == "" ||
    price.value == 0 ||
    rate.value == "" ||
    title.value == "" ||
    description.value == "" ||
    file.value == ""
  ) {
    let message = "Fill All Product Destails Please";
    toastCreator(createToastStructure(message));
  } else {
    if (rate.value <= 0 || rate.value > 5) {
      let message = "rate should be between 1-5 ";
      toastCreator(createToastStructure(message));
    } else {
      uploadImage(file.files[0]).then((url) => {
        // add new product to products array
        products.push({
          ...productData(
            price.value,
            rate.value,
            title.value,
            category.value,
            description.value,
            url
          ),
        });
        // update the products remote json file AKA server
        addProduct(products);
        // reset fileds
        price.value = "";
        title.value = "";
        rate.value = "";
        description.value = "";
        category.selectedIndex = 0;
        file.value = "";
      });
    }
  }
});

function productData(price, rate, title, category, description, url) {
  return {
    id: +new Date(),
    title: title,
    price: price,
    description: description,
    category: category,
    image: url,
    rating: {
      rate: rate,
      count: Math.round(Math.random() * 300),
    },
  };
}

const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dnglebvwu/image/upload";
const cloudinaryPreset = "control";

async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryPreset); // Use the preset

  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.secure_url; // This is the direct URL to the uploaded image
}

function addProduct(products) {
  fetch("https://api.jsonbin.io/v3/b/67067371acd3cb34a893f8a9", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key":
        "$2a$10$Nv7DRlqErVa4H50Kycw6p.V6XTwrfj9KFkpuEPE7v8QsDW3XbWoXO",
    },
    body: JSON.stringify(products),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let toastStructure = `
<div class="toast">
 <i class="fa-solid fa-check toast-icon"></i>
 <p>Product Added !</p>
 <i class="fa-solid fa-xmark remove-toast"></i>
</div>

`;
      toastCreator(toastStructure);
    })
    .catch((err) => {
      console.error(err);
      let message = "Try Again !";
      toastCreator(createToastStructure(message));
    });
}
function getProducts() {
  fetch("https://api.jsonbin.io/v3/b/67067371acd3cb34a893f8a9?meta=false", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Key":
        "$2a$10$Nv7DRlqErVa4H50Kycw6p.V6XTwrfj9KFkpuEPE7v8QsDW3XbWoXO",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("products", JSON.stringify(data));
    });
}
getProducts();
