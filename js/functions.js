var workOffSet;
var wSroll; 
var panoramaOffSet;
var hireMeOffset;
$(function() {
    init();
    smoothScroll(900);
    workBelt();
    workLoad();
    panoramMoving();
    setTimeout(time, 2000);
    // panoramMoving(); 
    clientStuff()
    $("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
});

$(window).scroll(function() {

        wSroll = $(this).scrollTop();
        $('.logo').css({
            'transform':'translate(0px, '+ wSroll/20+'%) rotate(45deg)' 
        });



        $('header h1').css({
            'transform':'translate('+wSroll/20+'%,0px)' 
        });
        if(wSroll<300){
            $('.myPicture').css({
                'transform':'translate(0px, -'+ wSroll/3+'%)' 
            });
        }

        var height = $('.section-work__overlay').height();

        if(wSroll>workOffSet-180 & wSroll<(workOffSet +height-150)) {
            // var opacity = (workOffSet)/(wSroll+100)-0.9;

            $('.section-work__overlay').css({
                'opacity': 0.1})      
            }
        else {
            $('.section-work__overlay').css({
                'opacity': 1}
            ) 
        };

        // if (wSroll>panoramaOffSet-100) {

        //     $.debounce(panoramMoving, 3000);


        // };   
        if(wSroll >= hireMeOffset+50) {
            $('.skills-to-hire-me').addClass('is-active');
            $('.skills-to-make-order').addClass('is-active');
        }

       

});
    


   function panoramMoving() {
            var $panorama = $('.panorama');
            panoramaOffSet = getOffSet('.panorama');
            var i =0;
            console.log('panoramaOffSet');
            console.log(panoramaOffSet);
            console.log(window.wSroll);

               // var timerId = setInterval(function() {

               //      i=(i-1)/2;
                    $panorama.animate({
                        backgroundPosition: i +'px -200px'}, 6000);  
               // }, 200);


    };   
   

function smoothScroll (duration) {
    $('a[href^="#"]').on('click', function(event) {

        var target = $( $(this).attr('href') );
        if( target.length ) {
            event.preventDefault();
            if(target.selector==="#about") {
                $('html, body').animate({
                    scrollTop: 300
                }, duration);
            }
            else {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, duration);
            }
        }
        
    });
}

function getOffSet(selector){
        var topOffSet = $(selector).offset().top;
        return topOffSet;
    };

function init() {
    function getOffSet(selector){
        var topOffSet = $(selector).offset().top;
        return topOffSet;
    };
    
    workOffSet = getOffSet('#work');

    hireMeOffset = getOffSet('.skills-to-hire-me');

    var panoramaOffSet=getOffSet('.panorama');
}

var second=0;

function time() {
    console.log(second++)
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
         
        
        $('.project-load').html(spinner).load(newHTML);
        $('.project-title').text(newTitle);

    })
}

function clientStuff () {
    $('.client-unit').first().addClass('active-client');
    $('.client-logo').first().addClass('active-logo');
    $('.clients-mobile-nav span').first().addClass('active-logo');

    $('.client-logo, .clients-mobile-nav span').on('click', function (e) {
        var $this = $(this),
            activeIndex = $(e.currentTarget).index();

        $this.addClass('active-logo');
        $this.siblings().removeClass('active-logo');

        $('.client-unit').removeClass('active-client').eq(activeIndex).addClass('active-client');
    });

    $('.client-control-next').on('click', function (e) {
         var $this = $(this),
            activeClient = $('.clients-belt').find('.active-client'),
            activeIndex = $('.clients-belt').children().index(activeClient),
            clientNum = $('.client-unit').length;

        if(activeIndex<clientNum-1) {

            $('.active-client').removeClass('active-client').next().addClass('active-client');
        } else {
            $('.client-unit').removeClass('active-client').first().addClass('active-client');
            $('.client-logo').removeClass('active-logo').first().addClass('active-logo');
        }

    });

    $('.client-control-prev').on('click', function (e) {
        console.log("asfa");
         var $this = $(this),
            activeClient = $('.clients-belt').find('.active-client'),
            activeIndex = $('.clients-belt').children().index(activeClient),
            clientNum = $('.client-unit').length;

        if(activeIndex===0) {
            $('.client-unit').removeClass('active-client').last().addClass('active-client');
            $('.client-logo').removeClass('active-client').last().addClass('active-client');

            
        } else {
            $('.active-client').removeClass('active-client').prev().addClass('active-client');
            
        }

    });      
}
    // function panoramMoving() {

    //     var panoramaOffSet = getOffSet('.panorama');
    //         console.log('panoramaOffSet');
    //     console.log(panoramaOffSet);
    //     console.log(wSroll);
    //     if (wSroll>panoramaOffSet-100) {
    //         var timerId = setInterval(function (){
    //             alert("af");
    //         }, 2000)
    //     }
    // };

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