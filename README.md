# Gridiron Gear eCommerce Website

A modern football gear eCommerce website built as a React single-page application. The project presents a polished storefront experience for browsing football products, viewing product details, exploring an editorial lookbook, and managing a local shopping cart.

> Note: The repository folder uses `gridion`, but the public project title is **Gridiron Gear**.

## Live Demo

Live demo coming soon.

## Screenshot

Add a project screenshot here after deployment.

```md
![Gridiron Gear eCommerce Website Screenshot](./screenshot.png)
```

## Features

- Responsive storefront landing page with video hero, featured products, category browsing, lookbook preview, brand sections, and newsletter signup UI.
- Shop page with product grid, category filters, price filters, sorting, and empty-state handling.
- Product detail pages with image gallery, color and size selectors, quantity controls, tabbed product information, reviews, related products, and size guide modal.
- Slide-out cart panel with quantity updates, item removal, subtotal calculation, and persisted cart state.
- Wishlist toggle support with persisted local state.
- Editorial lookbook page with full-screen hero imagery, image grids, parallax-style animations, and calls to shop the collection.
- Mobile navigation menu and responsive layouts for desktop, tablet, and mobile screens.
- UI animations powered by GSAP and ScrollTrigger.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Zustand for local cart, wishlist, and UI state
- Tailwind CSS
- GSAP and ScrollTrigger
- Lucide React icons
- Radix UI-based component primitives available under `src/components/ui`
- ESLint

This is not a Next.js project. The app is a Vite-powered React single-page application located inside the `app` directory.

## Project Structure

```text
gridion-gear-ecommerce-website/
|-- app/
|   |-- public/
|   |   |-- images/              # Product, category, and lookbook images
|   |   `-- videos/              # Hero video asset
|   |-- src/
|   |   |-- components/          # Shared UI components and cart/navigation elements
|   |   |-- components/ui/       # Reusable UI primitives
|   |   |-- data/                # Product and category data
|   |   |-- hooks/               # Custom React hooks
|   |   |-- lib/                 # Utility helpers
|   |   |-- pages/               # Route-level pages
|   |   |-- sections/            # Homepage sections
|   |   |-- store/               # Zustand store
|   |   |-- App.tsx              # App shell and routes
|   |   `-- main.tsx             # React entry point
|   |-- index.html
|   |-- package.json
|   |-- tailwind.config.js
|   |-- tsconfig.json
|   `-- vite.config.ts
|-- tech-spec.md
`-- README.md
```

## Getting Started

The application source code is inside the `app` folder, so run local commands from that directory.

```bash
cd app
npm install
npm run dev
```

By default, the Vite dev server is configured to run on:

```text
http://localhost:3000
```

## Available Scripts

The following scripts are defined in `app/package.json`:

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Runs TypeScript build checks and creates a production build with Vite.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run preview
```

Serves the production build locally for preview.

## Deployment

This project is ready to deploy as a Vite React app on Vercel.

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Set the **Root Directory** to `app`.
4. Use the following build settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Because the actual app is inside `/app`, the Vercel Root Directory should be set to `app`.

## Portfolio Note

Gridiron Gear demonstrates a complete front-end eCommerce concept with modern React routing, reusable components, product data modeling, local cart and wishlist state, responsive layouts, animation, and polished visual presentation for a sports retail brand.

## Future Improvements

- Add real checkout and payment processing.
- Connect products, inventory, and orders to a backend or headless CMS.
- Add search functionality for the shop catalog.
- Create dedicated wishlist, account, and order history pages.
- Add automated tests for cart behavior, filters, and product routes.
- Improve accessibility coverage for interactive controls and dialogs.

## Author

Dushko Kochoski

## License

This project is provided for portfolio and educational purposes. Add a license file if you plan to distribute or reuse it publicly.
