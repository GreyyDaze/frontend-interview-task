import { useEffect, useMemo, useState } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { SearchBar } from "../components/SearchBar";
import { Filters } from "../components/Filters";
import { SortSelect } from "../components/SortSelect";
import type { SortOrder } from "../components/SortSelect";
import { fetchProperties } from "../services/api";
import { CardSkeleton, Spinner } from "../components/Loader";
import type { Property } from "../types/property";

export default function PropertyListPage() {
  const [search, setSearch] = useState("");
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");
  const [data, setData] = useState<Property[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const { data, total } = await fetchProperties({
          _page: page,
          _limit: pageSize,
          q: search || undefined,
          bedrooms_gte: minBedrooms || undefined,
          _sort: sortOrder === "none" ? undefined : "price",
          _order: sortOrder === "none" ? undefined : sortOrder,
        });
        if (!ignore) {
          setData(data);
          setTotal(total);
        }
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Failed to load");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [page, search, minBedrooms, sortOrder]);

  const filtered = useMemo(() => data, [data]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">Real Estate Listings</h1>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex items-center gap-3">
          <Filters minBedrooms={minBedrooms} onMinBedroomsChange={setMinBedrooms} />
          <SortSelect order={sortOrder} onChange={setSortOrder} />
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="mt-10 rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-600"
          role="status"
          aria-live="polite"
        >
          No properties found. Try adjusting your filters.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <button
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
          {loading && <Spinner />}
          <span>Previous</span>
          </button>
          <span className="text-sm text-gray-600">Page {page}</span>
          <button
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
            onClick={() => setPage((p) => p + 1)}
            disabled={loading || (total !== null && page * pageSize >= total)}
          >
          {loading && <Spinner />}
          <span>Next</span>
          </button>
        </div>
        <div className="flex-1 text-right text-sm text-gray-600">
          {total !== null ? `Total: ${total} listings` : ''}
        </div>
      </div>
    </div>
  );
}


