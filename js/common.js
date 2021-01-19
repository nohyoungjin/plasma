$(function() {

	// init

	$.fn.device()
	$.fn.gnbSize()

	smoothScroll()

	navi()
	sticky()
	smallNav()

	// global()
	mainVisualSlider()
	floating()

	scrollFlag()

	familySite()
	magnificPopup()

	titleMotion()
	navTab()
	mouseWheel()

	// on load

	$(window).on('load', function() {

		$('body').addClass('load')

	});

	// on resize

	$(window).resize(function() {

		$.fn.device()
		$.fn.gnbSize()

	});

	// smooth scroll

	function smoothScroll() {

		if (is_mobile() || is_mac_os() || is_browser_firefox()) { return }

		var $window = $(window)

		if (smoothScrollPassive()) {
			window.addEventListener('wheel', smoothScrollScrolling, { passive: false })
		} else {
			$window.on('mousewheel DOMMouseScroll', smoothScrollScrolling)
		}

	}

	function smoothScrollPassive() {

		var supportsPassive = false

		try {
			document.addEventListener('nyj', null, { get passive() { supportsPassive = true } })
		} catch(e) {}

		return supportsPassive

	}

	function smoothScrollScrolling(event) {

		event.preventDefault ? event.preventDefault() : event.returnValue = false

		var $window = $(window)
		var scrollTime = 1
		var scrollDistance = $window.height() / 1.8
		var delta = 0

		if (smoothScrollPassive()) {
			delta = event.wheelDelta / 120 || -event.originalEvent.detail / 3
		} else {
			if (typeof event.originalEvent.deltaY != 'undefined') {
				delta = -event.originalEvent.deltaY / 120
			} else {
				delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3
			}
		}

		var scrollTop = $window.scrollTop()
		var finalScroll = scrollTop - parseInt(delta * scrollDistance)

		TweenMax.to($window, scrollTime, {
			scrollTo : { y: finalScroll, autoKill: true },
			ease: Power3.easeOut,
			overwrite: 5
		})

	}

	// gnb pc

	function navi() {

		var $body = $('body')
		var $h_group = $('.h_group')
		var $gnb = $('#gnb')
			
		$gnb.on('mouseenter', '> .box > ul > li', function() {

			if ($body.data('device') != 'mobile') {
				$(this).addClass('on');
				$(this).parents('.h_group').addClass('menu_hover');
				$(this).parents('.h_group').stop().animate({ 'height': '320px' }, 300);
				$(this).parents('.h_group').css('background','#fff');
				$('#gnb > .box > ul > li > a').css('color','#444');
				$('#gnb .sub_menu').show();
			}

		});

		$gnb.on('mouseleave', '> .box > ul > li', function() {

			if ($body.data('device') != 'mobile') {
				$('#gnb > .box > ul > li').removeClass('on');
			}

		});

		$h_group.on('mouseleave', function() {

			if ($body.data('device') != 'mobile') {
				$('#gnb > .box > ul > li').removeClass('on');
				$('#gnb > .box > ul > li').parents('.h_group').stop().animate({ 'height': '91px' }, 300, function() {
					$(this).removeClass('menu_hover');
					$('#gnb > .box > ul > li').siblings().children('.sub_menu').hide();

					if ($h_group.hasClass('affix')) {
						$(this).css('background','#fff');
						$('#gnb > .box > ul > li > a').css('color','#444');
					} else {
						$(this).css('background','transparent');
						$('#gnb > .box > ul > li > a').css('color','#fff');
					}

				});
			}

		});

		// gnb keyboard accessibility

		$gnb.on('focusin', '> .box > ul > li', function() {

			if ($body.data('device') != 'mobile') {
				$(this).parents('.h_group').addClass('menu_hover');
				$(this).parents('.h_group').stop().animate({ 'height': '320px' }, 300);
				$(this).parents('.h_group').css('background','#fff');
				$('#gnb > .box > ul > li > a').css('color','#444');
				$('#gnb .sub_menu').show();
			}

		});

		$(document).on('focus', '.h_group h1 a, .slick-prev', function() {

			if ($body.data('device') != 'mobile') {
				$('#gnb > .box > ul > li').parents('.h_group').stop().animate({ 'height': '91px' }, 300, function() {
					$('#gnb > .box > ul > li').siblings().children('.sub_menu').hide();
				});
			}

		});

	}

	// sticky

	function sticky() {

		var fixed_offset = $('#header').offset()
		var $h_group = $('.h_group')

		// alert(fixed_offset.top);

		$(window).on('scroll', $.throttle(1000 / 15, function() {

			if ($(document).scrollTop() > fixed_offset.top) {
				$h_group.addClass('affix');
				$h_group.css('background','#fff');
				$('#gnb > .box > ul > li > a').css('color','#444');
			} else {
				$h_group.removeClass('affix');

				if (!$h_group.is('affix, menu_hover')) {
					$h_group.css('background','transparent');
					$('#gnb > .box > ul > li > a').css('color','#fff');
				} 
			}

		}));

	}

	// gnb mobile

	function smallNav() {

		$('.btn_menu').on('click', function() {

			var overflowChk = $('body').css('overflow')
			var deviceHeight = $(window).height()

			if (overflowChk == 'hidden') {
				$('body').css({
					'overflow' : 'visible',
					'height'   : 'auto'
				});
			} else {
				$('body').css({
					'overflow' : 'hidden',
					'height'   : deviceHeight
				});
			}

			$('#gnb > .box').css('display','block');
			$(this).next().stop().animate({ 'right': '0%' }, 300);
			$('#gnb > .dim').fadeIn();

		});

		$('#gnb > .box').on('click', '> ul > li > a', function(e) {

			if ($('body').data('device') == 'mobile') {
			
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
				
				if ($(this).parent().hasClass('current')) {
					$(this).parent().removeClass('current');
					return;
				}

				$('#gnb > .box > ul > li').removeClass('current');
				$(this).parent().toggleClass('current');
			
			}

		});

		$('#gnb').on('click', '> .dim, > .box > .btn_close', function() {

			$('body').css('overflow','visible');
			$('#gnb > .dim').hide();

			$('#gnb > .box').stop().animate({ 'right': '-80%' }, 300, function() {
				$('#gnb > .box').css('display','none');
			});

			$('#gnb .btn_menu').focus();

		});

	}

	// global

	function global() {

		$('#header ._global').on('click', function() {

			var $gnb = $('#gnb')
			var $global_wrap = $('#global_wrap')
			var $global = $('._global')

			if ($(this).hasClass('on')) {
				$('#gnb > .dim').remove()
				$(this).removeClass('on')
				$global_wrap.hide()
			} else {
				$gnb.append('<div class="dim2" style="display:block;position:fixed;top:0;left:0;z-index:10;width:100%;height:100%;background:#000;filter:alpha(opacity=50);opacity:0.5;"></div>')
				$(this).addClass('on')
				$global_wrap.show()
			}

		});

		$('#gnb').on('click', '> .dim2, #global_wrap .pop_close', function() {

			$('#gnb > .dim2').remove()
			$global.removeClass('on')
			$global_wrap.hide()
			$global.focus()

		});

	}

	// main visual slider

	function mainVisualSlider() {
	
		var $slider = $('#main_visual_slider')

		if (!$slider.length) { return }

		// pre init

		$(document).on('cycle-pre-initialize', $slider, function(event, opts) {

			if ($(event.target).hasClass('main_visual_slider')) {

				// init motion

				slide_motion($slider.find('.main_visual_item:eq(0)')[0], true)

			}

		})

		// Run cycle

		$slider.cycle({
			slides          : '> div',
			/* fx              : 'scrollHorz', */ 
			timeout         : 5000,
			speed           : 1000,
			swipe           : true,
			log			    : false,
			prev            : '#main_visual_control .cycle_prev',
			next            : '#main_visual_control .cycle_next',
			pagerTemplate   : '<a href="javascript:">{{slideNum}}</button>'
		})

		// cycle before

		$slider.on('cycle-before', function(event, opts, currEl, nextEl, fwdFlag) {

			slide_motion(nextEl, false)

		})

		// cycle update view

		$slider.on('cycle-update-view', function(event, opts, currEl, nextEl, fwdFlag) {

			if (opts.currSlide == 1) {
				$('.cycle_control').addClass('_1')
			} else if (opts.currSlide == 2) {
				$('.cycle_control').addClass('_2')
			} else {
				$('.cycle_control').removeClass('_1 _2')
			}

		})

		// motion

		function slide_motion(el, flag) {

			var $el_txt = $(el).find('.main_visual_content')
			var y_pos = 50

			if (flag) {
				TweenMax.set('.main_visual_content', { autoAlpha: 1 })
			}

			TweenMax.fromTo($el_txt.find('h2'), 0.7, { y: y_pos, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut })
			TweenMax.fromTo($el_txt.find('p.txt_01'), 0.7, { y: y_pos, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.3 })
			TweenMax.fromTo($el_txt.find('p.txt_02'), 0.7, { y: y_pos, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.5 })

		}

		// Play, Pause

		$('.main_visual_state').on('click', function() {

			if ($(this).hasClass('play')) {
				$(this).removeClass('play').addClass('pause')
				$('.icon_play').focus()
				$slider.cycle('pause')
			} else {
				$(this).removeClass('pause').addClass('play')
				$('.icon_pause').focus()
				$slider.cycle('resume')
			}

		})

	}

	// floating

	function floating() {

		$('.floating').on('click', function() {

			var nextSec = $('.plasma.p2').offset().top - 91
			var wHeight = $(window).height()

			$('html, body').animate({
				scrollTop : nextSec
				}, 400
			)

		})

	}

	// top floating

	function scrollFlag() {

		var btnTopFlag = false;

		$(window).scroll( function() {

			if ($(window).scrollTop() > 100) {
				if (!btnTopFlag) {
					$('.btn_top').stop(true).fadeIn(300)
				}

				btnTopFlag = true
			} else {
				if (btnTopFlag) {
					$('.btn_top').stop(true).fadeOut(300)
				}

				btnTopFlag = false
			}

		})

	}

	// family site

	function familySite() {

		$('.f_btn').on('click', function() {
			$(this).toggleClass('open')
			$('.lst_site').toggleClass('open').slideToggle(300)
		})

		$('.lst_site a').on('click', function() {
			$('.f_btn').text($(this).text())
			$(this).toggleClass('open')
			$('.lst_site').toggleClass('open').slideToggle(300)
		})

		$('.family .submit').on('click', function() {

			var site = {
				'SK주식회사'       : 'http://www.sk.co.kr/',
				'SK디스커버리'     : 'https://www.skdiscovery.com/',
				'SK케미칼'         : 'https://www.skchemicals.com/',
				'SK바이오사이언스' : 'https://www.skbioscience.co.kr/',
			}

			window.open(site[$('.f_btn').text()])

		})

	}

	// magnific popup

	function magnificPopup() {

		if (!$('#content').hasClass('cont_develop')) { return }

		$('.popup-with-move-anim').magnificPopup( {

			type: 'inline',
			callbacks : {
				open: function() { $(window).load(); }
			},

			fixedContentPos: false,
			fixedBgPos: true,

			overflowY: 'hidden',

			closeBtnInside: true,
			preloader: false,

			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-slide-bottom'

		});

	}

	// title motion

	function titleMotion() {

		if ($('body').hasClass('home')) { return }

		var tl = new TimelineLite({ delay: 0.5 });

		if ($('.spot .inner .cell span').length > 0) {
			var title = new SplitText($('.spot .inner .cell span'), { type: 'chars' })
			var title_chars = title.chars

			tl.staggerFrom(title_chars, 1.2, smooth_args({ force3D: true, autoAlpha: 0, y: 10, ease: Back.easeOut, onComplete: function() {
					$('.spot .inner .cell').addClass('completed');
				}
			}), 0.02, '+=0')
		}

		if ($('.spot .inner .cell p').length > 0) {
			var title = new SplitText($('.spot .inner .cell p'), { type: 'lines' })
			var title_lines = title.lines

			tl.staggerFrom(title_lines, 1.2, smooth_args({ force3D: true, autoAlpha: 0, y: 10, ease: Power3.easeOut }), 0.05, '-=0.8')
		}

	}

	// nav tab

	function navTab() {

		$('.lst_nav li').on('click', function() {

			$('.unify').hide()
			$('.skms' + $(this).index()).show()

			$(this).siblings('.on').removeClass('on')
			$(this).addClass('on')

			$('.lst_nav li a').attr('title', '')
			$(this).children().attr('title', '현재 페이지')

		})

	}

	// mouse wheel

	function mouseWheel() {

		$.fn.extend({
			mouse_wheel: function() {
				$(this).on('mousewheel', function(e) {
					if (e.originalEvent.wheelDelta >= 120) {
						this.scrollTop -= 50
					} else if (e.originalEvent.wheelDelta <= -120) {
						this.scrollTop += 50
					}
					return false
				})
			}
		})

		// 

		$('.check_area_wrap .inner').mouse_wheel()

	}

	// youtube

	$('iframe[src^="https://www.youtube.com/"], iframe[src^="https://www.facebook.com/"], iframe[src^="https://goo.gl/"]').wrap('<div class="youtubeWrap"></div>')

});


// device chk

$.fn.device = function() {

	// 스크롤바 width 추가

	var size = $(window).width() + 17

	if (size <= 1200) {

		$('body').data('device','mobile')

		// 연혁 (모바일)
		
		$('.fl .cont_his').removeClass('prev')

		$('.nav_classify li').on('click', function() {

			$('.unify').hide()
			$('.class' + $(this).index()).show()

			$(this).siblings('.on').removeClass('on')
			$(this).addClass('on')

			$('.nav_classify li a').attr('title', '')
			$(this).children().attr('title', '현재 페이지')

		});

	} else {

		$('body').data('device','pc')

		// 연혁 (PC)

		$('.fl .cont_his').addClass('prev')
	
	}

}

// gnb setting

$.fn.gnbSize = function() {

	var deviceWidth = $(window).width()
	var deviceHeight = $(window).height()

	if ($('body').data('device') == 'mobile') {

		$('body').css('overflow','visible');
		$('#gnb > .box').css({
			'height'    : deviceHeight,
			'background': '#fff'
		})

		$('#gnb .sub_menu').show()
		// $('#gnb .sub_menu ul').hide()
		if ($('#gnb > .dim').length == 0) {
			$('#gnb').append("<div class='dim' style='display:none;position:fixed;top:0;left:0;z-index:10;width:" + (deviceWidth + 17) + "px;height:" + deviceHeight + "px;background:#000;filter:alpha(opacity=50);opacity:0.5'></div>")
		}

	} else {

		$('body').css('overflow','visible')
		$('#header .h_group > div > h1 > a > img').css('display','block')

		$('#gnb > div.box').css({
			'display'    : 'block',
			'height'     : 'auto',
			'background' : 'none'
		})

		$('#gnb > div.box').css('right','-80%')
		$('#gnb > div.box > ul > li').removeClass('current')
		$('#gnb .sub_menu').hide()
		// $('#gnb .sub_menu ul').show()
		$('#gnb .sub_menu > div ul').show()
		$('#gnb > .dim').remove()

	}

}

/* historyAni */

function historyAni() {

	if ($('.content').hasClass('cont_history')) {

		$(window).on('scroll', function(e) {

			var curScrollTop = $(this).scrollTop()
			var win_h = $(window).height()
			var listYear = $('.list_his .data')
			var listYearLast = $('.list_his .data.last')
			var listYearLastOffset = $(listYearLast).offset()
			
			// 마지막

			if (curScrollTop >= listYearLastOffset.top - (win_h / 2 + 200)) {
				$(listYearLast).addClass('over')
			} else {
				$(listYearLast).removeClass('over');
			}
			
			// 중간

			listYear.each(function(i) {

				var _Year = $(listYear[i])
				var yearOffset = $(_Year).offset()
				
				if (!$(listYear[i]).hasClass('last')) {

					// 600

					if (curScrollTop >= (yearOffset.top - win_h / 2)) {
						$(listYear[i]).addClass('over')
					} else {
						$(listYear[i]).removeClass('over')
					}

				}

			})
			
		})

	}

}

/* SKP preview */

function stepChg(step) {

	var $onday_wrap = $('.onday_wrap')
	var $onday_step = $('.onday_step')
	var tab_menu    = $('.tab_menu')

	TweenMax.to($onday_wrap, 0.1, { display: 'none', alpha: 0 })
	TweenMax.to('.oneday' + step, 0.1, { display: 'block', alpha: 1 })

	TweenLite.from($onday_step, 1, { autoAlpha: 0 })

	offset = $(tab_menu).offset()
	$('html, body').animate({ scrollTop : offset.top }, 400)

	// TweenLite.to([대상], [지속시간], {객체의 키와 값)})
	// [어떤걸?] [몇초동안?] [뭘?어떻게?]

	// fromTo 애니메이션의 시작지점과 종료지점을 지정..
	// delay(지연) 초 단위의 숫자를 넣어주면 그 시간 이후에 동작
	// onComplete 애니메이션이 완료 될 때 함수를 호출 (통칭 "콜백")
	// Easing 애니메이션에 변화율을 줘 좀 더 유동적인 동작들을 수행
	// repeat(반복) 옵션 

	TweenMax.fromTo('.onday_inner ._01', 0.5, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.3 })
	TweenMax.fromTo('.onday_inner ._02', 0.5, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.4 })
	TweenMax.fromTo('.onday_inner ._03', 0.5, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.5 })
	TweenMax.fromTo('.onday_inner ._04', 0.5, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.6 })
	TweenMax.fromTo('.onday_inner ._05', 0.5, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.7 })
	TweenMax.fromTo('.onday_inner ._06', 0.5, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.8 })
	TweenMax.fromTo('.onday_inner ._07', 0.5, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, force3D: true, ease: Power0.easeOut, delay: 0.9 })

}

// scroll top 

function scollTopStart() {
	$('html,body').stop().animate({ scrollTop: 0 }, 600)
}

// Debug ie not smoothy text motion

function smooth_args(args) {
	args.rotation = 0.1
	return args
}

// mobile condition

function is_mobile() {
	return (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)
	// return $('html').hasClass('mobile')
}

// os check

function is_mac_os() {
	return navigator.platform.indexOf('Mac') > -1
}

// browser check

function is_browser_chrome() {
    return /Chrome/.test(navigator.userAgent)
}

function is_browser_firefox() {
    return /Firefox/.test(navigator.userAgent)
}