# Real Estate Listings Dashboard

A small dashboard built with React + TypeScript + Vite and Tailwind CSS v4. It displays property listings with search, filters, sorting, and a details page including a price chart and map.

## How to run

1. Install dependencies:
```bash
npm install
```
2. Start the dev server:
```bash
npm run dev
```
3. Open the printed local URL.

## Tech choices

- React + TypeScript via Vite for fast DX and type safety.
- Tailwind CSS v4 using `@tailwindcss/vite` for utility-first styling and responsive UI.
- React Router for routing between list and details pages.
- Chart.js via `react-chartjs-2` for a simple price trend chart.
- Leaflet via `react-leaflet` using OpenStreetMap tiles for the map.

## Features

- Property list with responsive grid cards (image, title, price, bedrooms, location).
- Search by title (case-insensitive). Placeholder: "Search properties...".
- Filter by minimum bedrooms.
- Sort by price asc/desc.
- Empty state when no results: "No properties found. Try adjusting your filters."
- Hover animation on cards (shadow + subtle scale).
- Details page: large image, meta, price chart, and map.
- Loading UX: skeleton cards and inline spinner during fetch.

## Time and satisfaction

- Time spent: 1h 15m (implementation) + 45m (improvements)
- Satisfaction: 9/10

## Notes and improvements

- Approach: Kept the architecture simple and readable with clear separation between `components`, `pages`, `data`, `types`, and a mock `services` layer. Used React hooks for state, `useMemo` for derived values, and Tailwind v4 utilities for fast, consistent styling.
- Trade-offs: Chose a mock fetch service over a real API to focus on UI/UX and functionality within the time box. Leaflet defaults are used with minimal custom marker assets to keep bundle size and setup small.
- Improvements if given more time (plain English):
  - Hook to save filters in the URL: So search/sort/page survive refresh and can be shared.
  - Debounced search: Wait a split second before searching to avoid extra requests.
  - Real API + caching: Swap mock for a real endpoint and add smart caching (React Query).
  - Image optimization: Use responsive images and blur-up placeholders for faster loading.
  - Dark mode: Add a theme toggle and consistent color tokens.
  - Map clustering: Group nearby markers and add custom marker icons.
  - SEO basics: Route titles/meta tags; better link previews.

Already implemented in this submission:
- Mock fetch service with pagination, filtering (search/title, min bedrooms), and sorting (price asc/desc).
- Responsive listings grid, reusable components, and empty state message.
- Details page with enhanced price chart (gradient area + 3-point moving average) and upgraded map (zoom control, circle overlay, improved UX).
- Card hover shadow and scale animation per requirement.
- Professional back-to-listing button styling.
- Accessibility improvements: skip link, main/brand landmarks, labeled inputs, focus-visible styles, aria-live on results.
- Pagination UI with total listings count.
- Skeleton loaders and spinner for list page.
- Code splitting: lazily loaded details route with Suspense fallback.
