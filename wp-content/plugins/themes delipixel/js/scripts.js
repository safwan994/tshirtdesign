// preloader
jQuery(window).on("load", function () {
    jQuery("#preloader").delay(100).animate({ opacity: '0' }, 500, function () {
        jQuery(this).hide();
        gsap.to(".morph", 1, {top: 0, autoAlpha: 1});
    });
});

// menu
var hamburger = jQuery('.btn-menu');
TweenLite.set('.menu-logo', { autoAlpha: 0 });
TweenLite.set('.btn-close', { autoAlpha: 0 });
TweenLite.set('.main-menu li', { autoAlpha: 0 });

hamburger.on('click', function(e) {
    var hamburgerMotion = new TimelineMax()
    hamburgerMotion.to('.main-menu', 0.5, { autoAlpha: 1, zIndex: 500 }, 0)
        .to('.btn-menu', 0.5, { autoAlpha: 1 }, 0)
        .to('.menu-logo', 0.5, { autoAlpha: 1 }, 0)
        .staggerTo('.main-menu li', 1.5, { autoAlpha: 1, ease: Power4.easeInOut }, 0.15, "-=0.5")
        .to('.btn-close', 0.4, { autoAlpha: 1 }, '-=0.5')
});

jQuery(".btn-close, .menu-footer a").on('click', function(e) {
    var hamburgerOut = new TimelineMax()
    hamburgerOut.to('.main-menu', 0.4, { autoAlpha: 0, zIndex: -1 }, 0)
        .to('.btn-menu', 0.4, { xPercent: '0' }, 0)
        .to('.nav-logo', 0.4, { xPercent: '0' }, 0);
    TweenLite.set('.btn-close', { autoAlpha: 0 });
    TweenLite.set('.main-menu li', { autoAlpha: 0 }, 0);
});

// nav-link
jQuery(".main-menu li a").each(function(index) {
    if ((window.location.pathname.indexOf(jQuery(this).attr('href'))) > -1) {
        jQuery(this).parent().addClass('current-menu-item');
    }
});

// nav scroll
jQuery(document).ready(function() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = jQuery('header nav').outerHeight();

    jQuery(window).scroll(function(event) {
        if (jQuery(window).scrollTop() >= 150) {
            didScroll = true;
        } else {
            jQuery('nav').removeClass('hidden-nav').removeClass('fixed-nav');
            didScroll = false;
        }
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 50);

    function hasScrolled() {
        var st = jQuery(this).scrollTop();
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            jQuery('nav').removeClass('fixed-nav').addClass('hidden-nav');
        } else {
            // Scroll Up
            jQuery('nav').removeClass('hidden-nav').addClass('fixed-nav');
        }
        lastScrollTop = st;
    }
});


// scroll down
jQuery(".scroll-down").click(function() {
    jQuery('html, body').animate({
        scrollTop: jQuery(".sec02").offset().top,
    }, '1500');
});

// scroll to top
jQuery(".scroll-up, .footer-btn").click(function() {
    jQuery('html, body').animate({
        scrollTop: jQuery('html, body').offset().top,
    }, '1500');
});

// footer
var h = jQuery("footer").height();
jQuery(".footer-btn").css('height', h);
jQuery(".footer-btn-title").css('width', h);

// file upload
jQuery(document).ready(function() {
    jQuery('input[type="file"]').change(function(e) {
        var fileName = e.target.files[0].name;
        jQuery(".fileUpload p").text(fileName);
    });
});

jQuery('#quoteModal').on('show.bs.modal', function(e) {
    jQuery(".quote-step-1").show();
    jQuery(".quote-step-2").hide();
});

// btn-next
jQuery(".btn-next").click(function() {
    jQuery(".quote-step-1").hide();
    jQuery(".quote-step-2").fadeIn(300);
});

// filter product
jQuery(".filter select").change(function() {
    window.location = jQuery(this).val();
});

jQuery(document).ready(function(){
    var page = window.location.href;
    var select = document.getElementById('sel');


    for (var i = 0; i < select.length; i++){
        var option = select.options[i];
        if (option.value == page) {
          jQuery(select.options[i]).attr("selected", true);
          jQuery("#sel").find("option[value=" + i +"]").attr('selected', true);
          break;
        }
    }
});


// magnific-popup
jQuery(".img-popup").each(function() {
    jQuery(this).magnificPopup({
        delegate: 'a',
        gallery: {
            enabled: false
        },
        type: 'image'
    });
});

jQuery(".gallery-popup").each(function() {
    jQuery(this).magnificPopup({
        delegate: 'a',
        gallery: {
            enabled: true
        },
        type: 'image'
    });
});

// product-color
jQuery('[data-toggle="tooltip"]').tooltip();
jQuery(".color").each(function(){
    var code = jQuery(this).data('color');
    jQuery(this).css('background-color', code);
});

// resize
jQuery(document).ready(function() {
    resized();
});

jQuery(window).resize(function() {
    resized();
});

function resized() {
    // this event needs to be run before slick is initialized
    jQuery('.portfolio-slider').on('init', function(event, slick, direction) {
        if (jQuery(window).width() > 991) {
            if (jQuery('.portfolio-slider .slick-slide').length <= 3) {
                jQuery('.portfolio-slider .slick-dots').hide();
            }
        }
        if (jQuery(window).width() < 992) {
            if (jQuery('.portfolio-slider .slick-slide').length <= 2) {
                jQuery('.portfolio-slider .slick-dots').hide();
            }
        }
        if (jQuery(window).width() < 600) {
            if (jQuery('.portfolio-slider .slick-slide').length <= 1) {
                jQuery('.portfolio-slider .slick-dots').hide();
            }
        }
    });
}

// slick slider
jQuery(document).ready(function() {
    jQuery('.details-slider').slick({
        dots: false,
        infinite: false,
        arrows: false,
        CenterMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        asNavFor: '.thumb-slider',
    });

    jQuery(".thumb-slider").slick({
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        asNavFor: '.details-slider',
        focusOnSelect: true,
        vertical: true,
    });

    jQuery('.portfolio-slider').slick({
        dots: true,
        infinite: false,
        arrows: false,
        CenterMode: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: false,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

    jQuery(".slick-dots button").text("");
});


// Menu Circle
gsap.set(".following", {xPercent: -50, yPercent: -50});

var ball = jQuery(".following");
var pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
var mouse = { x: pos.x, y: pos.y };
var speed = 0.1;

var xSet = gsap.quickSetter(ball, "x", "px");
var ySet = gsap.quickSetter(ball, "y", "px");

window.addEventListener("mousemove", e => {    
    mouse.x = e.x;
    mouse.y = e.y;  
});

gsap.ticker.add((time, deltaTime) => {
    ball.each(function() {
        var fpms = 60 / 10000;
        var delta = deltaTime * fpms;
    
        var dt = 1.0 - Math.pow(1.0 - speed, delta);

        pos.x += (mouse.x - pos.x) * dt;
        pos.y += (mouse.y - pos.y) * dt;

        xSet(pos.x);
        ySet(pos.y);
    });
});

jQuery(".main-menu a").hover(function(){
    var tl = new TimelineMax();
    tl.to(jQuery('.following'), 0.5, {scaleX:1.3, scaleY:1.3, opacity:0.3, ease: Power4.easeInOut})
    .to(jQuery('.following'), 0.5, {scaleX:1, scaleY:1, opacity:0.1, ease: Power4.easeInOut})
}, function(){
    gsap.to(jQuery('.following'), 0.5, {scaleX:1, scaleY:1, opacity:0.1, ease: Power4.easeInOut})
});
