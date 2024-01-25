const body = document.querySelector("body");
const navHamburger = document.querySelector(".nav__hamburger");
const navHamburgerImg = document.querySelector(".nav__hamburger img");
const navVisibilityWrapper = document.querySelector(".nav__visibility_wrapper");
const navCloser = document.querySelector(".nav__closer");
const navMenuLinks = document.querySelectorAll(".menu__link_wrapper a");

const mql = window.matchMedia("(min-width: 768px)");

function handleNav() {
  if (navVisibilityWrapper.classList.contains("hide")) {
    navHamburgerImg.setAttribute("src", "/img/close.svg");
    navVisibilityWrapper.classList.remove("hide");
    body.classList.add("scroll_disable");
  } else {
    navHamburgerImg.setAttribute("src", "/img/menu.svg");
    navVisibilityWrapper.classList.add("hide");
    body.classList.remove("scroll_disable");
  }
}

function handleMedia() {
  if (mql.matches) {
    navHamburger.removeEventListener("click", handleNav);
    navMenuLinks.forEach((menuLink) => {
      menuLink.removeEventListener("click", handleNav);
    });
    navCloser.removeEventListener("click", handleNav);
    console.log("eventListeners removed.");
    navVisibilityWrapper.classList.remove("hide");
  } else {
    navHamburger.addEventListener("click", handleNav);
    navMenuLinks.forEach((menuLink) => {
      menuLink.addEventListener("click", handleNav);
    });
    navCloser.addEventListener("click", handleNav);
    console.log("eventListeners added.");
    handleNav();
  }
}

mql.addEventListener("change", handleMedia);

handleMedia();
