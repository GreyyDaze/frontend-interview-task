export function Spinner() {
  return (
    <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent align-[-0.125em]"></div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <div className="aspect-[3/2] w-full animate-pulse rounded-lg bg-gray-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}


