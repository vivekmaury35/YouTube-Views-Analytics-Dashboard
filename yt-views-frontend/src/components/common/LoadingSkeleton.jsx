const SkeletonPulse = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded-md ${className}`}></div>
);

export const CardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-border shadow-sm flex flex-col h-full">
    <SkeletonPulse className="w-full aspect-video rounded-none rounded-t-xl" />
    <div className="p-4 sm:p-5 flex-1">
      <SkeletonPulse className="h-5 w-full mb-2" />
      <SkeletonPulse className="h-5 w-2/3" />
    </div>
  </div>
);

export const HeaderSkeleton = () => (
  <div className="bg-white p-6 sm:p-8 rounded-xl border border-border shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between mb-8">
    <div className="flex items-center gap-6 w-full md:w-auto">
      <SkeletonPulse className="w-24 h-16 sm:w-[120px] sm:h-[68px] shrink-0" />
      <div className="flex-1 w-full max-w-sm">
        <SkeletonPulse className="h-7 w-full mb-3" />
        <SkeletonPulse className="h-5 w-32" />
      </div>
    </div>
    <div className="w-full md:w-auto flex flex-col items-center">
      <SkeletonPulse className="h-12 w-48" />
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="w-full mt-4 bg-white rounded-lg border border-border overflow-hidden">
    <div className="bg-header h-12 w-full"></div>
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex h-14 border-b border-gray-100 last:border-none p-4 items-center">
        <SkeletonPulse className="h-4 w-20" />
        <SkeletonPulse className="h-4 w-32 mx-auto" />
        <SkeletonPulse className="h-4 w-24 ml-auto" />
      </div>
    ))}
  </div>
);
