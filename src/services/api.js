import { initialMovies } from '../data/mockMovies';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const DEMO_MOVIES = initialMovies.map((movie) => ({
  id: movie.imdbID,
  title: movie.Title,
  release_date: `${movie.Year}-01-01`,
  poster_path: movie.Poster,
  backdrop_path: movie.Poster,
  vote_average: Number(movie.imdbRating),
  overview: movie.Plot,
  genre: movie.Genre,
}));

export const demoCatalog = {
  trending: DEMO_MOVIES,
  popular: [...DEMO_MOVIES].reverse(),
  topRated: [...DEMO_MOVIES].sort((first, second) => second.vote_average - first.vote_average),
};

export function getImageUrl(path, size = 'w500') {
  if (!path) return '';
  return path.startsWith('http') ? path : `https://image.tmdb.org/t/p/${size}${path}`;
}

async function request(endpoint, apiKey, signal, params = {}) {
  const searchParams = new URLSearchParams({ api_key: apiKey, ...params });
  const response = await fetch(`${API_BASE_URL}${endpoint}?${searchParams}`, { signal });

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  const data = await response.json();
  return data.results || [];
}

export async function fetchCatalog(apiKey, signal) {
  const [trending, popular, topRated] = await Promise.all([
    request('/trending/movie/week', apiKey, signal),
    request('/movie/popular', apiKey, signal),
    request('/movie/top_rated', apiKey, signal),
  ]);

  return { trending, popular, topRated };
}

export function searchMovies(query, apiKey, signal) {
  return request('/search/movie', apiKey, signal, { query });
}
