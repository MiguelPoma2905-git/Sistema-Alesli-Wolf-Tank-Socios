export function Skeleton({ className = '', height = 'h-4', width = 'w-full' }) {
  return <div className={`skeleton ${height} ${width} ${className}`} />
}

export function KPISkeleton() {
  return (
    <div className="card card-p animate-pulse">
      <Skeleton height="h-3" width="w-24" className="mb-5" />
      <Skeleton height="h-16" width="w-full" className="mb-4" />
      <Skeleton height="h-3" width="w-32" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <Skeleton height="h-4" width="w-20" />
          <Skeleton height="h-4" width="w-32" />
          <Skeleton height="h-4" width="w-40" />
          <Skeleton height="h-4" width="w-16" />
          <Skeleton height="h-4" width="w-24" />
        </div>
      ))}
    </div>
  )
}