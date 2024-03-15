"use strict";
///////////////////////////////////////
// select elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");

const body = document.querySelector("body");
const logo = document.querySelector(".nav__logo");

const section1 = document.getElementById("section--1");
const section2 = document.getElementById("section--2");
const section3 = document.getElementById("section--3");
const sectionSignup = document.querySelector(".section--sign-up");

const sections = document.querySelectorAll(".section");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const tabsContainer = document.querySelector(".operations__tab-container");

const navlinks = document.querySelectorAll(".nav__link");

const nav = document.querySelector(".nav");

const header = document.querySelector(".header");

const featuresImages = document.querySelectorAll(".features__img");

const slides = document.querySelectorAll(".slide");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

const navList = document.querySelector(".nav__links");

///////////////////////////////////////
// Modal window

const toggleModal = function (e) {
  e?.preventDefault();
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", toggleModal);
//
// ===
//
btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", toggleModal);
});

btnCloseModal.addEventListener("click", toggleModal);
overlay.addEventListener("click", toggleModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    toggleModal();
  }
});

///////////////////////////////////////
// cookie message

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `<h3>Cookie preferences</h3> <p>This website collects cookies to deliver better user experience and show you relevant advertising. To find more, read our update <a href="https://policies.google.com/privacy?hl=en-US" target="_blank">privacy policy</a>.</p> <button class="btn btn--close-cookie">Accept all cookies</button><button class="btn btn--reject btn--close-cookie">Reject</button>`;
body.append(message);

setTimeout(function () {
  message.style.bottom = "0";
}, 500);

document.querySelectorAll(".btn--close-cookie").forEach((btn) => {
  btn.addEventListener("click", function () {
    message.style.bottom = `-${
      Number.parseFloat(getComputedStyle(message).height) +
      Number.parseFloat(getComputedStyle(document.documentElement).fontSize) * 2
    }px`;
  });
});

///////////////////////////////////////
// button scroll to
const btnScrollFn = function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
};
btnScrollTo.addEventListener("click", btnScrollFn);

///////////////////////////////////////
// navbar buttons scroll to
navList.addEventListener("click", function (e) {
  const id =
    e.target.getAttribute("href") === "#"
      ? undefined
      : e.target.getAttribute("href");
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// implement tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard class
  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////
// menu fade animation

// function for DRY
const fadeMenuFn = function (mouse, opacity) {
  if (body.getBoundingClientRect().width <= 840) return;
  return navList.addEventListener(mouse, function (e) {
    if (e.target.classList.contains("nav__link")) {
      navlinks.forEach((item) => {
        if (item !== e.target) {
          item.style.opacity = opacity;
        }
      });
      logo.style.opacity = opacity;
    }
  });
};

// start
fadeMenuFn("mouseover", "50%");
// end
fadeMenuFn("mouseout", "100%");

///////////////////////////////////////
// menu sticky
const headerCallback = function (enteries) {
  enteries.forEach((entery) => {
    if (!entery.isIntersecting) {
      nav.classList.add("sticky");
      navList.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    } else {
      nav.classList.remove("sticky");
      navList.style.backgroundColor = "#f3f3f3";
    }
  });
};
const headerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const headerObserver = new IntersectionObserver(headerCallback, headerOptions);
headerObserver.observe(header);

///////////////////////////////////////
//Nav slider animation
const navSlide = () => {
  const navBurger = document.querySelector(".nav__burger");

  navBurger.addEventListener("click", () => {
    if (getComputedStyle(navList).opacity === "0") {
      navList.style.display = "flex";
      setTimeout(function () {
        navList.style.opacity = "1";
        navList.style.top = "60px";
      }, 1);
    } else {
      navList.style.opacity = "0";
      navList.style.top = "40px";
      setTimeout(function () {
        navList.style.display = "none";
      }, 500);
    }
    // navList.style.animation = "navSlide 0.5s ease";
    navBurger.classList.toggle("toggle");
  });
};
navSlide();

///////////////////////////////////////
// sections reveal

const sectionsCallback = function (enteries, observer) {
  const [entery] = enteries;
  if (entery.isIntersecting) {
    entery.target.classList.remove("section--hidden");
    observer.unobserve(entery.target);
  }
};
const sectionsOptions = {
  root: null,
  threshold: 0.15,
};
const sectionsObserver = new IntersectionObserver(
  sectionsCallback,
  sectionsOptions
);
sections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionsObserver.observe(section);
});

///////////////////////////////////////
// lazy images revael
const lazyImgCallback = function (enteries, observer) {
  const [entery] = enteries;
  if (!entery.isIntersecting) return;
  entery.target.src = entery.target.dataset.src;
  entery.target.addEventListener("load", function () {
    entery.target.classList.remove("lazy-img");
  });

  observer.unobserve(entery.target);
};

const lazyImgOptions = {
  root: null,
  threshold: 0,
  rootMargin: "100px",
};

const lazyImgObserver = new IntersectionObserver(
  lazyImgCallback,
  lazyImgOptions
);
featuresImages.forEach((img) => {
  lazyImgObserver.observe(img);
});

///////////////////////////////////////
// slider quotes

// go to slide function
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
goToSlide(0);

// dots
// create dots
slides.forEach((_, i) => {
  dotsContainer.innerHTML += `<button class="dots__dot" data-slide="${i}"></button>`;
});

// activate dot function
const activeDot = function (slide) {
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    dot.classList.remove("dots__dot--active");
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  });
};
activeDot(0);

// variable for sliders
let sliderVariable = 0;

// slide right
const slideRight = function () {
  if (sliderVariable === slides.length - 1) sliderVariable = 0;
  else sliderVariable++;

  goToSlide(sliderVariable);
  activeDot(sliderVariable);
};
sliderBtnRight.addEventListener("click", slideRight);

// slide left
const slideLeft = function () {
  if (sliderVariable === 0) sliderVariable = slides.length - 1;
  else sliderVariable--;

  goToSlide(sliderVariable);
  activeDot(sliderVariable);
};
sliderBtnLeft.addEventListener("click", slideLeft);

// arrow keys
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") slideLeft();
  e.key === "ArrowRight" && slideRight();
});

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
