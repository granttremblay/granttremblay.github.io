// =============================================
// Grant Tremblay — Site Scripts
// =============================================

(function () {
    'use strict';

    // Nav scroll effect
    const nav = document.getElementById('nav');
    const heroHeight = window.innerHeight * 0.4;

    function updateNav() {
        nav.classList.toggle('scrolled', window.scrollY > heroHeight);
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // Mobile menu toggle
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    toggle.addEventListener('click', function () {
        links.classList.toggle('open');
    });

    // Close mobile menu on link click
    links.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            links.classList.remove('open');
        });
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
        observer.observe(el);
    });

    // Stagger reveal for sibling elements
    document.querySelectorAll('.roles-grid, .research-grid, .gallery-grid').forEach(function (grid) {
        var children = grid.querySelectorAll('.reveal');
        children.forEach(function (child, i) {
            child.style.transitionDelay = (i * 0.08) + 's';
        });
    });

    // Gallery lightbox
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<img src="" alt="">';
    document.body.appendChild(lightbox);
    var lightboxImg = lightbox.querySelector('img');

    document.querySelectorAll('.gallery-item img').forEach(function (img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scroll for anchor links (fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = nav.offsetHeight;
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

})();
