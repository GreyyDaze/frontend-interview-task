import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { MapContainer, Marker, Popup, TileLayer, Circle, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "../types/property";
import { fetchPropertyById } from "../services/api";

ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale, Tooltip, Legend);

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = Number(params.id);
  const [property, setProperty] = useState<Property | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        const p = await fetchPropertyById(id);
        if (!ignore) setProperty(p);
      } catch (e: any) {
        if (!ignore) setError(e?.message || "Failed to load");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, [id]);

  const labels = useMemo(() => property?.priceHistory?.map((p) => p.date) ?? [], [property]);
  const series = useMemo(() => property?.priceHistory?.map((p) => p.price) ?? [], [property]);
  const movingAvg = useMemo(() => {
    const window = 3;
    return series.map((_, idx, arr) => {
      const start = Math.max(0, idx - window + 1);
      const slice = arr.slice(start, idx + 1);
      return Math.round(slice.reduce((a, b) => a + b, 0) / slice.length);
    });
  }, [series]);

  // Work around react-leaflet type mismatch under React 19 typings by loosening specific components
  const AnyMapContainer = MapContainer as unknown as React.ComponentType<any>;
  const AnyTileLayer = TileLayer as unknown as React.ComponentType<any>;
  const AnyCircle = Circle as unknown as React.ComponentType<any>;

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 text-gray-700">Loading...</div>
    );
  }

  if (error || !property) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-700">{error || "Property not found."}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <span>←</span>
          <span>Back to listings</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <span>←</span>
        <span>Back to listings</span>
      </Link>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="aspect-[3/2] w-full overflow-hidden rounded-xl bg-gray-100">
            <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            <h1 className="text-xl font-bold text-gray-900">{property.title}</h1>
            <p><span className="font-medium">Price:</span> ${property.price.toLocaleString()}</p>
            <p><span className="font-medium">Bedrooms:</span> {property.bedrooms}</p>
            <p><span className="font-medium">Location:</span> {property.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-gray-200 p-4">
            <h2 className="mb-3 text-sm font-semibold text-gray-900">Price History</h2>
            <Line
              data={{
                labels,
                datasets: [
                  {
                    label: "Price",
                    data: series,
                    borderColor: "#2563eb",
                    backgroundColor: (ctx) => {
                      const { ctx: c, chartArea } = ctx.chart;
                      if (!chartArea) return "rgba(37,99,235,0.15)";
                      const grad = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                      grad.addColorStop(0, "rgba(37,99,235,0.35)");
                      grad.addColorStop(1, "rgba(37,99,235,0.05)");
                      return grad;
                    },
                    fill: true,
                    tension: 0.35,
                    pointRadius: 2,
                  },
                  {
                    label: "3-point MA",
                    data: movingAvg,
                    borderColor: "#16a34a",
                    borderDash: [6, 6],
                    fill: false,
                    tension: 0.2,
                    pointRadius: 0,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: 'bottom' },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => `${ctx.dataset.label}: $${Number(ctx.parsed.y).toLocaleString()}`,
                    },
                  },
                },
                scales: {
                  y: { ticks: { callback: (v) => `$${Number(v).toLocaleString()}` }, grid: { color: "#eef2ff" } },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
          {property.coordinates && (
            <div className="rounded-xl border border-gray-200 p-4">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">Map</h2>
              <div className="h-64 w-full overflow-hidden rounded-lg">
                <AnyMapContainer
                  center={[property.coordinates.lat, property.coordinates.lng]}
                  zoom={12}
                  scrollWheelZoom={false}
                  zoomControl={false}
                  className="h-full w-full"
                >
                  <ZoomControl position="topright" />
                  <AnyTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={[property.coordinates.lat, property.coordinates.lng]}>
                    <Popup>{property.title}</Popup>
                  </Marker>
                  <AnyCircle
                    center={[property.coordinates.lat, property.coordinates.lng]}
                    radius={1500}
                    pathOptions={{ color: "#2563eb", fillColor: "#60a5fa", fillOpacity: 0.15 }}
                  />
                </AnyMapContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


