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

    // Failsafe: reveal anything already in view (e.g. when deep-linking to a
    // mid-page anchor like /#group, where the observer may not fire on jump).
    function revealInView() {
        document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.top < window.innerHeight && r.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('load', function () { setTimeout(revealInView, 60); });
    window.addEventListener('hashchange', function () { setTimeout(revealInView, 60); });

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

// =============================================
// Blog category filter (blog index only)
// =============================================
(function () {
  var filters = document.querySelectorAll('.blog-filter');
  var cards = document.querySelectorAll('.blog-list .blog-card');
  if (!filters.length || !cards.length) return;
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-cat');
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      cards.forEach(function (card) {
        var cats = (card.getAttribute('data-cats') || '').split('|');
        card.style.display = (cat === 'all' || cats.indexOf(cat) !== -1) ? '' : 'none';
      });
    });
  });
})();

// =============================================
// Publications live search (publications page only)
// =============================================
(function () {
  var input = document.getElementById('pub-search');
  if (!input) return;
  var items = Array.prototype.slice.call(document.querySelectorAll('.pub-item'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.pub-year-group'));
  var countEl = document.getElementById('pub-count');
  var emptyEl = document.getElementById('pub-empty');
  function apply() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    items.forEach(function (it) {
      var hay = it.getAttribute('data-search') || it.textContent.toLowerCase();
      var match = !q || hay.indexOf(q) !== -1;
      it.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    groups.forEach(function (g) {
      var any = g.querySelectorAll('.pub-item:not([style*="display: none"])').length;
      g.style.display = any ? '' : 'none';
    });
    if (countEl) countEl.textContent = shown;
    if (emptyEl) emptyEl.style.display = shown ? 'none' : '';
  }
  input.addEventListener('input', apply);
})();

// Keep aria-expanded in sync on the nav toggle
(function () {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    toggle.setAttribute('aria-expanded', links.classList.contains('open') ? 'true' : 'false');
  });
})();
