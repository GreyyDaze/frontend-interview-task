import { Link } from "react-router-dom";
import type { Property } from "../types/property";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="block rounded-xl overflow-hidden bg-white shadow-sm transition-transform duration-200 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      aria-label={`${property.title}, ${property.bedrooms} bedrooms, $${property.price.toLocaleString()}, ${property.location}`}
    >
      <div className="aspect-[3/2] w-full bg-gray-100">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{property.title}</h3>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-700">
          <span className="font-medium">${property.price.toLocaleString()}</span>
          <span>{property.bedrooms} beds</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{property.location}</p>
      </div>
    </Link>
  );
}


