# CineWave

CineWave is a responsive movie discovery app built with React and Vite. It includes a featured title slider, movie carousels, live search, and a detail modal.

## Getting started

```sh
npm install
npm run dev
```

The app works immediately with its built-in studio demo catalog. To use live TMDB data, select **TMDB Key** in the navigation bar and enter a TMDB API key. The key is saved in this browser's local storage; leave the prompt blank to return to the demo catalog.

You can also configure a key through a `VITE_TMDB_API_KEY` environment variable. Restart the Vite dev server after changing environment variables.

## Build and preview

```sh
npm run build
npm run preview
```

## Deployment

Deploy the generated `dist` directory to any static hosting provider that supports single-page applications. Configure `VITE_TMDB_API_KEY` in the provider's build environment if you want a shared live-data key. Since TMDB requests are made from the browser, any configured key is visible to site visitors; use a key appropriate for client-side use and follow TMDB's attribution and usage requirements.


# CineWave — Modern React & Tailwind Cinema Hub

A responsive streaming platform interface and movie discovery portal built with React 18, Tailwind CSS, Context API, and The Movie Database (TMDB) API.

## Live Demo
- **Live Site:** `https://deeppurohit7.github.io/movie-search-app/`
- **Source Code:** `https://github.com/deeppurohit7/movie-search-app`

## Key Engineering Features
- **Auto-Advancing Hero Slider:** Automated carousel cycling through trending titles with background image crossfades.
- **Horizontal Scroll Rows:** Netflix-style smooth-scroll carousels with arrow controls.
- **Context API Architecture:** Centralized data sharing across components without prop drilling.
- **Cinematic Detail Modal:** Modal sheet with backdrop imagery, IMDb ratings, and synopsis.
- **Zero-Dependency Styling:** Styled using modern utility-first Tailwind CSS.

## Author
- **Deep Purohit** (Junagadh / Ahmedabad, Gujarat, India)