// Header bottom fixed
const headerBottom = document.querySelector(".header__bottom");
const logoWrap = document.querySelector(".logo-wrap").scrollHeight + 10;

const headerBottomFixed = () => {
  if (window.pageYOffset >= logoWrap) {
    headerBottom.classList.add("header__bottom--fixed");
  } else {
    headerBottom.classList.remove("header__bottom--fixed");
  }
}

// Toggle menu
if (window.matchMedia("(max-width: 991px)").matches) {
  const toggleMenu = document.querySelector(".toggle-menu");

  toggleMenu.addEventListener("click", () => {
    toggleMenu.classList.toggle("toggle-menu--active");

    if (dropdownMenu.classList.contains("toggle-menu--show")) {
      dropdownMenu.classList.remove("toggle-menu--show");
    } else {
      dropdownMenu.classList.add("toggle-menu--show");
    }
  });

  document.addEventListener("mouseup", (e) => {
    if (e.target !== toggleMenu) {
      toggleMenu.classList.remove("toggle-menu--active");
    }
  });
}

// Mask phone
let phoneMask = IMask(document.querySelector(".form__phone"), {
  mask: "+7 (000) 000-00-00",
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
  headerBottomFixed();
  btnTopShow();
}


// Left menu
// const menuBtn = document.querySelector(".menu__btn");
// const menu = document.querySelector(".menu");

// menuBtn.addEventListener("click", () => {
// 	menu.classList.toggle("menu--active");
// });

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

var myMenu = document.querySelector(".menu-right");
var oppMenu = document.querySelector(".toggle-menu");
myMenu.addEventListener("transitionend", OnTransitionEnd, false);
oppMenu.addEventListener("click", toggleClassMenu, false);
myMenu.addEventListener("click", toggleClassMenu, false);