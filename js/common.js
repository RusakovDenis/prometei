// Header bottom fixed
const header = document.querySelector(".header");
const headerHeight = header.scrollHeight;

const headerSmall = () => {
  if (window.pageYOffset >= headerHeight) {
    header.classList.add("header--fixed");
  } else {
    header.classList.remove("header--fixed");
  }
}

// Smooth scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.hash).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Toggle menu
if (window.matchMedia("(max-width: 991px)").matches) {
  const toggleMenu = document.querySelector(".toggle-menu");
  const menuLeft = document.querySelector(".menu-left");

  toggleMenu.addEventListener("click", () => {
    toggleMenu.classList.toggle("toggle-menu--active");
    toggleMenu.setAttribute("aria-expanded", true);
    toggleVisibleMenu();
  });

  document.addEventListener("mouseup", (e) => {
    if (e.target !== toggleMenu && e.target == menuLeft) {
      toggleMenu.classList.remove("toggle-menu--active");
      toggleMenu.setAttribute("aria-expanded", false);
      toggleVisibleMenu();
    }
  });

  // Menu left
  const toggleVisibleMenu = () => {
    menuLeft.classList.add("menu-left--apperance");

    if (!menuLeft.classList.contains("menu-left--visible")) {
      menuLeft.classList.add("menu-left--visible");
      document.body.style.overflowY = "hidden";
    } else {
      menuLeft.classList.remove('menu-left--visible');
      document.body.style.removeProperty("overflow-y");
    }
  }

  // Click's meni left link
  document.querySelectorAll(".menu-left__link").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      toggleMenu.classList.toggle("toggle-menu--active");
      toggleVisibleMenu();
    });
  });
}

let navLinks = document.querySelectorAll(".nav__link");

const addActiveClass = () => {
  let fromTop = window.scrollY + 80;

  navLinks.forEach(navLink => {
    let section = document.querySelector(navLink.hash);

    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      navLink.classList.add("nav__link--active");
    } else {
      navLink.classList.remove("nav__link--active");
    }
  });
}

// Slider
let elements = document.querySelectorAll(".zoom-out__slide");
let slider = new KeenSlider("#my-keen-slider", {
  loop: true,
  slides: elements.length,
  duration: 1500,
  initial: 0,
  move: s => {
    elements.forEach((element, idx) => {
      moveElement(element, idx, s.details());
    });
  },
  created: function (instance) {
    document.querySelector(".slider__btn--prev").addEventListener("click", function () {
      instance.prev();
    });

    document.querySelector(".slider__btn--next").addEventListener("click", function () {
      instance.next();
    });

    let dotsWrap = document.getElementById("dots");
    let slides = document.querySelectorAll(".keen-slider__slide");

    slides.forEach(function (t, idx) {
      let dot = document.createElement("button");
      dot.classList.add("dot");
      dotsWrap.appendChild(dot);

      dot.addEventListener("click", function () {
        instance.moveToSlide(idx);
      });
    });
    updateClasses(instance);
  },
  slideChanged(instance) {
    updateClasses(instance);
  }
});

// Slider animation zoom out
function moveElement(element, idx, details) {
  let position = details.positions[idx];
  let x = details.widthOrHeight * position.distance;
  let scale_size = 0.7;
  let scale = 1 - (scale_size - scale_size * position.portion);
  let style = `translate3d(${x}px, 0px, 0px) scale(${scale})`;

  element.style.transform = style;
  element.style["-webkit-transform"] = style;
}

// Slider update classes
function updateClasses(instance) {
  let slide = instance.details().relativeSlide;
  let btnPrev = document.querySelector(".slider__btn--prev");
  let btnNext = document.querySelector(".slider__btn--next");

  slide === 0 ? btnPrev.classList.add("arrow--disabled") : btnPrev.classList.remove("arrow--disabled");
  slide === instance.details().size - 1 ? btnNext.classList.add("arrow--disabled") : btnNext.classList.remove("arrow--disabled");

  let dots = document.querySelectorAll(".dot");

  dots.forEach(function (dot, idx) {
    idx === slide ? dot.classList.add("dot--active") : dot.classList.remove("dot--active");
  });
}

// Btn top
const btnTop = document.querySelector(".btn-top");
let interval = 0;

const scrollStep = () => {
  if (window.pageYOffset === 0) {
    clearInterval(interval);
  }

  window.scroll(0, window.pageYOffset - 50);
}

btnTop.addEventListener("click", () => {
  interval = setInterval(scrollStep, 15);

  scrollStep();
});

const btnTopShow = () => {
  if (window.pageYOffset > 100) {
    btnTop.classList.remove("btn--hide");
  } else {
    btnTop.classList.add("btn--hide");
  }
}

// Scroll
window.onscroll = () => {
  headerSmall();
  btnTopShow();
  addActiveClass();
  if (window.matchMedia("(max-width: 991px)").matches) {
    // Active link menu
    let navLinksMenuLeft = document.querySelectorAll(".menu-left__link");

    const addActiveClassMenuLeft = () => {
      let fromTop = window.scrollY + 80;

      navLinksMenuLeft.forEach(link => {
        let section = document.querySelector(link.hash);

        if (
          section.offsetTop <= fromTop &&
          section.offsetTop + section.offsetHeight > fromTop
        ) {
          link.classList.add("menu-left__link--active");
        } else {
          link.classList.remove("menu-left__link--active");
        }
      });
    }

    addActiveClassMenuLeft();
  }
}

// Service
const service = document.querySelector(".service");
const servicesLinks = document.querySelectorAll(".services__link");
const serviceBtnClose = document.querySelector(".service__btn--close");
const serviceLinks = document.querySelectorAll(".service__link");

servicesLinks.forEach((servicesLink) => {
  servicesLink.addEventListener("click", (e) => {
    e.preventDefault();

    servicesLink.classList.add("btn--active");

    setTimeout(() => {
      servicesLink.classList.remove("btn--active");
    }, 200);

    service.classList.add("service--open");
    document.body.classList.add("scroll--hidden");
  });
});

// Service btn close
serviceBtnClose.addEventListener("click", () => {
  service.classList.remove("service--open");
  document.body.classList.remove("scroll--hidden");
});

service.addEventListener("mouseup", (e) => {
  if (e.target == service) {
    service.classList.remove("service--open");
    document.body.classList.remove("scroll--hidden");
  }
});

// Service close click "Esc"
service.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    service.classList.remove("service--open");
  }
});

// Scroll on contacts
serviceLinks.forEach((serviceLink) => {
  serviceLink.addEventListener("click", () => {

    service.classList.remove("service--open");
  });
});

// Mask phone
let phoneMask = IMask(document.querySelector(".form__phone"), {
  mask: "(000) 000-00-00",
  lazy: false
});














//////////////////////////

// Message only numbers
// document.addEventListener("DOMContentLoaded", function () {
//   const ele = document.getElementById("phone");
//   const state = {
//     value: ele.value,
//   };

//   ele.addEventListener("keydown", function (e) {
//     const target = e.target;

//     state.selectionStart = target.selectionStart;
//     state.selectionEnd = target.selectionEnd;
//   });

//   ele.addEventListener("input", function (e) {
//     const target = e.target;
//     if (/^[0-9\s]*$/.test(target.value)) {
//       // state.value = target.value;
//     } else {
//       // target.value = state.value;
//       // target.setSelectionRange(state.selectionStart, state.selectionEnd);
//     }
//   });
// });

// Form
const form = document.querySelector("form");
const email = document.querySelector('input[type="email"]');

function showError(input, msg) {
  const parent = input.parentElement;
  parent.className = "error";
  const error = parent.querySelector(".error-msg");
  error.textContent = msg;
  error.style.display = "block";

  const timer = setTimeout(() => {
    error.style.display = "none";
    parent.className = "";
    clearTimeout(timer);
  }, 4000);
}

function showSuccess(input) {
  const parent = input.parentElement;
  parent.className = "success";
}

function checkEmail(input) {
  const regex = /^\S+@\S+\.\S+$/;

  regex.test(input.value.trim())
    ? showSuccess(input)
    : showError(input, `Email заполнен неверно`);
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    input.value.trim() === ""
      ? showError(input, `${getFieldName(input)} is required`)
      : showSuccess(input);
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([email]);
  checkEmail(email);
});





// document.addEventListener('touchstart', onTouchStart, { passive: true }); 
