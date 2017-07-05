function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setPicRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.pic');
		t.height(t.width()*$(this).attr('data-ratio'));
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:960px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	$('.introduction').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: true,
		fade: true,
		cssEase: 'ease',
		speed: 300,
		autoplay: true,
		autoplaySpeed: 10000,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					autoplay: false,
					arrows: false
				}
			}
		]
	});
	$('.card__preview').slick({
		slidesToShow: 3,
		slidesToScroll:1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 300,
		responsive: [
			{
				breakpoint: 1320,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 3
				}
			}
		]
	});
	function hideFilterDrop() {
		$('.filter__item')
	}
	function startApp() {
		setPicRatio();
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {
				if ( $('.about--event').length ) {
					$('.about__rc').detach().insertBefore($('.about__lc'));
				}
				if ( $('.special').length ) {
					$('.special__item').each(function() {
						var t = $(this).find('.link, .icon');
						t.detach().appendTo($(this).find('.pic'));
					});
				}
				if ( $('.article__nav').length ) {
					$('.article__nav').before('<select class="article--select"></select>');
					$('.article__nav li').each(function() {
						if ( !$(this).hasClass('active') ) {
							$('.article--select').append('<option data-href="'+$(this).find('a').attr('href')+'">'+$(this).text()+'</option>');
						} else {
							$('.article--select').append('<option data-href="'+$(this).find('a').attr('href')+'" selected>'+$(this).text()+'</option>');
						}
					});
				}
				if ( $('.contacts__row .shops--list').length ) {
					$('.contacts__row').before('<h3 class="contacts--shop-title">Магазин:</h3><select class="contacts--select"></select>');
					$('.shops--list li').each(function() {
						if ( !$(this).hasClass('active') ) {
							$('.contacts--select').append('<option value="'+$(this).attr('data')+'">'+$(this).find('h3').text()+'</option>');
						} else {
							$('.contacts--select').append('<option value="'+$(this).attr('data')+'" selected>'+$(this).find('h3').text()+'</option>');
						}
					});
					$('.contacts--select').after('<div class="contacts--shop">'+$('.shops--list li[data="'+$('.contacts--select').val()+'"]').html()+'</div>')
					$(document).on('change', '.contacts--select', function() {
						$('.contacts--shop').html($('.shops--list li[data="'+$(this).val()+'"]').html())
					});
				}
				if ( $('.filter').length ) {
					$('.filter__item h3').addClass('is-hidden');
				}
				if ( $('.card').length ) {
					$('.card__title h1').detach().prependTo($('.card__gallery'));
				}
			} else {
				if ( $('.about--event').length ) {
					$('.about__rc').detach().insertAfter($('.about__lc'));
				}
				if ( $('.special').length ) {
					$('.special__item').each(function() {
						var t = $(this).find('.link, .icon');
						t.detach().appendTo($(this).find('.info'));
					});
				}
				if ( $('.article__nav').length ) {
					$('.article--select').remove();
				}
				if ( $('.contacts__row .shops--list').length ) {
					$('.contacts--shop-title, .contacts--select, .contacts--shop').remove();
				}
				if ( $('.filter').length ) {
					$('.filter__item h3').removeClass('is-hidden');
				}
				if ( $('.card').length ) {
					$('.card__gallery h1').detach().prependTo($('.card__title'));
				}
			}
		}
	}
	startApp();
	if ( $('.shops--list').length ) {
		var scrollable = $('.shops--list');
		scrollable.jScrollPane();
		var scrollApi = scrollable.data('jsp');
	}
	$(window).on('resize', _.debounce(function() {
		startApp();
		if ( $('.shops--list').length ) {
			scrollApi.reinitialise();
		}
	}, 100));
	$('input[type="checkbox"]').uniform();
	function openHeaderAddress() {
		$('.header__address').addClass('is-active');
		$('.header--shops').addClass('is-dropped');
	}
	function openHeaderCard() {
		$('.header__card').addClass('is-active');
		$('.header--bonus').addClass('is-dropped');
	}
	function closeHeaderAddress() {
		$('.header__address').removeClass('is-active');
		$('.header--shops').removeClass('is-dropped');
	}
	function closeHeaderCard() {
		$('.header__card').removeClass('is-active');
		$('.header--bonus').removeClass('is-dropped');
	}
	$('.header--shops').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('is-dropped') ) {
			openHeaderAddress();
		} else {
			closeHeaderAddress();
		}
	});
	$('.header--bonus').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('is-dropped') ) {
			openHeaderCard();
		} else {
			closeHeaderCard();
		}	
	});
	$('.header__address .close').on('click', function(e) {
		e.preventDefault();
		closeHeaderAddress();
	});
	$('.header__card .close').on('click', function(e) {
		e.preventDefault();
		closeHeaderCard();
	});
	
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.header__address').length && !$(e.target).closest('.header--shops').length ) {
			closeHeaderAddress();
		}
		if ( !$(e.target).closest('.header__card').length && !$(e.target).closest('.header--bonus').length ) {
			closeHeaderCard();
		}
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		closeMobileMenu();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( !isMobile ) {
			var diff = 40;
		} else {
			var diff = 0;
		}
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	$('.menu-drop--nav .has-sub').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-dropped');
	});
	function openMobileMenu() {
		$('.menu-open, .menu-drop, .fade-bg').addClass('is-opened');
		$('body').addClass('is-locked');
	}
	function closeMobileMenu() {
		$('.menu-open, .menu-drop, .fade-bg').removeClass('is-opened');
		$('body').removeClass('is-locked');
	}
	$('.menu-open').on('click', function(e) {
		if ( !$(this).hasClass('is-opened') ) {
			openMobileMenu();
		} else {
			closeMobileMenu();
		}
	});
	$('.fade-bg').on('click', function(e) {
		closeMobileMenu();
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.filter--checker input[type="checkbox"]').on('change', function() {
		if ( $(this).is(':checked') ) {
			$(this).parents('.filter--checker').addClass('is-selected');
		} else {
			$(this).parents('.filter--checker').removeClass('is-selected');
		}
	});
	$('.filter-more-link').on('click', function() {
		if ( !$(this).hasClass('is-active') ) {
			$(this).addClass('is-active').text('Скрыть').siblings('.more').show();
		} else {
			$(this).removeClass('is-active').text('Показать все').siblings('.more').hide();
		}
	});
	$('.filter__item h3').on('click', function() {
		$(this).toggleClass('is-hidden');
	});
	$('.filter__color li').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('.filter--title h3').on('click', function() {
		$(this).parent().toggleClass('is-active');
	});
});
$(function() {
	$('.filter__item').each(function() {
		var t = $(this);
		var range = t.find('.filter--range');
		var inputFrom = t.find('input.from');
		var inputTo = t.find('input.to');
		var min = 0;
		var max  = 50000;
		var start = 2000;
		var end = 30000;
		range.slider({
			range: true,
			min: min,
			max: max,
			values: [start, end],
			slide: function(event, ui) {
				inputFrom.val(ui.values[0]);
				inputTo.val(ui.values[1]);
			}
		});
		inputFrom.val(start);
		inputTo.val(end);
		inputFrom.change(function() {
			var val = $(this).val();
			if ( val < min ) {
				val = min;
			} else if ( val > range.slider('values',1) ) {
				val = range.slider('values',1);
			}
			range.slider('values',0,val);
			$(this).val(val);
		});
		inputTo.change(function() {
			var val = $(this).val();
			if ( val > max ) {
				val = max;
			} else if ( val < range.slider('values',0) ) {
				val = range.slider('values',0);
			}
			range.slider('values',1,val);
			$(this).val(val);
		});
	});
});