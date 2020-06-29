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
  const toggleMenu = document.querySelector(".toggle-menu");

  toggleMenu.addEventListener("click", () => {
    toggleMenu.classList.toggle("toggle-menu--active");
  });

  document.addEventListener("mouseup", (e) => {
    if (e.target !== toggleMenu) {
      toggleMenu.classList.remove("toggle-menu--active");
    }
  });
}

// Reviews
const glide = new Glide(".glide", {
  perView: 1,
  gap: 0,
  focusAt: "center",
  autoplay: 3000
}).mount();

// Link scroll
document.querySelectorAll("a").forEach(link => {
  link.classList.remove("nav__link--active");

  link.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(link);
    let sectionActive = document.querySelector(this.hash);

    link.classList.add("nav__link--active");

    sectionActive.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Mask phone
let phoneMask = IMask(document.querySelector(".form__phone"), {
  mask: "(000) 000-00-00",
  lazy: false
});

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

}

// Left menu
function toggleClassMenu() {
  myMenu.classList.add("menu--animatable");

  if (!myMenu.classList.contains("menu--visible")) {
    myMenu.classList.add("menu--visible");
  } else {
    myMenu.classList.remove('menu--visible');
  }
}

function OnTransitionEnd() {
  myMenu.classList.remove("menu--animatable");
}

var myMenu = document.querySelector(".menu-left");
var oppMenu = document.querySelector(".toggle-menu");
myMenu.addEventListener("transitionend", OnTransitionEnd, false);
oppMenu.addEventListener("click", toggleClassMenu, false);
myMenu.addEventListener("click", toggleClassMenu, false);

const form = document.querySelector("form");
const name = document.querySelector('input[type="text"]');
const email = document.querySelector('input[type="email"]');
const password = document.querySelector(".password");
const password2 = document.querySelector(".password2");

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


// glide.on('move', function (e) {
//   let sliderItem = document.querySelector(".slider__item");

//   let q = `${0.001 * e.movement}`;
//   sliderItem.style.transform = "scale(" + q + ")";
// });


// glide.on('move.after', function () {
//   let sliderItem = document.querySelector(".slider__item");
//   console.log();
//   sliderItem.style.transform = "scale(1)";
// });

const service = document.querySelector(".service");
const serviceBtnClose = document.querySelector(".service__btn--close");

const btnServiceOpenAll = document.querySelectorAll(".services__link");

btnServiceOpenAll.forEach((btnServiceOpen) => {
  btnServiceOpen.addEventListener("click", (e) => {
    e.preventDefault();
    btnServiceOpen.classList.add("btn--active");

    setTimeout(() => {
      btnServiceOpen.classList.remove("btn--active");
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
