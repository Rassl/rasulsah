

function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function workBelt() {

	$('.thumb-unit').on('click', function() {
		$('.work-belt').css({'left': '-100%'});
		$('.work-container').show();
	})

	$('.work-return').on('click', function () {
		$('.work-belt').css({'left': '0%'});
		$('.work-container').hide(800);
	})
}


function workLoad() {
	$.ajaxSetup({cashe: false});

	$('.thumb-unit').on('click', function(e) {
		
		var 
			$this = $(this),
			newTitle = $this.find('strong').text(),
			projectIndex = $(e.currentTarget).index()+1, 
			spinner = '<div class="loader">Loading...</div>',
			newHTML = '/work/proj-'+projectIndex+'.html';
			console.log(projectIndex);
		
		$('.project-load').html(spinner).load(newHTML);
		$('.project-title').text(newTitle);

	})
}

function clientStuff () {
	$('.client-unit').first().addClass('active-client');
	$('.client-logo').first().addClass('active-client');
	$('.clients-mobile-nav span').first().addClass('active-client');

	$('.client-logo, .clients-mobile-nav span').on('click', function (e) {
		var $this = $(this),
			activeIndex = $(e.currentTarget).index();

		$this.addClass('active-client');
		$this.siblings().removeClass('active-client');

		$('.client-unit').removeClass('active-client').eq(activeIndex).addClass('active-client');
	})

	$('.client-control-next').on('click', function () {
		 var $this = $(this),
			activeClient = $('.clients-belt').find('.active-client'),
			activeIndex = $('.clients-belt').children().index(activeClient),
			clientNum = $('.client-unit').length;

		if(activeIndex<clientNum-1) {

			$('.active-client').removeClass('active-client').next().addClass('active-client');
			console.log(activeIndex);
		} else {
			console.log('activeIndex');
			$('.client-unit').removeClass('active-client').first().addClass('active-client');
			$('.client-logo').removeClass('active-client').first().addClass('active-client');
		}

	})

	$('.client-control-prev').on('click', function () {
		 var $this = $(this),
			activeClient = $('.clients-belt').find('.active-client'),
			activeIndex = $('.clients-belt').children().index(activeClient),
			clientNum = $('.client-unit').length;

		if(activeIndex===0) {
			$('.client-unit').removeClass('active-client').last().addClass('active-client');
			$('.client-logo').removeClass('active-client').last().addClass('active-client');

			
		} else {
			console.log('activeIndex');
			$('.active-client').removeClass('active-client').prev().addClass('active-client');
			console.log(activeIndex);
			
		}

	})		
}

/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );