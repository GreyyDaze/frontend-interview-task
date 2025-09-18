import { Routes, Route, Navigate } from "react-router-dom";
import PropertyListPage from "./pages/PropertyListPage";
import { lazy, Suspense } from "react";
const PropertyDetailsPage = lazy(() => import("./pages/PropertyDetailsPage"));

export default function App() {
  return (
    <div className="min-h-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to main content
      </a>
      <header className="border-b bg-white/70 backdrop-blur" role="banner">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-lg font-semibold text-gray-900">Real Estate Dashboard</h1>
        </div>
      </header>
      <main id="main-content" role="main">
        <Suspense fallback={<div className="p-6 text-sm text-gray-600">Loading page…</div>}>
          <Routes>
            <Route path="/" element={<PropertyListPage />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
