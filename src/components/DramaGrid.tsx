import { DramaCard } from "./DramaCard";
import { DramaCardSkeleton } from "./DramaCardSkeleton";
import type { Drama } from "@/types/drama";

interface DramaGridProps {
  dramas?: Drama[];
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

export function DramaGrid({
  dramas,
  isLoading,
  title,
  subtitle,
}: DramaGridProps) {
  return (
    <section className="py-10">
      {(title || subtitle) && (
        <div className="px-8 mb-4">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
      )}

      {/* Netflix Row */}
      <div className="flex gap-4 overflow-x-auto px-8 scrollbar-hide">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <DramaCardSkeleton key={i} index={i} />
            ))
          : dramas
              ?.filter((drama) => drama.bookId)
              .map((drama, index) => (
                <DramaCard
                  key={drama.bookId}
                  drama={drama}
                  index={index}
                />
              ))}
      </div>

      {!isLoading && dramas?.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400">Tidak ada drama ditemukan</p>
        </div>
      )}
    </section>
  );
}
