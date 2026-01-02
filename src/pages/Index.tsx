import { useState } from "react";
import { DramaGrid } from "@/components/DramaGrid";
import { useDramaList } from "@/hooks/useDramaList";

export default function Index() {
  const [page, setPage] = useState(1);

  // ⚠️ HOOK TETAP DIPANGGIL SEPERTI ASLINYA
  const { data, isLoading } = useDramaList();

  const dramas = data?.data?.list ?? [];

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

      {/* LIST */}
      <DramaGrid
        title="Untuk Kamu"
        subtitle="Rekomendasi terbaik untukmu"
        dramas={dramas}
        isLoading={isLoading}
      />

      {/* PAGINATION (UI ONLY – AMAN) */}
      <div className="flex justify-center items-center gap-4 py-16">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-6 py-2 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
        >
          Sebelumnya
        </button>

        <span className="px-5 py-2 rounded-full bg-white text-black font-semibold">
          Halaman {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-6 py-2 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
        >
          Selanjutnya
        </button>
      </div>
    </main>
  );
}
