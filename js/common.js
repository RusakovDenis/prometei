// Header bottom fixed
const header = document.querySelector(".header");
const headerHeight = header.scrollHeight;

const headerSmall = () => {
  if (window.pageYOffset >= headerHeight) {
    header.classList.add("header--small");
  } else {
    header.classList.remove("header--small");
  }
}

// Toggle menu
if (window.matchMedia("(max-width: 991px)").matches) {
  const menuLeft = document.querySelector(".menu-left");

  const toggleClassMenu = () => {
    menuLeft.classList.add("menu-left--animate");

    if (!menuLeft.classList.contains("menu-left--visible")) {
      menuLeft.classList.add("menu-left--visible");
    } else {
      menuLeft.classList.remove('menu-left--visible');
    }
  }

  const toggleMenu = document.querySelector(".toggle-menu");

  toggleMenu.addEventListener("click", () => {
    toggleMenu.classList.toggle("toggle-menu--active");
    toggleClassMenu();
    toggleMenu.setAttribute('aria-expanded', true);
  });

  document.addEventListener("mouseup", (e) => {
    if (e.target !== toggleMenu && e.target == menuLeft) {
      toggleMenu.classList.remove("toggle-menu--active");
      toggleClassMenu();
      toggleMenu.setAttribute('aria-expanded', false);
    }
  });
}

// Carousel
const glide = new Glide(".glide", {
  perView: 1,
  gap: 0,
  focusAt: "center",
  autoplay: 4000
}).mount();

// Nav link
const links = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section');

function changeLinkState() {
  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) { }

  links.forEach((link) => link.classList.remove('nav__link--active'));
  links[index].classList.add('nav__link--active');
}

changeLinkState();
window.addEventListener('scroll', changeLinkState);

// Active link
const activeLink = () => {
  let windowScrollY = window.scrollY;

  let navLinkAll = document.querySelectorAll(".nav__link");

  let section = document.querySelector(".section");
  let sectionId = section.id;

  if (section.scrollHeight <= windowScrollY) {
    for (let i = 0; i < navLinkAll.length; i++) {
      if (navLinkAll[i].hash == `#${sectionId}`) {
        navLinkAll[i].classList.add("nav__link--active");
      }
    }
  }
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
  activeLink();
}


const form = document.querySelector("form");
const name = document.querySelector('input[type="text"]');
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
    : showError(input, `Email isn't valid`);
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

function checkPasswordsMatch(input, input2) {
  if (input.value !== input2.value) showError(input2, `Passwords don't match`);
}

function getFieldName(input) {
  return input.previousElementSibling.textContent;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([email, password2]);
  checkLength(name, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

// Service

const service = document.querySelector(".service");
const serviceBtnClose = document.querySelector(".service__btn--close");

const serviceOpenAll = document.querySelectorAll(".services__link");

serviceOpenAll.forEach((serviceOpen) => {
  serviceOpen.addEventListener("click", (e) => {
    e.preventDefault();

    serviceOpen.classList.add("btn--active");

    setTimeout(() => {
      serviceOpen.classList.remove("btn--active");
    }, 200);

    service.classList.add("service--open");
    document.body.classList.add("scroll--hidden");
  });
});

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

service.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    service.classList.remove("service--open");
  }
});


// document.addEventListener('DOMContentLoaded', function () {
//   const ele = document.getElementById('input');
//   const state = {
//     value: ele.value,
//   };

//   ele.addEventListener('keydown', function (e) {
//     const target = e.target;
//     state.selectionStart = target.selectionStart;
//     state.selectionEnd = target.selectionEnd;
//   });

//   ele.addEventListener('input', function (e) {
//     const target = e.target;

//     if (/^[0-9\s]*$/.test(target.value)) {
//       state.value = target.value;
//     } else {
//       alert("Вводите цифры)");
//       // Users enter the not supported characters
//       // Restore the value and selection
//       target.value = state.value;
//       target.setSelectionRange(state.selectionStart, state.selectionEnd);
//     }
//   });
// });

// Mask phone
let phoneMask = IMask(document.querySelector(".form__phone"), {
  mask: "(000) 000-00-00",
  lazy: false
});