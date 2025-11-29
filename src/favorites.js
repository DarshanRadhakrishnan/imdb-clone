const FAVORITES_KEY = "favorite_movies";

export const getFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveFavorites = (movies) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(movies));
};

export const toggleFavorite = (movie) => {
  const favorites = getFavorites();
  const exists = favorites.find((m) => m.id === movie.id);

  let updated;
  if (exists) {
    // Remove
    updated = favorites.filter((m) => m.id !== movie.id);
  } else {
    // Add
    updated = [...favorites, movie];
  }

  saveFavorites(updated);
  return updated;
};

export const isFavorite = (movieId) => {
  return getFavorites().some((m) => m.id === movieId);
};
