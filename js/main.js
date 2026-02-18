/* ===================================================================
 * Hesed 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };
    const $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');

        });
    };


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = $('.header-menu-toggle');
        const nav = $('.header-nav-wrap');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $WIN.on('resize', function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        nav.find('a').on("click", function() {

            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.slideToggle(); 
            }
        });

    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };

    
   /* Smooth Scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {
        
        const pxShow      = 500;
        const $goTopButton = $(".ss-go-top")

        // Show or hide the button
        if ($(window).scrollTop() >= pxShow) $goTopButton.addClass('link-is-visible');

        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                if(!$goTopButton.hasClass('link-is-visible')) $goTopButton.addClass('link-is-visible')
            } else {
                $goTopButton.removeClass('link-is-visible')
            }
        });
    };


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();

    })();

    

})(jQuery);

const header = document.querySelector('.s-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
        header.classList.add('is-sticky');
    } else {
        header.classList.remove('is-sticky');
    }
});



// Set target date
const targetDate = new Date("Aug 7, 2026 00:00:00").getTime();

const elements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
};

setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const time = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000*60*60*24)) / (1000*60*60)),
        minutes: Math.floor((distance % (1000*60*60)) / (1000*60)),
        seconds: Math.floor((distance % (1000*60)) / 1000)
    };

    // Update each counter with flip animation (safe version)
for (let unit in time) {
    let el = elements[unit];
    if (!el) continue; // skip if element doesn't exist

    if (el.innerText != String(time[unit]).padStart(2,'0')) {
        el.classList.add('flip'); // add flip
        setTimeout(() => {
            el.innerText = String(time[unit]).padStart(2,'0');
            el.classList.remove('flip'); // remove flip after transition
        }, 300);
    }
}

}, 1000);



// Select the footer-top element
const footerTop = document.querySelector('.footer-top'); // make sure it exists in your HTML
const cta = document.querySelector('.floating-cta'); // your CTA button

// On scroll
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;

    if (footerTop) { // check if it exists
        const footerTopPosition = footerTop.getBoundingClientRect().top;

        if (footerTopPosition < windowHeight) {
            // Footer is entering viewport
            cta.style.opacity = "0";
            cta.style.transform = "translateY(50px)"; // slide down
        } else {
            // Footer is not in view
            cta.style.opacity = "1";
            cta.style.transform = "translateY(0)";
        }
    }
});


// mobile-only submenu toggle
if (window.innerWidth <= 768) {
    const toggles = document.querySelectorAll('.submenu-toggle');

    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;

            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }
        });
    });
}



