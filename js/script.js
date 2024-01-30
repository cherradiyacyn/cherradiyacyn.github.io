const body = document.querySelector("body");
const desktopMQL = window.matchMedia("(min-width: 768px)");
const navVisibilityWrapper = document.querySelector(".nav__visibility_wrapper");
const navHamburger = document.querySelector(".nav__hamburger");
const navHamburgerImg = document.querySelector(".nav__hamburger img");
const navMenuLinks = document.querySelectorAll(".menu__link_wrapper a");
const navCloser = document.querySelector(".nav__closer");
const themeToggle = document.querySelector(".theme_toggle");

// handle Theme
function isDay() {
  let date = new Date();
  let hour = date.getHours();
  return 7 < hour && hour < 19;
}

function getPrefs() {
  return localStorage.getItem("theme");
}

function savePrefs(prefs) {
  localStorage.setItem("theme", prefs);
}

function addClass() {
  body.classList.add("alt_theme");
}

function removeClass() {
  body.classList.remove("alt_theme");
}

function toggleClass() {
  body.classList.toggle("alt_theme");
}

function classExists() {
  return body.classList.contains("alt_theme");
}

let menuIconPath = "/img/menu_dark.svg";
let closeIconPath = "/img/close_dark.svg";
let themeLabel = "Light theme";

function initLightAssets() {
  menuIconPath = "/img/menu_light.svg";
  closeIconPath = "/img/close_light.svg";
  themeLabel = "Dark theme";
}

function initDarkAssets() {
  menuIconPath = "/img/menu_dark.svg";
  closeIconPath = "/img/close_dark.svg";
  themeLabel = "Light theme";
}

function loadAssets() {
  navHamburgerImg.setAttribute("src", menuIconPath);
  themeToggle.textContent = themeLabel;
}

function initTheme() {
  if (isDay() || getPrefs() === "light") {
    addClass();
    initLightAssets();
    loadAssets();
  }

  if (getPrefs() === "dark") {
    removeClass();
    initDarkAssets();
    loadAssets();
  }
}

function handleThemeToggle() {
  toggleClass();
  if (classExists()) {
    initLightAssets();
    loadAssets();
    savePrefs("light");
  } else {
    initDarkAssets();
    loadAssets();
    savePrefs("dark");
  }
}

// handle Media Query
function handleNav() {
  if (navVisibilityWrapper.classList.contains("hide")) {
    navHamburgerImg.setAttribute("src", closeIconPath);
    navVisibilityWrapper.classList.remove("hide");
    body.classList.add("scroll_disable");
  } else {
    navHamburgerImg.setAttribute("src", menuIconPath);
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

// listeners
themeToggle.addEventListener("click", handleThemeToggle);
desktopMQL.addEventListener("change", handleMedia);

// onLoad
initTheme();
handleMedia();
