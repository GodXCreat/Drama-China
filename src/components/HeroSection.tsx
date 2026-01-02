import { Link } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  description?: string;
  videoSrc?: string;
  imageFallback?: string;
  watchLink?: string;
  infoLink?: string;
}

export function HeroSection({
  title,
  description,
  videoSrc = "/hero.mp4",
  imageFallback = "/hero.jpg",
  watchLink = "/watch/1",
  infoLink = "/detail/1",
}: HeroSectionProps) {
  return (
    <section className="relative h-[75vh] w-full overflow-hidden">
      {/* VIDEO BACKGROUND */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        poster={imageFallback}
      />

      {/* NETFLIX GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-end">
        <div className="px-8 pb-24 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {title}
          </h1>

          {description && (
            <p className="text-gray-300 text-base md:text-lg mb-6">
              {description}
            </p>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <Link
              to={watchLink}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition"
            >
              ▶ Play
            </Link>

            <Link
              to={infoLink}
              className="flex items-center gap-2 bg-gray-600/70 text-white px-6 py-3 rounded font-bold hover:bg-gray-600 transition"
            >
              ℹ Info
            </Link>
          </div>
        </div>
      </div>
