export type Property = {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  location: string;
  image: string;
  // Optional fields for potential extensions
  coordinates?: {
    lat: number;
    lng: number;
  };
  priceHistory?: Array<{ date: string; price: number }>;
};


