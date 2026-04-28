# GRIDIRON GEAR — Technical Specification

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.1 | UI framework |
| react-dom | ^19.1 | DOM renderer |
| react-router-dom | ^7.6 | Client-side routing (HashRouter) |
| gsap | ^3.13 | Animation engine + ScrollTrigger + SplitText plugins |
| lenis | ^1.3 | Smooth scroll with inertia |
| zustand | ^5.0 | Global state management |
| lucide-react | ^0.511 | Icon library |
| tailwindcss | ^4.1 | Utility-first CSS |
| @tailwindcss/vite | ^4.1 | Tailwind Vite integration |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.3 | Build tool |
| @vitejs/plugin-react | ^4.5 | React Vite plugin (SWC) |
| typescript | ^5.8 | Type safety |
| @types/react | ^19.1 | React type definitions |
| @types/react-dom | ^19.1 | ReactDOM type definitions |

### shadcn/ui Components (via CLI)

- dialog (size guide modal)
- input (email form, filter inputs)
- label (form labels)
- separator (visual dividers)
- skeleton (loading states)

No additional UI libraries. All complex interactions (carousel, accordion, dropdown) built custom on top of primitives.

---

## Component Inventory

### Layout (shared across all pages)

| Component | Source | Notes |
|-----------|--------|-------|
| NavigationBar | Custom | Transparent-to-solid scroll transition. Mobile: full-screen overlay menu with GSAP stagger. |
| Footer | Custom | 4-column grid, newsletter form. |
| PageLoadCurtain | Custom | GSAP timeline: neon line draw → split-screen reveal. Orchestrates hero animation sequence. |
| CartPanel | Custom | Slide-out drawer with overlay. Zustand-controlled open state. |
| ToastNotification | Custom | Zustand-driven queue. Auto-dismiss after 3s. |
| CustomCursor | Custom | Desktop only (pointer media query). Lerp-following circle with state variants (default, interactive, product). |

### Sections (page-specific, used once)

**Home:**
Hero, FeaturedProducts, BrandTicker, ShopByCategory, LookbookPreview, BrandManifesto, NewsletterCTA

**Shop:**
ShopHeader, ProductGrid, FilterSidebar, PromotionalBanner

**Product Detail:**
ProductDetailMain, ProductDetailsTabs, RelatedProducts

**Lookbook:**
LookbookHero, EditorialGrid1, FullBleedFeature, EditorialGrid2, LookbookCTABanner

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| ProductCard | Custom | FeaturedProducts, ProductGrid, RelatedProducts |
| CategoryCard | Custom | ShopByCategory |
| PrimaryButton | Custom | Global (Primary, PrimaryGradient, Secondary, Ghost variants via prop) |
| IconButton | Custom | Navigation, cart, pagination, carousel |
| SectionHeader | Custom | FeaturedProducts, LookbookPreview (heading + "View All" link pattern) |
| StarRating | Custom | ProductDetailMain, ReviewsTab |
| Breadcrumb | Custom | Shop, ProductDetail |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollTrigger | Wrapper around GSAP ScrollTrigger for consistent entrance animation setup (IntersectionObserver-like trigger at 15% viewport) |
| useParallax | Applies GSAP ScrollTrigger-based parallax to a ref. Configurable speed factor. |
| useLenis | Initializes Lenis smooth scroll instance, exposes ref for scroll-to operations. |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page load curtain (neon line → split reveal) | GSAP timeline | Sequenced timeline: line width tween → two panel translateY tweens. Calls `play()` on hero video onComplete. | 🔒 High |
| Hero text character reveal | GSAP + SplitText | SplitText splits headline into chars. GSAP stagger tween translateY(110%)→0 per char. | 🔒 High |
| Scroll-triggered entrance animations (SlideUpFade, SlideInLeft, SlideInRight, ScaleIn) | GSAP + ScrollTrigger | Reusable hook wrapping ScrollTrigger.create() with fromTo() tweens. Stagger via sibling querySelector. | Medium |
| Section background color temperature shift | GSAP + ScrollTrigger | ScrollTrigger scrub tweens a CSS variable controlling a gradient overlay's opacity on each section. | Low |
| Brand ticker / marquee | CSS animation | Pure CSS @keyframes translateX on duplicated content. Two rows with opposite directions. Start on IntersectionObserver. | Low |
| Hero video parallax | GSAP + ScrollTrigger | ScrollTrigger scrub on video element translateY at 0.3x rate. | Low |
| Hero content parallax exit | GSAP + ScrollTrigger | ScrollTrigger scrub translating text elements at 0.5x on scroll past hero. | Low |
| Product card grid stagger | GSAP + ScrollTrigger | Batch pattern: ScrollTrigger.batch() with stagger config on product cards. | Medium |
| Category card parallax | GSAP + ScrollTrigger | Each card's inner image scrub-translates at 0.9x relative to card container. | Low |
| Lookbook Ken Burns | GSAP | Slow scale(1.05→1) tween over 8s on load. | Low |
| Full-bleed parallax | GSAP + ScrollTrigger | Image translateY scrub at 0.8x within section bounds. | Low |
| Custom cursor | rAF + lerp | requestAnimationFrame loop with 0.15 lerp smoothing. Size/color transitions via CSS transition on state change. | 🔒 High |
| Mobile menu stagger | GSAP timeline | Timeline with staggered from() tweens on nav links (translateX + opacity). | Medium |
| Cart panel slide | GSAP | fromTo() translateX(100%→0) on panel, opacity tween on overlay. Reverse on close. | Medium |
| Toast enter/exit | GSAP | fromTo() translateY + opacity. setTimeout triggers reverse after 3s. | Low |
| Size guide modal | CSS transition | Overlay opacity + modal scale(0.95→1). No GSAP needed. | Low |
| Review rating bar fill | GSAP + ScrollTrigger | ScrollTrigger onEnter animates width from 0% to final percentage with stagger. | Low |
| Neon glow pulse (manifesto) | CSS animation | @keyframes text-shadow oscillation. Pure CSS, infinite. | Low |
| Scroll indicator bounce | CSS animation | @keyframes translateY loop. Pure CSS. | Low |
| Smooth scrolling | Lenis | Global Lenis instance with GSAP ticker integration (lenis.raf → ScrollTrigger.update). | Low |

---

## State & Logic

### Global Store (Zustand)

Single store with four slices:

**Cart Slice:**
- Items array (product, variant, quantity). CRUD operations: addItem (merges duplicates by incrementing qty), removeItem, updateQuantity.
- `isOpen` boolean controlling CartPanel visibility.
- `itemCount` derived (sum of quantities).
- `subtotal` derived.
- Persist to localStorage via Zustand persist middleware.

**Wishlist Slice:**
- Product ID set. Toggle operation. Persist to localStorage.

**Toast Slice:**
- Queue of toast objects (id, message, type). Enqueue/dequeue operations. Cart add actions auto-trigger toast enqueue.

**UI Slice:**
- `mobileMenuOpen` boolean.
- `sizeGuideOpen` boolean (product detail modal).

### Routing Architecture

React Router v7 with `HashRouter` (static hosting compatibility). Route config:

| Route | Page Component |
|-------|---------------|
| `/` | Home |
| `/shop` | Shop |
| `/shop/:category` | Shop (pre-filtered) |
| `/product/:slug` | ProductDetail |
| `/lookbook` | Lookbook |

Navigation uses `<Link>` for client-side transitions. `react-router-dom` provides route params for product/category filtering.

### Product Data Strategy

Product catalog is a static TypeScript data module (no API). Array of product objects with: id, slug, name, category, subcategory, price, originalPrice, badge, images[], variants (color/size), specs, reviews[]. Category filters operate on this dataset client-side. Shop page params derive initial filter state.

---

## Other Key Decisions

### No shadcn Form / Validation Library

The only form is the newsletter email input and filter price inputs. No complex validation needs. Native HTML5 validation + minimal onChange state is sufficient. No react-hook-form overhead.

### Image Strategy

All product and lookbook images are static assets in `/public/images`. No dynamic image optimization pipeline. Use standard `<img>` with `loading="lazy"` and `decoding="async"` for below-fold images. Hero video is a `<video>` element with `autoPlay muted loop playsInline`.

### Carousel Implementation

Related products carousel and mobile product gallery use CSS scroll-snap with native scroll behavior + scrollLeft manipulation via navigation buttons. No Swiper/Embla dependency. CustomCursor offsets calculated per target element type.
