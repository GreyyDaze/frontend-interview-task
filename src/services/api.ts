import type { Property } from "../types/property";
import { properties as seed } from "../data/properties";

export type FetchParams = {
  _page?: number;
  _limit?: number;
  q?: string;
  bedrooms_gte?: number;
  _sort?: "price";
  _order?: "asc" | "desc";
};

export async function fetchProperties(params: FetchParams) {
  const {
    _page = 1,
    _limit = 6,
    q,
    bedrooms_gte,
    _sort,
    _order,
  } = params ?? {};

  // Expand the seed data to simulate a larger dataset (e.g., 36 items)
  const expanded: Property[] = Array.from({ length: 12 })
    .flatMap((_, batchIndex) =>
      seed.map((p, i) => {
        const id = batchIndex * seed.length + p.id;
        const priceVariance = (batchIndex * 5000) + (i * 1500);
        const bedroomsVariance = (i % 3);
        const coordsBump = batchIndex * 0.02 + i * 0.005;
        return {
          ...p,
          id,
          title: `${p.title} #${id}`,
          price: p.price + priceVariance,
          bedrooms: Math.max(1, p.bedrooms + bedroomsVariance),
          coordinates: p.coordinates
            ? { lat: p.coordinates.lat + coordsBump, lng: p.coordinates.lng + coordsBump }
            : undefined,
          priceHistory: (p.priceHistory ?? []).map((ph, idx) => ({
            ...ph,
            price: ph.price + priceVariance - idx * 1500,
          })),
        } as Property;
      })
    );

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 350));

  let data = expanded;

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
  const { data } = await fetchProperties({ _limit: 500 });
  return data.find((p) => p.id === id);
}


