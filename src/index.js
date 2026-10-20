import { pageLoad } from "./pageload"
import { renderHomePage } from "./home";
import { renderMenuPage } from "./menu";
import { renderContactPage } from "./contact";
import { renderOrderPage } from "./order";
import { renderPaymentPage } from "./payment";

const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");
const burger = document.querySelector(".hamburger");

//Hamburger menu
burger.addEventListener("click", () => {
  document.querySelector("ul").classList.toggle("active");
  burger.classList.toggle("toggle");
});

// Navigation tabs
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("red");
    });
    tab.classList.add("red");
    target.classList.add("active");
  })
);

//Makes sure that order navigation tab is colored after clicking button
document.querySelector(".order-now").addEventListener("click", () => {
  document.querySelector(`[data-tab-target="#order"]`).classList.add("red");
});

//Make sure page doesn't refresh on contact form submit
document.querySelector(`#contact [type="submit"]`).addEventListener("click", () => {
  document.querySelector("#contact form").reset();
});

console.log(`Today is ${new Date().toUTCString()}. Very nice.`);