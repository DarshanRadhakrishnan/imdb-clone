// Legacy localStorage functions - kept for backward compatibility
// New functionality uses Firebase through AuthContext

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

// NEW: Firebase-based watchlist functions
import { db, auth } from "./firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";

/**
 * Add movie to user's watchlist in Firebase
 * @param {string} userId - Firebase user ID
 * @param {object} movie - Movie object with id, title, year, posterUrl
 */
export const addToWatchlistFirebase = async (userId, movie) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      watchlist: arrayUnion(movie),
    });
    return true;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

/**
 * Remove movie from user's watchlist in Firebase
 * @param {string} userId - Firebase user ID
 * @param {string} movieId - Movie ID to remove
 */
export const removeFromWatchlistFirebase = async (userId, movieId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const watchlist = userDoc.data().watchlist || [];
    const movieToRemove = watchlist.find((m) => m.id === movieId);

    if (movieToRemove) {
      await updateDoc(userRef, {
        watchlist: arrayRemove(movieToRemove),
      });
    }
    return true;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
};

/**
 * Check if movie is in user's watchlist
 * @param {string} userId - Firebase user ID
 * @param {string} movieId - Movie ID to check
 */
export const isInWatchlistFirebase = async (userId, movieId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const watchlist = userDoc.data().watchlist || [];
    return watchlist.some((m) => m.id === movieId);
  } catch (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }
};

/**
 * Get user's watchlist from Firebase
 * @param {string} userId - Firebase user ID
 */
export const getWatchlistFirebase = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return userDoc.data().watchlist || [];
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
};
};
