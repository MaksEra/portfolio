$(function() {
  $('#ham-toggle').on('click', function() {
    $(this).toggleClass("on");
    $('.hamburger-menu').toggleClass("on");
    $('.nav__list').toggleClass('hidden');
  });
})