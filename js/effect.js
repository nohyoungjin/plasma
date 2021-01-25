jQuery(function($) {

	// INIT

	lst_intro()
	lst_work()

	waypoint_css_motion()

	//

	function lst_intro() { 

		TweenMax.set('.lst_intro li', { autoAlpha: 0 })

		$('.lst_intro').waypoint(function() {

			$('.lst_intro li').each(function(index) {

				var $this = $(this)
				var $img = $(this).find('figure')
				var $strong = $(this).find('strong')
				var $txt = $(this).find('p')

				var mySplitText = new SplitText($txt, { type: 'lines' })
				var lines = mySplitText.lines

				var tl = new TimelineLite({ delay: index * .15 })

				TweenMax.set($img, { autoAlpha: 0, y: 50 })
				TweenMax.set($strong, { autoAlpha: 0, y: 50 })
				TweenMax.set(lines, { autoAlpha: 0, y: 50 })

				TweenMax.set($this, { autoAlpha: 1 })

				tl.to($img, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				  .to($strong, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				  .staggerTo(lines, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, 0.1, '-=1')

			})
				
			this.destroy()
		}, {
			offset: '80%'
		})

	}


	//

	function lst_work() { 

		TweenMax.set('.lst_work li', { autoAlpha: 0 })

		$('.lst_work').waypoint(function() {

			$('.lst_work li').each(function(index) {

				var $this = $(this)
				var $img = $(this).find('figure')
				var $strong = $(this).find('strong')
				var $txt = $(this).find('p')

				var mySplitText = new SplitText($txt, { type: 'lines' })
				var lines = mySplitText.lines

				var tl = new TimelineLite({ delay: index * .15 })

				TweenMax.set($img, { autoAlpha: 0, y: 50 })
				TweenMax.set($strong, { autoAlpha: 0, y: 50 })
				TweenMax.set(lines, { autoAlpha: 0, y: 50 })

				TweenMax.set($this, { autoAlpha: 1 })

				tl.to($img, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				  .to($strong, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				  .staggerTo(lines, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, 0.1, '-=1')

			})
				
			this.destroy()
		}, {
			offset: '80%'
		})

	}


	// css animation

	function waypoint_css_motion() {

		if (isMobile()) { return }

		// offset property

		$('.waypoint').each(function() {
			var $this = $(this)

			$this.waypoint(function() {
				$this.addClass('animate')
				this.destroy()
			}, {
				offset: $this.attr('data-offset')
			})
		})

	}

});