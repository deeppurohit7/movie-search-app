import { useCallback, useEffect, useMemo, useState } from 'react';
import MovieContext from './contextValue';
import { demoCatalog, fetchCatalog, searchMovies as searchTmdbMovies } from '../services/api';

function getInitialApiKey() {
  return localStorage.getItem('tmdbApiKey') || import.meta.env.VITE_TMDB_API_KEY || '';
}

function findDemoResults(query, catalog) {
  const normalizedQuery = query.trim().toLowerCase();
  const movies = [...catalog.trending, ...catalog.popular, ...catalog.topRated];

  return movies.filter((movie, index, allMovies) => (
    movie.title?.toLowerCase().includes(normalizedQuery)
    && allMovies.findIndex((candidate) => candidate.id === movie.id) === index
  ));
}

export default function MovieProvider({ children }) {
  const [apiKey, setApiKey] = useState(getInitialApiKey);
  const [catalog, setCatalog] = useState(demoCatalog);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState({ query: '', results: [] });
  const [isLoading, setIsLoading] = useState(() => Boolean(getInitialApiKey()));
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    if (!apiKey) return undefined;

    const controller = new AbortController();

    fetchCatalog(apiKey, controller.signal)
      .then((nextCatalog) => setCatalog(nextCatalog))
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') {
          setCatalog(demoCatalog);
          setError(`${loadError.message}. Showing the studio demo catalog instead.`);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [apiKey]);

  useEffect(() => {
    const query = searchQuery.trim();
    if (!query || !apiKey) return undefined;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      searchTmdbMovies(query, apiKey, controller.signal)
        .then((results) => setSearchData({ query, results }))
        .catch((searchLoadError) => {
          if (searchLoadError.name !== 'AbortError') {
            setSearchData({ query, results: [] });
            setSearchError(searchLoadError.message);
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsSearchLoading(false);
        });
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchQuery, apiKey]);

  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
    setIsSearchLoading(Boolean(apiKey && query.trim()));
    setSearchError('');
  }, [apiKey]);

  const saveApiKey = useCallback((key) => {
    const normalizedKey = key.trim();
    if (normalizedKey) {
      localStorage.setItem('tmdbApiKey', normalizedKey);
    } else {
      localStorage.removeItem('tmdbApiKey');
      setCatalog(demoCatalog);
    }
    setApiKey(normalizedKey);
    setIsLoading(Boolean(normalizedKey));
    setIsSearchLoading(Boolean(normalizedKey && searchQuery.trim()));
    setError('');
    setSearchError('');
  }, [searchQuery]);

  const trimmedQuery = searchQuery.trim();
  const searchResults = useMemo(() => {
    if (!trimmedQuery) return null;
    if (!apiKey) return findDemoResults(trimmedQuery, catalog);
    return searchData.query === trimmedQuery ? searchData.results : [];
  }, [trimmedQuery, apiKey, searchData, catalog]);

  const value = useMemo(() => ({
    ...catalog,
    selectedMovie,
    setSelectedMovie,
    searchQuery,
    setSearchQuery: updateSearchQuery,
    searchResults,
    isLoading,
    isSearchLoading,
    error,
    searchError,
    apiKey,
    saveApiKey,
  }), [
    catalog,
    selectedMovie,
    searchQuery,
    updateSearchQuery,
    searchResults,
    isLoading,
    isSearchLoading,
    error,
    searchError,
    apiKey,
    saveApiKey,
  ]);

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
