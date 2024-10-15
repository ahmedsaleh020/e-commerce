const addBtn = document.querySelector("input[type='submit']");
let products = JSON.parse(localStorage.getItem("products"));
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const price = document.querySelector("#price").value;
  const rate = document.querySelector("#rate").value;
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#Description").value;
  const category = document.querySelector("#category").value;
  const file = document.querySelector("#fileInput");
  if (rate <= 0 || rate > 5) {
    alert("rate should be between 1-5 ");
  } else {
    uploadImage(file.files[0]).then((url) => {
      // add new product to products array
      products.push({
        ...productData(price, rate, title, category, description, url),
      });
      // update the products remote json file AKA server
      addProduct(products);
      //
      alert("product added");
    });
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
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
      alert("Try Again !");
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
