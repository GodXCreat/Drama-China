import { useSearchParams } from "react-router-dom";
import { DramaGrid } from "@/components/DramaGrid";
import { useDramaList } from "@/hooks/useDramaList";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  // Fetch data (logic lama tetap)
  const { data, isLoading } = useDramaList({
    page,
  });

  const dramas = data?.data?.list ?? [];
  const totalPage = data?.data?.totalPage ?? 1;

  const goPrev = () => {
    if (page > 1) {
      setSearchParams({ page: String(page - 1) });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goNext = () => {
    if (page < totalPage) {
      setSearchParams({ page: String(page + 1) });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* HERO */}
      <div className="relative h-[70vh] mb-12">
        <img
          src="/hero.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
        <div className="relative z-10 px-8 pt-40 max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-4">
            Drama Pilihan Hari Ini
          </h1>
          <p className="text-gray-300">
            Temukan drama terbaik dengan kualitas sinematik.
          </p>
        </div>
      </div>

      {/* DRAMA LIST */}
      <DramaGrid
        title="Untuk Kamu"
        subtitle="Rekomendasi terbaik untukmu"
        dramas={dramas}
        isLoading={isLoading}
      />

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 py-16">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className="
            px-6 py-2 rounded-full
            bg-white/10 text-gray-300
            hover:bg-white/20 hover:text-white
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          Sebelumnya
        </button>

        <span className="px-5 py-2 rounded-full bg-white text-black font-semibold">
          Halaman {page}
        </span>

        <button
          onClick={goNext}
          disabled={page === totalPage}
          className="
            px-6 py-2 rounded-full
            bg-white/10 text-gray-300
            hover:bg-white/20 hover:text-white
            disabled:opacity-40 disabled:cursor-not-allowed
            transition
          "
        >
          Selanjutnya
        </button>
      </div>
    </main>
  );
}
