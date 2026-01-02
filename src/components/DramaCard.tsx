import { Link } from "react-router-dom";
import { Play, Flame } from "lucide-react";
import type { Drama } from "@/types/drama";

interface DramaCardProps {
  drama: Drama;
  index?: number;
}

export function DramaCard({ drama, index = 0 }: DramaCardProps) {
  const coverUrl = drama.coverWap || drama.cover;
  const tags = drama.tags || drama.tagNames || [];

  return (
    <Link
      to={`/detail/${drama.bookId}`}
      className="
        group relative
        min-w-[180px]
        cursor-pointer
        transition-transform duration-300
        hover:scale-125
        hover:z-20
      "
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-black">
        <img
          src={coverUrl}
          alt={drama.bookName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Netflix overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Center Play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xl">
            <Play className="w-7 h-7 text-black ml-1" />
          </div>
        </div>

        {/* Top badges (tetap aman) */}
        {drama.corner && (
          <div
            className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-red-600 font-bold"
            style={{ backgroundColor: drama.corner.color }}
          >
            {drama.corner.name}
          </div>
        )}

        {drama.rankVo && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-black/70 text-xs">
            <Flame className="w-3 h-3 text-red-500" />
            {drama.rankVo.hotCode}
          </div>
        )}
      </div>

      {/* Title muncul saat hover */}
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-sm font-semibold line-clamp-2">
          {drama.bookName}
        </h3>

        {drama.protagonist && (
          <p className="text-xs text-gray-400 truncate">
            {drama.protagonist}
          </p>
        )}
      </div>
    </Link>
  );
}
