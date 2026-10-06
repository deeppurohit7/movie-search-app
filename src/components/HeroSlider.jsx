import { useEffect, useState } from 'react';
import { useMovies } from '../context/useMovies';
import { getImageUrl } from '../services/api';

export default function HeroSlider() {
  const { trending, setSelectedMovie } = useMovies();
  const featured = trending.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (featured.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % featured.length);
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, [featured.length]);

  const currentIndex = featured.length ? activeIndex % featured.length : 0;
  const movie = featured[currentIndex];

  if (!movie) {
    return (
      <div className="h-[30rem] bg-gradient-to-br from-[#101827] via-[#080b12] to-black" />
    );
  }

  const backdrop = getImageUrl(movie.backdrop_path || movie.poster_path, 'original');

  return (
    <section className="relative flex min-h-[34rem] items-end overflow-hidden bg-[#080b12] pt-20 sm:min-h-[42rem]">
      {backdrop && (
        <img
          key={backdrop}
          src={backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080b] via-[#07080b]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-transparent to-black/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 sm:px-12 sm:pb-28">
        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          Featured this week
        </p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          {movie.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-slate-300">
          <span className="font-semibold text-amber-400">
            ★ {Number(movie.vote_average || 0).toFixed(1)}
          </span>
          <span>{movie.release_date?.slice(0, 4) || 'Coming soon'}</span>
          <span className="rounded border border-white/20 px-2 py-0.5 text-xs">HD</span>
        </div>
        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
          {movie.overview || 'Discover the stories everyone is talking about.'}
        </p>
        <button
          type="button"
          onClick={() => setSelectedMovie(movie)}
          className="mt-7 rounded-lg bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Explore film
        </button>

        {featured.length > 1 && (
          <div className="mt-10 flex gap-2" aria-label="Featured titles">
            {featured.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.title}`}
                aria-current={index === currentIndex ? 'true' : undefined}
                className={`h-1 rounded-full transition-all ${
                  index === currentIndex ? 'w-10 bg-cyan-400' : 'w-5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
