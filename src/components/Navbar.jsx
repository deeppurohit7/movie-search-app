import { useState, useEffect } from 'react';
import { useMovies } from '../context/useMovies';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { searchQuery, setSearchQuery, apiKey, saveApiKey } = useMovies();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/10 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <span className="bg-cyan-500 text-black px-2 py-0.5 rounded font-mono text-sm">CW</span>
            <span className="text-white">CINE<span className="text-cyan-400">WAVE</span></span>
          </a>

          <div className="hidden md:flex items-center gap-5 text-sm text-slate-300 font-medium">
            <a href="#trending" className="hover:text-cyan-400 transition-colors">Trending</a>
            <a href="#popular" className="hover:text-cyan-400 transition-colors">Popular</a>
            <a href="#top-rated" className="hover:text-cyan-400 transition-colors">Top Rated</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm pointer-events-none">🔍</span>
            <input
              type="text"
              placeholder="Search title..."
              aria-label="Search movies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-xs sm:text-sm pl-9 pr-4 py-1.5 rounded-full w-36 sm:w-56 focus:w-64 focus:border-cyan-500 focus:outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              const k = prompt("Enter your free TMDB API Key (or leave blank for studio demo catalog):", apiKey || "");
              if (k !== null) saveApiKey(k.trim());
            }}
            className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400 hover:text-white transition-all"
            title="Configure TMDB API Key"
          >
            {apiKey ? "API: Active" : "🔑 TMDB Key"}
          </button>
        </div>

      </div>
    </nav>
  );
}