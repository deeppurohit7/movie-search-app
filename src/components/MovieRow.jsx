import { useRef } from 'react';
import { useMovies } from '../context/useMovies';
import { getImageUrl } from '../services/api';

export default function MovieRow({ title, movies, id, layout = 'carousel' }) {
  const rowRef = useRef(null);
  const { setSelectedMovie } = useMovies();

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!movies?.length) return null;

  return (
    <section id={id} className="py-6 px-4 sm:px-12 relative group">
      {title && (
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight text-white">
          <span className="h-4 w-1.5 rounded-full bg-cyan-500" />
          {title}
        </h2>
      )}

      {layout === 'carousel' && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white opacity-0 shadow-xl transition-opacity hover:border-cyan-500 hover:bg-cyan-500 hover:text-black group-hover:opacity-100"
          aria-label="Scroll left"
        >
          ❮
        </button>
      )}

      <div
        ref={rowRef}
        className={layout === 'grid'
          ? 'grid grid-cols-2 gap-4 py-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
          : 'no-scrollbar flex items-center gap-4 overflow-x-auto scroll-smooth py-2'}
      >
        {movies.map((movie) => {
          const poster = getImageUrl(movie.poster_path);

          return (
            <button
              key={movie.id}
              type="button"
              onClick={() => setSelectedMovie(movie)}
              className={layout === 'grid'
                ? 'group/card min-w-0 cursor-pointer text-left'
                : 'group/card w-40 flex-shrink-0 cursor-pointer text-left sm:w-48'}
            >
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-white/5 bg-[#121722] transition-all duration-300 group-hover/card:scale-105 group-hover/card:border-cyan-500/50 group-hover/card:shadow-xl group-hover/card:shadow-cyan-500/10">
                {poster ? (
                  <img
                    src={poster}
                    alt={`${movie.title} poster`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-4 text-center text-sm text-slate-500">
                    Poster unavailable
                  </div>
                )}
                <span className="absolute right-2 top-2 rounded border border-white/10 bg-black/80 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-400 backdrop-blur-md">
                  ★ {Number(movie.vote_average).toFixed(1)}
                </span>
              </div>

              <div className="mt-2.5">
                <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover/card:text-cyan-400">
                  {movie.title}
                </h3>
                <span className="font-mono text-xs text-slate-400">
                  {movie.release_date?.slice(0, 4) || 'Cinema'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {layout === 'carousel' && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white opacity-0 shadow-xl transition-opacity hover:border-cyan-500 hover:bg-cyan-500 hover:text-black group-hover:opacity-100"
          aria-label="Scroll right"
        >
          ❯
        </button>
      )}
    </section>
  );
}