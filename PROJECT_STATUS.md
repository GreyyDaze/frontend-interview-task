# Project Status

This document tracks progress, decisions, and follow-ups outside the codebase README.

## Current state

- Implemented: list page, search, bedrooms filter, price sort, empty state, hover animation, details page with chart and map.
- Styling: Tailwind CSS v4 via `@tailwindcss/vite`. Responsive grid and clean UI.
- Data: Mock dataset in `src/data/properties.ts` with basic price history and coordinates.

## Setup

- Install: `npm install`
- Dev: `npm run dev`

## Decisions

- Utility-first styling with Tailwind for speed and consistency.
- Co-located components under `src/components` and pages under `src/pages` for clarity.
- Chart.js and Leaflet chosen for wide familiarity and quick integration.

## TODO / Future work

- Replace mock data with API, add loading/error states.
- Pagination or infinite scroll for large datasets.
- Tests (unit + E2E) and accessibility enhancements.
- Better map markers and clustering.


