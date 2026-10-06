import { useEffect } from 'react';
import { useMovies } from '../context/useMovies';
import { getImageUrl } from '../services/api';

export default function MovieModal() {
  const { selectedMovie, setSelectedMovie } = useMovies();

  useEffect(() => {
    if (!selectedMovie) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedMovie(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMovie, setSelectedMovie]);

  if (!selectedMovie) return null;

  const backdrop = getImageUrl(
    selectedMovie.backdrop_path || selectedMovie.poster_path,
    'original',
  );
  const trailerSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${selectedMovie.title} official trailer`,
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
      onClick={() => setSelectedMovie(null)}
      role="presentation"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#10141e] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-title"
      >
        <button
          type="button"
          onClick={() => setSelectedMovie(null)}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg text-white transition-colors hover:bg-cyan-500 hover:text-black"
          aria-label="Close movie details"
        >
          ✕
        </button>

        <div className="relative h-64 w-full overflow-hidden sm:h-80">
          {backdrop && <img src={backdrop} alt="" className="h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#10141e] via-[#10141e]/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-baseline gap-3">
            <h2 id="movie-title" className="text-2xl font-extrabold text-white sm:text-4xl">
              {selectedMovie.title}
            </h2>
            <span className="font-mono text-sm font-bold text-amber-400">
              ★ {Number(selectedMovie.vote_average || 0).toFixed(1)}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="rounded border border-white/10 px-2 py-0.5">
              {selectedMovie.release_date?.slice(0, 4) || 'Release date unknown'}
            </span>
            {selectedMovie.genre && (
              <span className="font-semibold text-cyan-400">{selectedMovie.genre}</span>
            )}
          </div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-200">
            Overview
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-slate-300 sm:text-base">
            {selectedMovie.overview || 'No overview is available for this title.'}
          </p>

          <a
            href={trailerSearch}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-xl bg-cyan-500 py-3 text-center text-sm font-bold text-black transition-all hover:bg-cyan-400"
          >
            ▶ Find the official trailer
          </a>
        </div>
      </div>
    </div>
  );
}
