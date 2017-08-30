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
				breakpoint: 961,
				settings: {
					autoplay: false,
					arrows: false
				}
			}
		]
	});
	$('.card__main, .nav-drop__slider').slick({
		slidesToShow: 1,
		slidesToScroll:1,
		arrows: false,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 300,
		draggable: false
	});
	$('.card__preview').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 300,
		draggable: false,
		responsive: [
			{
				breakpoint: 1231,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 961,
				settings: {
					slidesToShow: 3,
					draggable: true
				}
			}
		]
	});
	$('.card__main').slick('slickGoTo',$('.card__preview .item.active').attr('data')-1);
	$('.card__preview .item').on('click', function() {
		$(this).addClass('active').siblings('.item').removeClass('active');
		$('.card__main').slick('slickGoTo',$(this).attr('data')-1);
	});
	$('.nav-drop').each(function() {
		var t = $(this);
		t.find('.nav-drop__slider').slick('slickGoTo',t.find('.nav-drop__list .active a').attr('data')-1);
		t.find('.nav-drop__list a').on('mouseenter', function() {
			$(this).parent().addClass('active').siblings('li').removeClass('active');
			t.find('.nav-drop__slider').slick('slickGoTo',$(this).attr('data')-1);
		});
	});
	function switchText() {
		$('[data-switch-text]').each(function() {
			if ( !isMobile ) {
				$(this).text($(this).attr('data-switch-desktop'));
			} else {
				$(this).text($(this).attr('data-switch-mobile'));
			}
		});
	}
	function dataGrid() {
		$('[data-grid]').each(function() {
			var t = $(this);
			var size = t.children('li').size();
			var inline;
			if ( $(this).attr('data-grid') == '3' ) {
				if ( Modernizr.mq('(min-width:1230px)') ) {
					inline = 3;
				} else if ( Modernizr.mq('(max-width:1230px)') && ( Modernizr.mq('(min-width:641px)') ) ) {
					inline = 2;
				} else if ( Modernizr.mq('(max-width:640px)') ) {
					inline = 0
				}
			}
			if ( $(this).attr('data-grid') == '4' ) {
				if ( Modernizr.mq('(min-width:1231px)') ) {
					inline = 4;
				}
				if ( Modernizr.mq('(max-width:1230px)') && Modernizr.mq('(min-width:961px)') ) {
					inline = 3;
				} else if ( Modernizr.mq('(max-width:960px)') && ( Modernizr.mq('(min-width:641px)') ) ) {
					inline = 2;
				} else if ( ( Modernizr.mq('(max-width:640px)') ) ) {
					inline = 0
				}
			}
			var lines = Math.ceil(size/inline);
			t.children('li').css({
				'height': 'auto',
				'min-height': '0'
			}).find('.item-card').css({
				'height': 'auto',
				'min-height': '0'
			});
			if ( inline !== 0 ) {
				for ( var i=0; i<lines; i++ ) {
					var max = 0;
					for ( var j=1; j<=inline; j++ ) {
						var n = i*inline+j;
						var h = t.children('li:nth-child('+n+')').find('.item-card').outerHeight();
						max = h > max ? h : max;
					}
					for ( var j=1; j<=inline; j++ ) {
						var n = i*inline+j;
						t.children('li:nth-child('+n+')').css({
							'min-height': max
						}).find('.item-card').css({
							'height': max
						});
					}
				}
			}
		});
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
					$('.contacts--select').after('<div class="contacts--shop">'+$('.shops--list li[data="'+$('.contacts--select').val()+'"]').html()+'</div>');
					$(document).on('change', '.contacts--select', function() {
						$('.contacts--shop').html($('.shops--list li[data="'+$(this).val()+'"]').html())
					});
					$(document).on('click', '.contacts--shop .route a', function(e) {
						e.preventDefault();
						$(this).parents('.main').toggleClass('is-dropped');
					});
				}
				if ( $('.filter').length ) {
					$('.filter__item h3').addClass('is-hidden');
				}
				if ( $('.card').length ) {
					$('.card__title h1').detach().prependTo($('.card__lc'));
				}
				if ( $('.card__complect').length ) {
					$('.card__complect').detach().insertAfter($('.card__features'));
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
				if ( $('.card__complect').length ) {
					$('.card__complect').detach().insertAfter($('.card__gallery'));
				}
				closeMobileMenu();
			}
			removeTipMessage();
			switchText();
		}
		dataGrid();
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
	$('.shops--list .route a').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.main').toggleClass('is-dropped');
		scrollApi.reinitialise();
	});
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
	var showSubnavDelay;
	$('.nav__line > li').on('mouseenter', function() {
		var t = $(this);
		var l = t.children('a');
		if ( t.find('.nav-drop').length && !isMobile ) {
			showSubnavDelay = setTimeout(function() {
				closeHeaderAddress();
				closeHeaderCard();
				t.find('.nav-drop--arrow').css({
					left: t.offset().left+t.outerWidth()/2
				});
				t.addClass('is-dropped');
			}, 200);
		}
	});
	$('.nav__line > li').on('mouseleave', function() {
		if ( !isMobile ) {
			clearTimeout(showSubnavDelay);
			$(this).removeClass('is-dropped');
		}
	});
	function removeTipMessage() {
		$('.tip-message').remove();
	}
	$('.tip-link').on('click', function() {
		if ( !$('.tip-message[data="'+$(this).attr('data-id')+'"]').length ) {
			removeTipMessage();
			$('body').append('<div class="tip-message" data="'+$(this).attr('data-id')+'"></div>');
			var t = $('.tip-message');
			t.html($(this).attr('data-text'));
			if ( !isMobile ) {
				var m = 30;
			} else {
				var m = 10;
			}
			var l = $(this).offset().left+$(this).outerWidth()/2-t.outerWidth()/2;
			if ( l > $(window).width()-t.outerWidth()-m ) {
				l = $(window).width()-t.outerWidth()-m
			}
			t.css({
				'left': l,
				'top': $(this).offset().top-t.outerHeight()
			});
			t.append('<span class="arrow"></span>');
			t.find('.arrow').css({
				'left': $(this).offset().left-l+$(this).outerWidth()/2
			});
		} else {
			removeTipMessage();
		}
	});
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.header__address').length && !$(e.target).closest('.header--shops').length ) {
			closeHeaderAddress();
		}
		if ( !$(e.target).closest('.header__card').length && !$(e.target).closest('.header--bonus').length ) {
			closeHeaderCard();
		}
		if ( !$(e.target).closest('.tip-message').length && !$(e.target).closest('.tip-link').length ) {
			removeTipMessage();
		}
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		closeMobileMenu();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
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
	$('.filter-more-link[data-expand]').on('click', function() {
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
	$('.card__size--list .item').on('click', function() {
		if ( !$(this).hasClass('active') ) {
			$(this).addClass('active').siblings().removeClass('active');
		}
	});
	$('.card--gift span').on('click', function() {
		$(this).toggleClass('active');
	});
	$('.card__features h4').on('click', function() {
		$(this).toggleClass('is-dropped');
	});
	$('.zoom-img').on('mouseover', function() {
		if ( !isMobile ) {
			$('.zoomContainer').remove();
			$(this).elevateZoom({
				zoomWindowWidth: $(this).width(),
				zoomWindowHeight: $(this).height()
			});
		}
	});
});
$(function() {
	$('.filter__item').each(function() {
		var t = $(this);
		var range = t.find('.filter--range');
		var inputFrom = t.find('input.from');
		var inputTo = t.find('input.to');
		var min = parseInt(range.attr('data-min'));
		var max  = parseInt(range.attr('data-max'));
		var start = min;
		var end = max;
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
	$('.fancybox').fancybox({
		padding: 0,
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
});