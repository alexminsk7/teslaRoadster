$(function () {
	$('.slider').slick({
		arrows: false,
		fade: true,
		autoplay: 4500,
		dots: true,
	});

	$('.header__burger').on('click', function () {
		$('.menu').addClass('active');
	});

	$('.menu__close').on('click', function () {
		$('.menu').removeClass('active');
	});
});
