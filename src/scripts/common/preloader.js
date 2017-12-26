$(function() {
	const preloader = (function () {
	let percentTotal = 0,
			preloader = $('#preloader');

	let imgPath = $('*').map((index, element) => {
			let bg = $(element).css('background-image');// url('/images/1.png')
			let img = $(element).is('img'); //true или false
			let path;

			if (bg !== 'none') {
					path = bg
									.replace('url("', '')// '/images/1.png')
									.replace('")', '');// '/images/1.png'
			}

			if (img) {
					path = $(element).attr('src');
			}
			return path;
	});

	const setPercent = (total, current) => {
			let percents = Math.ceil(current / total * 100);

			$('#preloader__percent').text(percents + '%');

			if (percents >= 100) {
					preloader.fadeOut();
			}
	}

	let loadImages = (images) => {
			if (!images.length) {
					preloader.fadeOut();
			}
			else {
					images.forEach((img) => {
							let fakeImg = $('<img>', {
									attr: {
											src: img
									}
							});

							fakeImg.on('load error', () => {
									percentTotal++;
									setPercent(images.length, percentTotal);
							});
					});
			}
	}

	return {
			init() {
					let imgs = imgPath.toArray();

					loadImages(imgs);
			}
	}
})();

$(function() {
	preloader.init();
});
})