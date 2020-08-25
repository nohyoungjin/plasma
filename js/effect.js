jQuery(function($) {

	// INIT

	lst_intro();
	lst_work();

	waypoint_css_motion();
	// motion_with_class();


	//

	function lst_intro() { 

		TweenMax.set('.lst_intro li', { autoAlpha: 0 });

		$('.lst_intro').waypoint(function() {

			$('.lst_intro li').each(function(index) {

				var $this = $(this);
				var $img = $(this).find('figure');
				var $strong = $(this).find('strong');
				var $txt = $(this).find('p');

				var mySplitText = new SplitText($txt, { type: "lines" });
				var lines = mySplitText.lines;

				var tl = new TimelineLite({ delay: index * .15 });

				TweenMax.set($img, { autoAlpha: 0, y: 50 });
				TweenMax.set($strong, { autoAlpha: 0, y: 50 });
				TweenMax.set(lines, { autoAlpha: 0, y: 50 });

				TweenMax.set($this, { autoAlpha: 1 });

				tl.to($img, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				  .to($strong, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				  .staggerTo(lines, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, 0.1, "-=1")

			});
				
			this.destroy();
		}, {
			offset: "80%"
		});

	}


	//

	function lst_work() { 

		TweenMax.set('.lst_work li', { autoAlpha: 0 });

		$('.lst_work').waypoint(function() {

			$('.lst_work li').each(function(index) {

				var $this = $(this);
				var $img = $(this).find('figure');
				var $strong = $(this).find('strong');
				var $txt = $(this).find('p');

				var mySplitText = new SplitText($txt, { type: "lines" });
				var lines = mySplitText.lines;

				var tl = new TimelineLite({ delay: index * .15 });

				TweenMax.set($img, { autoAlpha: 0, y: 50 });
				TweenMax.set($strong, { autoAlpha: 0, y: 50 });
				TweenMax.set(lines, { autoAlpha: 0, y: 50 });

				TweenMax.set($this, { autoAlpha: 1 });

				tl.to($img, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				  .to($strong, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut })
				  .staggerTo(lines, 1.2, { autoAlpha: 1, y: 0, ease: Back.easeOut }, 0.1, "-=1")

			});
				
			this.destroy();
		}, {
			offset: "80%"
		});

	}


	// css animation

	function waypoint_css_motion() {

		if (is_mobile()) {
			return;
		}

		// offset property

		$('.waypoint').each(function() {
			var $this = $(this);

			$this.waypoint(function() {
				$this.addClass('animate');
				this.destroy();
			}, {
				offset: $this.attr("data-offset")
			});
		});

	}


	// simple class add

	function motion_with_class() {

		if (is_mobile()) {
			return;
		}

		$('.ani_tit').each(function() {

			var $this = $(this);
			var tl = new TimelineLite({ paused: true });
			TweenMax.set($this, { autoAlpha: 0, y: 50 });
			tl.to($this, 1.4, { autoAlpha: 1, y: 0, ease: Back.easeOut });

			$this.waypoint(function() {
				tl.play();
				this.destroy();
			}, {
				offset: "90%"
			});

		});

		// 

		$('.ani_txt').each(function() {

			var $this = $(this);
			var tl = new TimelineLite({ paused: true });

			var txt_original = $this.html();
			var txt_split = new SplitText($this , { type: "lines" });
			var lines = txt_split.lines; 

			TweenMax.set(lines, {autoAlpha: 0, y: 30});

			// animate

			tl.staggerTo(lines, 2.2, { autoAlpha: 1, y: 0, ease: Back.easeOut, onComplete : function() {
				$this.html(txt_original);
			}}, 0.1, "+=0");


			$this.waypoint(function() {
				tl.play();
				this.destroy();
			}, {
				offset: "90%"
			});

		});

		// 3d 

		$('.ani_3d').each(function() {

			var $this = $(this);
			var off_set = $this.attr('data-offset');
			var tl = new TimelineLite({ paused: true });

			if (off_set == undefined) {
				off_set = '100%';
			}

			TweenMax.set($this, { css: { transformPerspective: 400, transformStyle: "preserve-3d" } });

			tl.from($this, 1.6, { y: '40%', z: 40, rotationX: 4, force3D: true, ease: Power3.easeOut });
			tl.from($this, 0.5, { autoAlpha: 0, ease: Power3.easeOut }, "-=1.6");

			$this.waypoint(function() {
				tl.play();
				this.destroy();
			}, {
				offset: off_set
			});

		});

	}

});