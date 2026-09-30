// NovaStock — shared render components

var ICONS = {
  trend: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><circle cx="7" cy="7" r="0.8" fill="currentColor"/><circle cx="7" cy="17" r="0.8" fill="currentColor"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
};

function starString(n) {
  var full = '★'.repeat(n);
  var empty = '☆'.repeat(5 - n);
  return full + empty;
}

function productCardHTML(p) {
  var tagHTML = p.tag ? '<span class="product-card__tag' + (p.tag === 'Sale' ? ' product-card__tag--amber' : '') + '">' + p.tag + '</span>' : '';
  return (
    '<article class="product-card" data-product-category="' + p.category + '">' +
      '<div class="product-card__media">' + tagHTML +
        '<span class="glyph">' + ICONS[p.icon] + '</span>' +
      '</div>' +
      '<div class="product-card__body">' +
        '<span class="product-card__cat">' + p.categoryName + '</span>' +
        '<h3><a href="product.html?slug=' + p.slug + '">' + p.name + '</a></h3>' +
        '<p class="product-card__desc">' + p.short + '</p>' +
        '<div class="product-card__rating"><span class="stars">' + starString(p.rating) + '</span><span>(' + p.reviews + ')</span></div>' +
        '<div class="product-card__footer">' +
          '<span class="product-card__price">' + p.price + '<span>Starting price</span></span>' +
          '<a href="product.html?slug=' + p.slug + '" class="btn btn--ghost btn--sm">View</a>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function renderProductGrid(containerId, products) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = products.map(productCardHTML).join('');
  observeRevealEl(el);
}

// Attach the shared scroll-reveal observer (set up in main.js) to a
// dynamically-rendered container, since it didn't exist at page load.
function observeRevealEl(el) {
  if (!el) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  el.classList.add('reveal-stagger');
  if (window._novaIO) {
    window._novaIO.observe(el);
  } else {
    // IO not ready yet (script order) — reveal immediately as a safe fallback
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
  }
}

function categoryCardHTML(c) {
  return (
    '<a href="category-detail.html?slug=' + c.slug + '" class="cat-card">' +
      '<span class="cat-card__icon">' + ICONS.layers + '</span>' +
      '<h3>' + c.name + '</h3>' +
      '<p>' + c.desc + '</p>' +
      '<div class="cat-card__meta"><span>' + c.count + ' products</span><span class="arrow">Explore →</span></div>' +
    '</a>'
  );
}

function renderCategoryGrid(containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = CATEGORIES.map(categoryCardHTML).join('');
  observeRevealEl(el);
}

function renderCategoryRail(containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = CATEGORIES.map(function (c) {
    return '<a href="category-detail.html?slug=' + c.slug + '" class="cat-pill">' + c.name + '</a>';
  }).join('');
}

function renderFooter(containerId) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML =
    '<div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a href="index.html" class="logo"><span class="logo__mark">Nova<span>Stock</span></span></a>' +
          '<p>A clean, organized marketplace for digital products and marketing services. Transparent pricing, fast delivery, and support that responds.</p>' +
          '<span class="footer-badge">✓ Secure checkout on every order</span>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h5>Shop</h5>' +
          '<ul>' +
            '<li><a href="shop.html">All products</a></li>' +
            '<li><a href="category.html">All categories</a></li>' +
            '<li><a href="shop.html">Best sellers</a></li>' +
            '<li><a href="track-order.html">Track an order</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h5>Company</h5>' +
          '<ul>' +
            '<li><a href="about.html">About us</a></li>' +
            '<li><a href="faq.html">FAQ</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h5>Legal</h5>' +
          '<ul>' +
            '<li><a href="privacy-policy.html">Privacy policy</a></li>' +
            '<li><a href="refund-policy.html">Refund & replacement</a></li>' +
            '<li><a href="terms.html">Terms of service</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© 2026 NovaStock. All rights reserved. Demo storefront — for design preview only.</span>' +
        '<div class="footer-socials">' +
          '<a href="#" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 4.9c-.8.4-1.7.6-2.6.8 1-.6 1.7-1.5 2-2.6-.9.5-1.9.9-3 1.1-.9-.9-2.1-1.5-3.4-1.5-2.6 0-4.7 2.1-4.7 4.7 0 .4 0 .7.1 1-3.9-.2-7.4-2.1-9.7-5-.4.7-.6 1.5-.6 2.3 0 1.6.8 3.1 2.1 3.9-.7 0-1.5-.2-2.1-.6v.1c0 2.3 1.6 4.2 3.8 4.6-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.9 2.3 3.2 4.4 3.3-1.6 1.3-3.6 2-5.8 2-.4 0-.7 0-1.1-.1 2.1 1.3 4.5 2.1 7.1 2.1 8.6 0 13.3-7.1 13.3-13.3v-.6c.9-.7 1.7-1.5 2.3-2.4z"/></svg></a>' +
          '<a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.5 1.6-1.5h1.6V3.7C15.9 3.6 14.9 3.5 13.8 3.5c-2.5 0-4.2 1.5-4.2 4.3v2.1H6.9V13h2.7v8h3.9z"/></svg></a>' +
          '<a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg></a>' +
        '</div>' +
      '</div>' +
    '</div>';
}
