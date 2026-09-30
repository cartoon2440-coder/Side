# NovaStock — Demo Marketplace Website

A clean, minimal, professional demo storefront for a digital products / services marketplace.
Static HTML/CSS/JS — no build step, no backend. Ready to upload to GitHub Pages.

## What's included

- `index.html` — Homepage (hero, categories, featured products, trust signals, testimonials)
- `shop.html` — Full product catalog with category filters
- `category.html` — All categories overview grid
- `category-detail.html` — Single category page (products filtered by `?slug=`)
- `product.html` — Product detail page template (reads `?slug=` from URL)
- `about.html` — About us page
- `faq.html` — FAQ accordion page
- `track-order.html` — Order tracking demo form
- `contact.html` — Contact form + support info
- `privacy-policy.html`, `refund-policy.html`, `terms.html` — Legal pages
- `css/style.css` — Full design system (colors, type, components)
- `js/data.js` — **Demo product & category data — edit this to add your real products**
- `js/components.js` — Shared render logic (product cards, category cards, footer)
- `js/main.js` — Interactivity (mobile nav, FAQ accordion, tabs, filters)

## How to customize

1. Open `js/data.js` and replace the placeholder products (`Product 1`, `Product 2`, ...)
   and categories with your real ones. Every page pulls from this one file automatically.
2. Update the site name ("NovaStock") via find-and-replace across all `.html` files if desired.
3. Replace `support@novastock.example`, WhatsApp/Telegram links, and social links in
   `contact.html` and `js/components.js` (footer) with your real contact details.
4. Colors and fonts live at the top of `css/style.css` under `:root` — change the hex values
   there to re-theme the whole site in one place.

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `novastock-demo`).
2. Upload all files in this folder, keeping the same structure (`css/`, `js/` folders must
   stay alongside the `.html` files).
3. In the repository, go to **Settings → Pages**.
4. Under **Source**, select the `main` branch and `/ (root)` folder, then save.
5. Wait 1–2 minutes — your demo will be live at:
   `https://<your-username>.github.io/<repository-name>/`

No build tools, npm install, or server setup required — it's plain HTML/CSS/JS.
