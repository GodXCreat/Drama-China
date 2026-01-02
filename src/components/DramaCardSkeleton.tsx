interface DramaCardSkeletonProps {
  index?: number;
}

export function DramaCardSkeleton({ index = 0 }: DramaCardSkeletonProps) {
  return (
    <div
      className="
        relative
        min-w-[180px]
        aspect-[2/3]
        rounded-md
        overflow-hidden
        bg-[#2a2a2a]
        animate-pulse
      "
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Shimmer */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
          animate-shimmer
        "
        style={{ backgroundSize: "200% 100%" }}
      />
    </div>
  );
}
