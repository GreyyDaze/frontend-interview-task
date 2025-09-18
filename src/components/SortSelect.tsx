type SortOrder = "asc" | "desc" | "none";

type SortSelectProps = {
  order: SortOrder;
  onChange: (order: SortOrder) => void;
};

export function SortSelect({ order, onChange }: SortSelectProps) {
  return (
    <select
      value={order}
      onChange={(e) => onChange(e.target.value as SortOrder)}
      aria-label="Sort by price"
      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
    >
      <option value="none">Sort by price</option>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
}

export type { SortOrder };


