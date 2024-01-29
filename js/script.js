const themeToggle = document.querySelector(".theme_toggle");
const body = document.querySelector("body");
const navHamburger = document.querySelector(".nav__hamburger");
const navHamburgerImg = document.querySelector(".nav__hamburger img");
const navVisibilityWrapper = document.querySelector(".nav__visibility_wrapper");
const navCloser = document.querySelector(".nav__closer");
const navMenuLinks = document.querySelectorAll(".menu__link_wrapper a");
const desktopMQL = window.matchMedia("(min-width: 768px)");

const theme = localStorage.getItem("theme");
function rememberTheme() {
  localStorage.setItem("theme", "light_color_scheme");
}
function forgetTheme() {
  localStorage.removeItem("theme");
}

let srcPathMenu = "";
let srcPathClose = "";
let themeToggleText = "";
function loadLightResources() {
  srcPathMenu = "/img/menu_light.svg";
  srcPathClose = "/img/close_light.svg";
  themeToggleText = "Dark theme";
}
function loadDarkResources() {
  srcPathMenu = "/img/menu_dark.svg";
  srcPathClose = "/img/close_dark.svg";
  themeToggleText = "Light theme";
}
function renderResources() {
  navHamburgerImg.setAttribute("src", srcPathMenu);
  themeToggle.textContent = themeToggleText;
}

function addLightColorScheme() {
  body.classList.add("light_color_scheme");
}

function isDay() {
  let date = new Date();
  let hour = date.getHours();
  return 6 < hour && hour < 18;
}

function init() {
  rememberTheme();
  if (theme) {
    addLightColorScheme();
    loadLightResources();
  } else {
    loadDarkResources();
  }
  renderResources();
  handleMedia();
}

function handleThemeToggle() {
  body.classList.toggle("light_color_scheme");
  if (body.classList.contains("light_color_scheme")) {
    rememberTheme();
    loadLightResources();
    renderResources();
  } else {
    forgetTheme();
    loadDarkResources();
    renderResources();
  }
}

function handleNav() {
  if (navVisibilityWrapper.classList.contains("hide")) {
    navHamburgerImg.setAttribute("src", srcPathClose);
    navVisibilityWrapper.classList.remove("hide");
    body.classList.add("scroll_disable");
  } else {
    navHamburgerImg.setAttribute("src", srcPathMenu);
    navVisibilityWrapper.classList.add("hide");
    body.classList.remove("scroll_disable");
  }
}

function handleMedia() {
  if (desktopMQL.matches) {
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

themeToggle.addEventListener("click", handleThemeToggle);
desktopMQL.addEventListener("change", handleMedia);

init();
