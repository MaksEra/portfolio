//$(function() {
//  $('#ham-toggle').on('click', function() {
//    $(this).toggleClass("on");
//    $('.hamburger-menu').toggleClass("on");
//    $('.nav__list').toggleClass('hidden');
//  });
//})

export default function initHamburger() {
  let hamburgerLink = document.querySelector(".header__hamburger-menu");
  if (hamburgerLink) {
    hamburgerLink.addEventListener("click", e => {
      e.preventDefault();
      // добавляем класс или убириаем активный класс у hamburger
      document.querySelector(".hamburger").classList.toggle("hamburger--plus");

      // расставляем активные классы на другие связанные элементы
      document
        .querySelector(".header__pages-list")
        .classList.toggle("header__pages-list--visible");
      document
        .querySelector(".header__hamburger-menu")
        .classList.toggle("header__hamburger-menu--z-indexed");
      document.querySelector("body").classList.toggle("body--overflow-hidden");
    });
  }
}
