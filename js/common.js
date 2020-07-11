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

// Smooth scroll section
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    document.body.style.removeProperty("overflow-y");
    document.querySelector(this.hash).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Mobile toggle-menu and menu left
if (window.matchMedia("(max-width: 991px)").matches) {
  // Toggle menu
  const toggleMenu = document.querySelector(".toggle-menu");
  const menuLeft = document.querySelector(".menu-left");

  // Menu left
  const toggleVisibleMenuLeft = () => {
    menuLeft.classList.add("menu-left--apperance");

    if (!menuLeft.classList.contains("menu-left--visible")) {
      menuLeft.classList.add("menu-left--visible");
      document.body.style.overflowY = "hidden";
    } else {
      menuLeft.classList.remove('menu-left--visible');
      document.body.style.removeProperty("overflow-y");
    }
  }

  toggleMenu.addEventListener("click", () => {
    toggleMenu.classList.toggle("toggle-menu--active");
    toggleMenu.setAttribute("aria-expanded", true);
    toggleVisibleMenuLeft();
  });

  document.addEventListener("mouseup", function (e) {
    if (e.target !== toggleMenu && e.target == menuLeft) {
      toggleMenu.classList.remove("toggle-menu--active");
      toggleMenu.setAttribute("aria-expanded", false);
      toggleVisibleMenuLeft();
    }
  });

  // Click's menu left link
  document.querySelectorAll(".menu-left__link").forEach(menuLiftLink => {
    menuLiftLink.addEventListener("click", function (e) {
      e.preventDefault();

      toggleMenu.classList.toggle("toggle-menu--active");
      toggleVisibleMenuLeft();
    });
  });
}

// Nav
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
let slider = new KeenSlider("#my-keen-slider", {
  loop: true,
  duration: 1300,
  created: function (instance) {
    document.querySelector(".slider__btn--prev").addEventListener("click", () => {
      instance.prev();
    });

    // Autoplay
    setInterval(() => {
      instance.next();
    }, 7000);

    document.querySelector(".slider__btn--next").addEventListener("click", () => {
      instance.next();
    });

    let dots = document.querySelector(".dots");
    let sliderSlideAll = document.querySelectorAll(".keen-slider__slide");

    sliderSlideAll.forEach(function (t, idx) {
      let dot = document.createElement("button");
      dot.classList.add("dot");
      dots.appendChild(dot);
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

function updateClasses(instance) {
  let slide = instance.details().relativeSlide;
  let dotAll = document.querySelectorAll(".dot");

  dotAll.forEach(function (dot, idx) {
    idx === slide
      ? dot.classList.add("dot--active")
      : dot.classList.remove("dot--active");
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
    const menuLeftLinkAll = document.querySelectorAll(".menu-left__link");

    const addActiveClassMenuLeft = () => {
      let fromTop = window.scrollY + 80;

      menuLeftLinkAll.forEach(menuLeftLink => {
        let section = document.querySelector(menuLeftLink.hash);

        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          menuLeftLink.classList.add("menu-left__link--active");
        } else {
          menuLeftLink.classList.remove("menu-left__link--active");
        }
      });
    }

    addActiveClassMenuLeft();
  }
}

// Service
const servicesLinks = document.querySelectorAll(".services__link");

const service = document.querySelector(".service");
const serviceBtnClose = document.querySelector(".service__btn--close");
const serviceTitle = document.querySelector(".service__title");
const serviceDescrtiption = document.querySelector(".service__description");

servicesLinks.forEach((servicesLink) => {
  servicesLink.addEventListener("click", (e) => {
    e.preventDefault();

    let servicesTitleText = servicesLink.children[0].textContent;
    serviceTitle.textContent = servicesTitleText;

    // let servicesDescriptionText = servicesLink.children[1].textContent;
    // serviceDescrtiption.textContent = servicesDescriptionText;

    servicesLink.classList.add("btn--active");

    setTimeout(() => {
      servicesLink.classList.remove("btn--active");
    }, 200);

    service.classList.add("service--open");
    document.body.style.overflowY = "hidden";
  });
});

// Service btn close
serviceBtnClose.addEventListener("click", () => {
  service.classList.remove("service--open");
  document.body.style.removeProperty("overflow-y");
});

service.addEventListener("mouseup", (e) => {
  if (e.target == service) {
    service.classList.remove("service--open");
    document.body.style.removeProperty("overflow-y");
  }
});

// Service close click "Esc"
service.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    service.classList.remove("service--open");
  }
});

const formTextarea = document.querySelector(".form__textarea");
const serviceLink = document.querySelector(".service__link");

// Scroll on contacts
serviceLink.addEventListener("click", () => {
  let serviceTitleText = serviceTitle.textContent;

  formTextarea.value = `Хочу записаться на курс "${serviceTitleText}"`;

  service.classList.remove("service--open");
  document.body.style.removeProperty("overflow-y");
});

// Mask phone
let phoneMask = IMask(document.querySelector(".form__phone"), {
  mask: "(000) 000-00-00",
  lazy: false
});
