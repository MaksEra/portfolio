$(function() {
	$('#auth').on('click', e => {
	  e.preventDefault();

	  $('#flipper').toggleClass('flipped');
    e.currentTarget.classList.toggle("auth-button--hidden");
  })
  $('#auth-on-main').on('click', e => {
    e.preventDefault();

    $('#flipper').removeClass('flipped');
    $('#auth').removeClass("auth-button--hidden");
  })
})