// NovaStock — demo catalog data
// Replace these placeholder names, prices and descriptions with real products.

var CATEGORIES = [
  { slug: "growth-marketing", name: "Growth Marketing", desc: "Organic reach, ad management, and campaign packages.", count: 6 },
  { slug: "seo-services", name: "SEO Services", desc: "On-page audits, backlink building, and keyword research.", count: 5 },
  { slug: "design-templates", name: "Design Templates", desc: "Ready-to-edit UI kits, decks, and brand assets.", count: 7 },
  { slug: "software-licenses", name: "Software Licenses", desc: "Productivity tools and creative software licenses.", count: 4 },
  { slug: "hosting-vps", name: "Hosting & VPS", desc: "Managed hosting plans and virtual private servers.", count: 5 },
  { slug: "content-writing", name: "Content Writing", desc: "Blog packages, product copy, and technical writing.", count: 4 },
  { slug: "video-editing", name: "Video Editing", desc: "Short-form edits, motion graphics, and thumbnails.", count: 5 },
  { slug: "virtual-assistance", name: "Virtual Assistance", desc: "Data entry, inbox management, and research support.", count: 3 },
];

var PRODUCTS = [
  {
    slug: "product-1",
    name: "Product 1 — Starter Growth Package",
    category: "growth-marketing",
    categoryName: "Growth Marketing",
    price: "$29.00",
    priceRange: "$29.00 – $89.00",
    rating: 5,
    reviews: 24,
    tag: "Best Seller",
    short: "A 30-day organic growth package for one social profile, with weekly reporting.",
    desc: "A structured 30-day growth plan for a single social profile, covering content pacing, hashtag strategy, and audience targeting. Includes a weekly performance summary so you can see exactly what's working.",
    includes: ["30-day campaign duration", "Weekly performance report", "One dedicated account manager", "Email support"],
    icon: "trend"
  },
  {
    slug: "product-2",
    name: "Product 2 — Professional SEO Audit",
    category: "seo-services",
    categoryName: "SEO Services",
    price: "$59.00",
    priceRange: "$59.00 – $199.00",
    rating: 5,
    reviews: 31,
    tag: "Popular",
    short: "Full technical and on-page SEO audit with a prioritized action list.",
    desc: "A complete crawl of your site covering technical issues, on-page structure, and content gaps. Delivered as a prioritized action list ranked by expected impact, so your team knows exactly what to fix first.",
    includes: ["Full technical crawl report", "On-page content review", "Competitor keyword gap analysis", "48-hour turnaround"],
    icon: "search"
  },
  {
    slug: "product-3",
    name: "Product 3 — UI Kit Bundle",
    category: "design-templates",
    categoryName: "Design Templates",
    price: "$19.00",
    priceRange: "$19.00 – $49.00",
    rating: 5,
    reviews: 18,
    tag: "New",
    short: "A 120-component design system file for product and marketing teams.",
    desc: "A complete component library covering navigation, forms, cards, and marketing sections, built with consistent spacing and type scales. Comes with light and dark variants and organized layer naming.",
    includes: ["120+ components", "Light & dark variants", "Editable source file", "Free updates for 12 months"],
    icon: "layers"
  },
  {
    slug: "product-4",
    name: "Product 4 — Productivity Suite License",
    category: "software-licenses",
    categoryName: "Software Licenses",
    price: "$39.00",
    priceRange: "$39.00 – $120.00",
    rating: 4,
    reviews: 12,
    tag: "",
    short: "One-year license key for the full productivity suite, single seat.",
    desc: "A single-seat, one-year license for the full productivity suite, activated instantly by email. Covers document, spreadsheet, and presentation tools with cloud sync included.",
    includes: ["1-year single seat license", "Instant email delivery", "Cloud sync included", "Standard vendor support"],
    icon: "box"
  },
  {
    slug: "product-5",
    name: "Product 5 — Managed VPS (4GB)",
    category: "hosting-vps",
    categoryName: "Hosting & VPS",
    price: "$12.00",
    priceRange: "$12.00 / month",
    rating: 5,
    reviews: 27,
    tag: "Best Seller",
    short: "4GB RAM managed VPS with daily backups and 24/7 monitoring.",
    desc: "A fully managed virtual private server with 4GB RAM, 2 vCPUs, and 80GB SSD storage. Includes daily automated backups, uptime monitoring, and a control panel for one-click app installs.",
    includes: ["4GB RAM / 2 vCPU / 80GB SSD", "Daily automated backups", "24/7 uptime monitoring", "Control panel access"],
    icon: "server"
  },
  {
    slug: "product-6",
    name: "Product 6 — Blog Content Package (10 posts)",
    category: "content-writing",
    categoryName: "Content Writing",
    price: "$89.00",
    priceRange: "$89.00 – $249.00",
    rating: 5,
    reviews: 15,
    tag: "",
    short: "Ten SEO-optimized blog posts, 1000+ words each, with topic research.",
    desc: "Ten original blog posts of 1,000+ words, each optimized around a researched target keyword and outlined before writing. Includes one round of revisions per post.",
    includes: ["10 posts, 1,000+ words each", "Keyword research included", "One revision round per post", "Delivered as ready-to-publish docs"],
    icon: "doc"
  },
  {
    slug: "product-7",
    name: "Product 7 — Short-Form Video Edit Pack",
    category: "video-editing",
    categoryName: "Video Editing",
    price: "$15.00",
    priceRange: "$15.00 – $60.00",
    rating: 4,
    reviews: 9,
    tag: "Sale",
    short: "Five short-form edits with captions, transitions, and cover frames.",
    desc: "Five vertical short-form edits cut from your raw footage, with captions, pacing transitions, and a chosen cover frame for each. Delivered in formats ready for the major short-video platforms.",
    includes: ["5 edited clips", "Auto-captioning included", "Platform-ready export formats", "One revision per clip"],
    icon: "play"
  },
  {
    slug: "product-8",
    name: "Product 8 — Virtual Assistant (20 hrs/month)",
    category: "virtual-assistance",
    categoryName: "Virtual Assistance",
    price: "$149.00",
    priceRange: "$149.00 / month",
    rating: 5,
    reviews: 21,
    tag: "Popular",
    short: "A dedicated assistant for 20 hours a month of admin and research work.",
    desc: "A dedicated virtual assistant available for 20 hours per month, handling inbox management, scheduling, data entry, and web research. Weekly check-ins keep the workload aligned with your priorities.",
    includes: ["20 hours per month", "Dedicated assistant (not pooled)", "Weekly check-in call", "Task tracking dashboard"],
    icon: "user"
  },
];

function getFeaturedProducts() {
  return PRODUCTS.slice(0, 8);
}

function getProductBySlug(slug) {
  return PRODUCTS.filter(function (p) { return p.slug === slug; })[0];
}

function getProductsByCategory(slug) {
  return PRODUCTS.filter(function (p) { return p.category === slug; });
}

function getCategoryBySlug(slug) {
  return CATEGORIES.filter(function (c) { return c.slug === slug; })[0];
}
