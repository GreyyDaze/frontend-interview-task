import type { Property } from "../types/property";

export const properties: Property[] = [
  {
    id: 1,
    title: "Modern Apartment in City Center",
    price: 250000,
    bedrooms: 2,
    location: "Downtown",
    image: "https://placehold.co/600x400",
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
    image: "https://placehold.co/600x400",
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
    image: "https://placehold.co/600x400",
    coordinates: { lat: 51.5074, lng: -0.1278 },
    priceHistory: [
      { date: "2024-01-01", price: 430000 },
      { date: "2024-06-01", price: 440000 },
      { date: "2025-01-01", price: 450000 }
    ]
  }
];


