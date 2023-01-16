gsap.registerPlugin(ScrollTrigger);


// video
if (jQuery("div").is("#home")) {
    const homeSection = document.querySelectorAll('#home .section');
    homeSection.forEach(addTimeline1);

    function addTimeline1(target, i) {
        var video = target.getAttribute('data-video');

        gsap.timeline({
            scrollTrigger: {
                trigger: target,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse",
                onEnter: () => playVideo(),
                onEnterBack: () => playVideo(),
                onLeave: () => pauseVideo(),
                onLeaveBack: () => pauseVideo(),
            }
        })

        function playVideo() {
            jQuery(".video").fadeOut(500);
            jQuery("." + video).fadeIn(500);
            jQuery("." + video)[0].play();
        }

        function pauseVideo() {
            jQuery("." + video)[0].pause();
        }
    }
}


ScrollTrigger.matchMedia({
    // desktop
    "(min-width: 992px)": function() {
        var services = gsap.utils.toArray('.service-row');
        var indicators = gsap.utils.toArray('.services-dots li');

        var height = 300 * services.length;

        var tl = gsap.timeline({
            duration: services.length,
            scrollTrigger: {
                trigger: ".secServices",
                start: "top center",
                end: "+=" + height + "%",
                scrub: 1,
                id: "service",
            }
        })

        var pinner = gsap.timeline({
            scrollTrigger: {
                trigger: ".serviceHolder",
                start: "top top",
                end: "+=" + height + "%",
                scrub: 1,
                pin: ".serviceHolder",
                pinSpacing: true,
                id: "pinning",
            }
        })

        services.forEach(function(elem, i) {
            gsap.set(elem, { position: "absolute", top: 0, zIndex: 0 });

            tl.to(indicators[i], { backgroundColor: "black", duration: 0.25 }, i)
            tl.from(elem.querySelector('.content-right'), { autoAlpha: 0 }, i)
            tl.from(elem.querySelector('.content-left'), { autoAlpha: 0, translateY: 80 }, i)

            if (i != services.length - 1) {
                tl.set(elem, { zIndex: 1 }, i)
                tl.to(indicators[i], { backgroundColor: "#cccbc9", duration: 0.25 }, i + 0.75)
                tl.to(elem.querySelector('.content-left'), { autoAlpha: 0, translateY: -100 }, i + 0.75)
                tl.to(elem.querySelector('.content-right'), { autoAlpha: 0 }, i + 0.75)
            } else {
                tl.set(elem, { zIndex: 1 }, i)
            }
        });
    },
    "(max-width: 991px)": function() {
        jQuery(".serviceHolder, .service-row, .content-left, .content-right").attr('style', '');
    }
});


// page-indicators
var first = jQuery(".section").first().data('indicator');
jQuery(".indicators h6").text(first);

const targetTriggers = document.querySelectorAll('.section');
targetTriggers.forEach(addTimeline);

function addTimeline(target, index) {
    var title = target.getAttribute('data-indicator');

    gsap.timeline({
        scrollTrigger: {
            trigger: target,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none reverse",
            onEnter: () => addTitle(),
            onEnterBack: () => addTitle(),
        }
    })

    function addTitle() {
        jQuery(".indicators h6").text(title);
    }
}


gsap.timeline({
    scrollTrigger: {
        trigger: "footer",
        start: "top 70%",
        toggleActions: "play none none reverse",
        onEnter: () => hideTitle(),
        onLeaveBack: () => showTitle(),
    }
})


function hideTitle() {
    jQuery(".indicators h6, .indicators img").fadeOut();
}

function showTitle() {
    jQuery(".indicators h6").fadeIn(300);
    jQuery(".indicators img").show();
}



// init scrollmagic
var controller = new ScrollMagic.Controller();

// moving thread
if(jQuery(".section").is(".secVision")){
    var clientRight = new TimelineMax();
    clientRight.to(".vision-img", 1, { xPercent: -20, force3D: true });
    new ScrollMagic.Scene({
        triggerElement: ".vision-img img",
        triggerHook: "onEnter",
        duration: "150%",
    })
    .setTween(clientRight)
    .addTo(controller);
}
