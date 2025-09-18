type FiltersProps = {
  minBedrooms: number;
  onMinBedroomsChange: (value: number) => void;
};

export function Filters({ minBedrooms, onMinBedroomsChange }: FiltersProps) {
  return (
    <div className="flex items-center gap-3" role="group" aria-label="Filter listings">
      <label className="text-sm text-gray-700" htmlFor="minBeds">Min beds</label>
      <input
        id="minBeds"
        type="number"
        min={0}
        value={minBedrooms}
        onChange={(e) => onMinBedroomsChange(Number(e.target.value))}
        className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}


