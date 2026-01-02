interface HeroSectionProps {
  title: string;
  description?: string;
  background?: string;
}

export function HeroSection({
  title,
  description,
  background = "/hero.jpg",
}: HeroSectionProps) {
  return (
    <section className="relative h-[70vh] w-full">
      {/* Background Image */}
      <img
        src={background}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Netflix Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="px-8 pb-20 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-gray-300 text-base md:text-lg mb-6">
              {description}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition">
              ▶ Play
            </button>

            <button className="flex items-center gap-2 bg-gray-600/70 text-white px-6 py-3 rounded font-bold hover:bg-gray-600 transition">
              ℹ Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
