import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import MovieRow from './components/MovieRow';
import MovieModal from './components/MovieModal';
import MovieProvider from './context/MovieContext.jsx';
import { useMovies } from './context/useMovies';

function MainCatalog() {
  const {
    trending,
    popular,
    topRated,
    searchQuery,
    searchResults,
    isLoading,
    isSearchLoading,
    error,
    searchError,
  } = useMovies();

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      {error && (
        <div role="status" className="mx-auto max-w-7xl px-4 pt-20 text-sm text-amber-300 sm:px-12">
          {error}
        </div>
      )}

      {searchQuery.trim() ? (
        <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-12">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Search results for <span className="text-cyan-400">“{searchQuery}”</span>
          </h2>
          {searchError && (
            <p role="alert" className="mb-5 text-sm text-rose-300">{searchError}</p>
          )}
          {isSearchLoading ? (
            <p className="py-20 text-center text-slate-400">Searching the catalog…</p>
          ) : searchResults?.length ? (
            <MovieRow title="" movies={searchResults} layout="grid" />
          ) : (
            <div className="py-20 text-center text-slate-400">
              <span className="text-4xl block mb-2">🎬</span>
              {searchError ? 'Search is unavailable right now.' : 'No titles found. Try another search.'}
            </div>
          )}
        </div>
      ) : (
        <>
          <HeroSlider />
          {isLoading && (
            <p className="relative z-20 px-6 py-8 text-sm text-slate-400 sm:px-12">
              Loading films…
            </p>
          )}
          <div className="relative z-20 -mt-12 space-y-2">
            <MovieRow id="trending" title="Trending This Week" movies={trending} />
            <MovieRow id="popular" title="Popular Blockbusters" movies={popular} />
            <MovieRow id="top-rated" title="Top Rated Masterpieces" movies={topRated} />
          </div>
        </>
      )}

      <MovieModal />
    </div>
  );
}

export default function App() {
  return (
    <MovieProvider>
      <MainCatalog />
    </MovieProvider>
  );
}