import { useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Search, X, Play, Menu } from "lucide-react";
import { useSearchDramas } from "@/hooks/useDramas";
import { useDebounce } from "@/hooks/useDebounce";

const navLinks = [
  { path: "/", label: "Beranda" },
  { path: "/terbaru", label: "Terbaru" },
  { path: "/terpopuler", label: "Terpopuler" },
  { path: "/sulih-suara", label: "Sulih Suara" },
];

export function Header() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 300);
  const normalizedQuery = debouncedQuery.trim();
  const { data: searchResults, isLoading } = useSearchDramas(normalizedQuery);

  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <span className="text-[#E50914] font-extrabold text-xl tracking-tight">
              DRAMAFLIX
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition ${
                    active
                      ? "text-white font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded hover:bg-white/10"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 rounded hover:bg-white/10 md:hidden"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-sm ${
                  location.pathname === link.path
                    ? "text-white font-semibold"
                    : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* SEARCH OVERLAY */}
      {searchOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/95">
            <div className="max-w-4xl mx-auto px-6 pt-24">
              <div className="flex items-center gap-4 mb-6">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul drama"
                  className="flex-1 bg-[#222] text-white px-4 py-3 rounded outline-none"
                />
                <button
                  onClick={handleCloseSearch}
                  className="p-2 rounded hover:bg-white/10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {isLoading && normalizedQuery && (
                <p className="text-gray-400">Mencari...</p>
              )}

              {searchResults && searchResults.length > 0 && (
                <div className="grid gap-4">
                  {searchResults.map((drama) => (
                    <Link
                      key={drama.bookId}
                      to={`/detail/${drama.bookId}`}
                      onClick={handleCloseSearch}
                      className="flex gap-4 items-center hover:bg-white/5 p-3 rounded"
                    >
                      <img
                        src={drama.cover}
                        className="w-14 h-20 object-cover rounded"
                      />
                      <span className="text-white">
                        {drama.bookName}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {!normalizedQuery && (
                <p className="text-gray-500">
                  Ketik judul drama untuk mencari
                </p>
              )}
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
