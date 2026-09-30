// NovaStock — shared interactivity
document.addEventListener('DOMContentLoaded', function () {

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scroll shadow (glass effect intensifies on scroll)
  var header = document.querySelector('.site-header');
  if (header) {
    var onScrollHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });
  }

  // Cursor glow on dark hero section (desktop only, subtle premium touch)
  if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    var glowTargets = document.querySelectorAll('.hero, .cta-band, .about-block__visual');
    var activeZone = false;
    document.addEventListener('mousemove', function (e) {
      var overZone = false;
      glowTargets.forEach(function (zone) {
        var r = zone.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          overZone = true;
        }
      });
      glow.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%, -50%)';
      if (overZone !== activeZone) {
        activeZone = overZone;
        glow.classList.toggle('is-active', overZone);
      }
    });
  }

  // Scroll reveal via IntersectionObserver
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll('.section-head, .feature-grid, .cat-grid, .testimonial-grid, .about-block, .cta-band, .prose, .track-card, .faq-list, .trust-strip__grid');
    revealTargets.forEach(function (el) {
      if (el.classList.contains('feature-grid') || el.classList.contains('cat-grid') || el.classList.contains('testimonial-grid') || el.classList.contains('trust-strip__grid')) {
        el.classList.add('reveal-stagger');
      } else {
        el.classList.add('reveal');
      }
    });
    // Product grids get stagger treatment too, but they're rendered dynamically —
    // handled separately after render via observeRevealEls()
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) { io.observe(el); });
    window._novaIO = io; // expose for dynamically rendered grids
  }

  // Animated number counters (hero stats / stat rows)
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var counterEls = document.querySelectorAll('.hero__stat b, .stat-row b');
    var animateCount = function (el) {
      var raw = el.textContent.trim();
      var match = raw.match(/^([^\d]*)([\d,.]+)(.*)$/);
      if (!match) return;
      var prefix = match[1], numStr = match[2].replace(/,/g, ''), suffix = match[3];
      var target = parseFloat(numStr);
      if (isNaN(target)) return;
      var decimals = (numStr.split('.')[1] || '').length;
      var duration = 1200;
      var startTime = null;
      var step = function (ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = target * eased;
        var display = decimals ? current.toFixed(decimals) : Math.round(current).toLocaleString();
        el.textContent = prefix + display + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = raw;
      };
      requestAnimationFrame(step);
    };
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(function (el) { counterIO.observe(el); });
  }

  // Back to top button
  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Back to top');
  backToTop.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(backToTop);
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      mobileNav.classList.toggle('is-open');
      var expanded = mobileNav.classList.contains('is-open');
      navToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('is-open');
      // close siblings within the same list
      var list = item.closest('.faq-list');
      if (list) {
        list.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
          if (openItem !== item) openItem.classList.remove('is-open');
        });
      }
      item.classList.toggle('is-open', !wasOpen);
    });
  });

  // Product detail tabs
  var tabBtns = document.querySelectorAll('.pd-tabs__btn');
  if (tabBtns.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        document.querySelectorAll('.pd-tabs__btn').forEach(function (b) { b.classList.remove('is-active'); });
        document.querySelectorAll('.pd-tabs__panel').forEach(function (p) { p.classList.remove('is-active'); });
        btn.classList.add('is-active');
        document.getElementById(target).classList.add('is-active');
      });
    });
  }

  // Product detail option pills (visual selection only, demo)
  document.querySelectorAll('.option-pills').forEach(function (group) {
    group.querySelectorAll('.option-pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        group.querySelectorAll('.option-pill').forEach(function (p) { p.classList.remove('is-selected'); });
        pill.classList.add('is-selected');
      });
    });
  });

  // Quantity stepper
  document.querySelectorAll('.qty-stepper').forEach(function (stepper) {
    var display = stepper.querySelector('span');
    var minus = stepper.querySelector('[data-action="decrease"]');
    var plus = stepper.querySelector('[data-action="increase"]');
    var count = parseInt(display.textContent, 10) || 1;
    minus.addEventListener('click', function () {
      count = Math.max(1, count - 1);
      display.textContent = count;
    });
    plus.addEventListener('click', function () {
      count = count + 1;
      display.textContent = count;
    });
  });

  // Gallery thumbs (product detail) — swap active state only, demo
  document.querySelectorAll('.pd-gallery__thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      document.querySelectorAll('.pd-gallery__thumb').forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
    });
  });

  // Track order demo form
  var trackForm = document.getElementById('track-order-form');
  if (trackForm) {
    trackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('track-status');
      if (status) status.classList.add('is-visible');
      status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // Category filter (shop page) — client-side demo filter
  var filterInputs = document.querySelectorAll('[data-filter-category]');
  var productCards = document.querySelectorAll('[data-product-category]');
  if (filterInputs.length && productCards.length) {
    var applyFilters = function () {
      var checked = Array.from(filterInputs).filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
      var countEl = document.getElementById('result-count');
      var visible = 0;
      productCards.forEach(function (card) {
        var cat = card.getAttribute('data-product-category');
        var show = checked.length === 0 || checked.indexOf(cat) !== -1;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (countEl) countEl.textContent = visible;
    };
    filterInputs.forEach(function (input) { input.addEventListener('change', applyFilters); });
  }

  // Subtle tilt-on-hover for product & category cards (desktop only)
  if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      var card = e.target.closest && e.target.closest('.product-card, .cat-card');
      if (!card) return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = 'translateY(-6px) rotateX(' + (-py * 3.5).toFixed(2) + 'deg) rotateY(' + (px * 3.5).toFixed(2) + 'deg)';
    });
    document.addEventListener('mouseout', function (e) {
      var card = e.target.closest && e.target.closest('.product-card, .cat-card');
      if (card && !card.contains(e.relatedTarget)) {
        card.style.transform = '';
      }
    }, true);
  }

  // Set active nav link based on current path
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
});
