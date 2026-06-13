(function () {
    'use strict';

    var header     = document.getElementById('header');
    var hamburger  = document.getElementById('hamburger');
    var navLinks   = document.getElementById('nav-links');
    var sections   = document.querySelectorAll('section[id]');
    var anchorLinks = document.querySelectorAll('.nav__links .nav__link:not(.nav__link--cta)');

    /* --- Sticky header on scroll --- */
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveLink();
    }

    /* --- Scroll-spy: highlight nav link matching visible section --- */
    function updateActiveLink() {
        var scrollPos = window.scrollY + (header ? header.offsetHeight : 70) + 20;
        var currentId = '';

        sections.forEach(function (section) {
            if (section.offsetTop <= scrollPos) {
                currentId = section.getAttribute('id');
            }
        });

        anchorLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });
    }

    /* --- Hamburger toggle --- */
    function toggleMenu() {
        var isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    /* --- Close mobile menu --- */
    function closeMobileMenu() {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    /* --- Smooth scroll for in-page anchor links --- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href').slice(1);
            if (!targetId) return;
            var target = document.getElementById(targetId);
            if (!target) return;
            e.preventDefault();
            closeMobileMenu();
            var offset = header ? header.offsetHeight : 70;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    /* --- Close mobile nav when any link is clicked --- */
    if (navLinks) {
        navLinks.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    /* --- Close mobile nav on outside click --- */
    document.addEventListener('click', function (e) {
        if (
            navLinks &&
            navLinks.classList.contains('open') &&
            !navLinks.contains(e.target) &&
            hamburger &&
            !hamburger.contains(e.target)
        ) {
            closeMobileMenu();
        }
    });

    /* --- Wire up events --- */
    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* --- Run once on load --- */
    handleScroll();
})();
