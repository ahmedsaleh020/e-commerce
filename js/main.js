// functions
const openClose = function (element, cls) {
  element.classList.toggle(cls);
};
// close and open menu
const menu = document.querySelector(".links");
const menuBars = document.querySelector(".menu-icon");
const menuCloseBtn = document.querySelector(".close-menu");
menuBars.addEventListener("click", function () {
  openClose(menu, "active-menu");
});
menuCloseBtn.addEventListener("click", function () {
  openClose(menu, "active-menu");
});
// close and open cart card
const cartIcon = document.querySelector(".cart-container");
const cartCard = document.querySelector(".cart-card");
const cartCloseBtn = document.querySelector(".close-cart");
cartIcon.addEventListener("click", function () {
  openClose(cartCard, "active-cart");
});
cartCloseBtn.addEventListener("click", function () {
  openClose(cartCard, "active-cart");
});
// Slider
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider-btn--left");
const btnRight = document.querySelector(".slider-btn--right");
let currentSlide = 0;
slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${100 * index}%)`;
});

btnRight.addEventListener("click", function () {
  currentSlide++;
  console.log(currentSlide);
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
});
btnLeft.addEventListener("click", function () {
  currentSlide--;
  console.log(currentSlide);
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
});
