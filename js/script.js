$(function () {
    "use-strict";

    // Shrink nav
    function shrinkNav() {
        $(window).on('scroll', function () {
            let scrolling = $(this).scrollTop();

            if (scrolling > 50 && !$('.main-header').hasClass('fixed-header')) {
                $('.main-header').addClass('fixed-header');
            } else if (scrolling <= 50 && $('.main-header').hasClass('fixed-header')) {
                $('.main-header').removeClass('fixed-header');
            }
        });
    }
    shrinkNav();

    // Global Dropdown
    function globalDropdown() {
        $(".responsive-nav .dropdown-list > a").on("click", function (e) {
            e.preventDefault();

            let parent = $(this).parent(".dropdown-list");
            let dropdown = parent.find(".dropdown-ul");

            // Close all dropdowns except the one being clicked
            $(".responsive-nav .dropdown-list").not(parent).removeClass("active")
                .find(".dropdown-ul").slideUp(200);

            // Toggle active class
            parent.toggleClass("active");

            // Toggle current dropdown
            dropdown.slideToggle(200);
        });

        // Close dropdown when clicking outside
        $(document).on("click", function (e) {
            if (!$(e.target).closest(".responsive-nav .dropdown-list").length) {
                $(".responsive-nav .dropdown-list").removeClass("active")
                    .find(".dropdown-ul").slideUp(200);
            }
        });
    }
    globalDropdown();

    // Toggle menu
    function resToggleMenu() {
        $('.main-header .toggle-items').hide();

        $('.main-header .toggle-controller').on('click', function () {
            $('.main-header .toggle-items').toggle(500);

            $(this).toggleClass('active');
        });
    }
    resToggleMenu();
    
    // Back to top
    function btt() {
        $(window).on('load', function(){
            $(".btt").hide();
        });

        $(window).on('scroll', function () {
            let scrolling = $(this).scrollTop();

            if (scrolling > 120) {
                $('.btt').show(500);
            } else {
                $('.btt').hide(500);
            }
        });

        $('.btt').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        });
    }
    btt();

    // Current year
    $(".currentYear").text(new Date().getFullYear());

    // Animated title
    function animatedTitle() {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        // Split
        const split = new SplitText(".animated-title", { type: "words,chars" });

        // Animate ONLY when visible
        gsap.from(split.chars, {
            scrollTrigger: {
                trigger: ".animated-title",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            opacity: 0,
            y: 40,
            stagger: 0.05,
            ease: "back.out(1.7)"
        });
    }
    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            animatedTitle();
        });
    });
});