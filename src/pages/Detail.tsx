import { useParams, Link, useNavigate } from "react-router-dom";
import { useDramaDetail } from "@/hooks/useDramaDetail";
import { Play, Eye, Heart, Calendar, ChevronLeft, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Detail() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useDramaDetail(bookId || "");

  if (isLoading) return <DetailSkeleton />;

  if (error || !data?.data) {
    return (
      <div className="min-h-screen pt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Drama tidak ditemukan</h2>
        <Link to="/" className="text-red-500 hover:underline">
          Kembali ke beranda
        </Link>
      </div>
    );
  }

  const { book } = data.data;

  const formatNumber = (num: number) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* HERO BANNER */}
      <div className="relative h-[80vh] w-full">
        <img
          src={book.cover}
          alt={book.bookName}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-8 z-10 flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <ChevronLeft />
          Kembali
        </button>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-end">
          <div className="px-8 pb-16 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {book.bookName}
            </h1>

            {/* STATS */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-300 mb-6">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {formatNumber(book.viewCount)} views
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {formatNumber(book.followCount)} likes
              </span>
              <span className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                {book.chapterCount} episode
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {book.shelfTime?.split(" ")[0]}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mb-6">
              <Link
                to={`/watch/${book.bookId}`}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200"
              >
                <Play className="w-5 h-5 fill-black" />
                Play
              </Link>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-300 max-w-2xl leading-relaxed">
              {book.introduction}
            </p>
          </div>
        </div>
      </div>

      {/* EXTRA INFO */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {book.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm rounded-full bg-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CAST */}
        {book.performerList?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Pemeran
            </h3>

            <div className="flex gap-4 flex-wrap">
              {book.performerList.map((p) => (
                <div
                  key={p.performerId}
                  className="flex items-center gap-3 bg-white/5 rounded-full pr-4"
                >
                  <img
                    src={p.performerAvatar}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm">{p.performerName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function DetailSkeleton() {
  return (
    <main className="min-h-screen bg-[#141414] px-8 pt-24">
      <Skeleton className="h-[60vh] w-full rounded-xl mb-8" />
      <Skeleton className="h-8 w-1/2 mb-4" />
      <Skeleton className="h-4 w-2/3" />
    </main>
  );
}
