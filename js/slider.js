function slider() {
    // variables
    const slides = document.querySelectorAll(".slide");
    const slider = document.querySelector(".slider");
    const btnLeft = document.querySelector(".slider-btn--left");
    const btnRight = document.querySelector(".slider-btn--right");
    const dotContainer = document.querySelector(".dots");
    let currentSlide = 0;
    let maxSlide = slides.length - 1;
    // functions
    function goToSlide(slideNum) {
      slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - slideNum)}%)`;
      });
      activateDot(slideNum);
    }
    const nextSlide = function () {
      if (currentSlide === maxSlide) {
        currentSlide = 0;
      } else {
        currentSlide++;
      }
      goToSlide(currentSlide);
    };
    const prevSlide = function () {
      if (currentSlide === 0) {
        currentSlide = maxSlide;
      } else {
        currentSlide--;
      }
      goToSlide(currentSlide);
    };
  
    const createDots = function () {
      slides.forEach((_, index) => {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<span class="dot" data-slide="${index}"></span>`
        );
      });
    };
    const activateDot = function (slide) {
      document
        .querySelectorAll(".dot")
        .forEach((dot) => dot.classList.remove("active"));
      document
        .querySelector(`.dot[data-slide="${slide}"`)
        .classList.add("active");
    };
    //event handling
    dotContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dot")) {
        goToSlide(e.target.dataset.slide);
        e.target.classList.add("active");
      }
    });
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
    document.addEventListener("keydown", function (e) {
      if (e.key == "ArrowRight") {
        nextSlide();
      } else if (e.key == "ArrowLeft") {
        prevSlide();
      }
    });
    createDots();
    goToSlide(0);
  
    // slider works automatically
    setInterval(() => {
      nextSlide();
    }, 3000);
  }
  slider();
  