import type { Property } from "../types/property";
import { properties as seed } from "../data/properties";

const API_BASE = "https://s3.us-central-1.wasabisys.com/mashvisor-cdn";

// Extended property data with all fields for chart and map
const extendedProperties: Property[] = [
  {
    id: 1,
    title: "Modern Apartment in City Center",
    price: 250000,
    bedrooms: 2,
    location: "Downtown",
    image: "https://i.postimg.cc/Bvmy8d3Y/images-1.jpg",
    coordinates: { lat: 40.7128, lng: -74.006 },
    priceHistory: [
      { date: "2024-01-01", price: 240000 },
      { date: "2024-06-01", price: 245000 },
      { date: "2025-01-01", price: 250000 }
    ]
  },
  {
    id: 2,
    title: "Cozy Suburban Home",
    price: 320000,
    bedrooms: 3,
    location: "Suburbs",
    image: "https://i.postimg.cc/85Fy7ctc/images-2.jpg",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    priceHistory: [
      { date: "2024-01-01", price: 300000 },
      { date: "2024-06-01", price: 310000 },
      { date: "2025-01-01", price: 320000 }
    ]
  },
  {
    id: 3,
    title: "Spacious Country House",
    price: 450000,
    bedrooms: 4,
    location: "Countryside",
    image: "https://via.placeholder.com/600x400",
    coordinates: { lat: 51.5074, lng: -0.1278 },
    priceHistory: [
      { date: "2024-01-01", price: 430000 },
      { date: "2024-06-01", price: 440000 },
      { date: "2025-01-01", price: 450000 }
    ]
  },
  {
    id: 4,
    title: "Luxury Penthouse Suite",
    price: 750000,
    bedrooms: 3,
    location: "Uptown",
    image: "https://via.placeholder.com/600x400",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    priceHistory: [
      { date: "2024-01-01", price: 720000 },
      { date: "2024-06-01", price: 735000 },
      { date: "2025-01-01", price: 750000 }
    ]
  },
  {
    id: 5,
    title: "Charming Victorian Home",
    price: 380000,
    bedrooms: 4,
    location: "Historic District",
    image: "https://via.placeholder.com/600x400",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    priceHistory: [
      { date: "2024-01-01", price: 365000 },
      { date: "2024-06-01", price: 372000 },
      { date: "2025-01-01", price: 380000 }
    ]
  },
  {
    id: 6,
    title: "Modern Studio Loft",
    price: 180000,
    bedrooms: 1,
    location: "Arts Quarter",
    image: "https://via.placeholder.com/600x400",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    priceHistory: [
      { date: "2024-01-01", price: 175000 },
      { date: "2024-06-01", price: 177000 },
      { date: "2025-01-01", price: 180000 }
    ]
  }
];

export type FetchParams = {
  _page?: number;
  _limit?: number;
  q?: string;
  bedrooms_gte?: number;
  _sort?: "price";
  _order?: "asc" | "desc";
};

async function fetchFromAPI(): Promise<Property[]> {
  try {
    const response = await fetch(`${API_BASE}/task-fe-listings.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const apiData = await response.json();
    
    // Merge API data with extended data, using API data when available
    return apiData.map((apiItem: any) => {
      const extended = extendedProperties.find(p => p.id === apiItem.id);
      return {
        ...extended, // Use extended data as base
        ...apiItem,  // Override with API data
        // Ensure required fields exist
        coordinates: extended?.coordinates || { lat: 40.7128 + Math.random() * 0.1, lng: -74.006 + Math.random() * 0.1 },
        priceHistory: extended?.priceHistory || [
          { date: "2024-01-01", price: apiItem.price - 10000 },
          { date: "2024-06-01", price: apiItem.price - 5000 },
          { date: "2025-01-01", price: apiItem.price }
        ]
      } as Property;
    });
  } catch (error) {
    console.warn("Failed to fetch from API, using extended mock data:", error);
    return extendedProperties;
  }
}

export async function fetchProperties(params: FetchParams) {
  const {
    _page = 1,
    _limit = 6,
    q,
    bedrooms_gte,
    _sort,
    _order,
  } = params ?? {};

  // Fetch from API with fallback to extended mock data
  const allData = await fetchFromAPI();

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 200));

  let data = allData;

  if (q) {
    const query = q.toLowerCase();
    data = data.filter((p) => p.title.toLowerCase().includes(query));
  }
  if (typeof bedrooms_gte === "number" && bedrooms_gte > 0) {
    data = data.filter((p) => p.bedrooms >= bedrooms_gte);
  }
  if (_sort === "price" && _order) {
    data = [...data].sort((a, b) => (_order === "asc" ? a.price - b.price : b.price - a.price));
  }

  const total = data.length;
  const start = (_page - 1) * _limit;
  const end = start + _limit;
  const pageData = data.slice(start, end);

  return { data: pageData, total };
}

export async function fetchPropertyById(id: number): Promise<Property | undefined> {
  const allData = await fetchFromAPI();
  return allData.find((p) => p.id === id);
}


