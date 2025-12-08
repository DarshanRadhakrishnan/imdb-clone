/**
 * INTEGRATION GUIDE: Cloud Watchlist with MovieCard
 * 
 * This file shows how to integrate the cloud watchlist feature
 * with your existing MovieCard component
 */

// ============================================
// EXAMPLE 1: Simple Integration
// ============================================

/*
// MovieCard.jsx (Updated)
import FavoriteButton from "./FavoriteButton";

function MovieCard({ movie }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition">
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold">{movie.title}</h3>
        <p className="text-gray-400">{movie.release_date?.split('-')[0]}</p>
        
        {/* Add FavoriteButton here */}
        <div className="flex justify-between mt-4">
          <button className="flex-1 bg-purple-600 mr-2">
            ▶ Watch
          </button>
          <FavoriteButton movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
*/

// ============================================
// EXAMPLE 2: With Loading State
// ============================================

/*
import { useContext, useState } from "react";
import FavoriteButton from "./FavoriteButton";
import { AuthContext } from "./AuthContext";

function MovieCard({ movie }) {
  const { user } = useContext(AuthContext);
  const [isWatching, setIsWatching] = useState(false);

  const handleWatch = () => {
    setIsWatching(true);
    // Navigate to video player
    setTimeout(() => setIsWatching(false), 5000);
  };

  return (
    <div className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:opacity-75"
        />
        {user && (
          <button
            onClick={handleWatch}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          >
            <div className="bg-purple-600 rounded-full p-4">
              <span className="text-2xl">▶</span>
            </div>
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0]}</p>
        <p className="text-yellow-400 text-sm mt-2">⭐ {movie.vote_average?.toFixed(1)}/10</p>
        
        <div className="flex gap-2 mt-4">
          <button 
            onClick={handleWatch}
            disabled={isWatching}
            className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 rounded transition"
          >
            {isWatching ? "Loading..." : "▶ Watch"}
          </button>
          {user && <FavoriteButton movie={movie} />}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
*/

// ============================================
// EXAMPLE 3: With Watchlist Badge
// ============================================

/*
import { useContext } from "react";
import FavoriteButton from "./FavoriteButton";
import { AuthContext } from "./AuthContext";

function MovieCard({ movie }) {
  const { userData } = useContext(AuthContext);
  const isInWatchlist = userData?.watchlist?.some(m => m.id === movie.id);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition">
      {isInWatchlist && (
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
          IN WATCHLIST
        </div>
      )}

      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      
      <div className="p-4">
        <h3 className="font-bold">{movie.title}</h3>
        <p className="text-gray-400">{movie.release_date?.split('-')[0]}</p>
        
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-purple-600">▶ Watch</button>
          <FavoriteButton movie={movie} />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
*/

// ============================================
// EXAMPLE 4: Complete Feature-Rich Card
// ============================================

/*
import { useContext, useState } from "react";
import FavoriteButton from "./FavoriteButton";
import { AuthContext } from "./AuthContext";

function MovieCard({ movie, onWatch, onDetails }) {
  const { user, userData, addToHistory } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const isInWatchlist = userData?.watchlist?.some(m => m.id === movie.id);

  const handleWatch = async () => {
    if (user) {
      // Add to history
      await addToHistory({
        id: movie.id,
        title: movie.title,
        year: movie.release_date?.split('-')[0],
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      });
    }
    onWatch?.(movie);
  };

  return (
    <div className="relative group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all hover:scale-105">
      
      {/* Status Badge */}
      {isInWatchlist && (
        <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded text-xs font-bold animate-pulse">
          ❤️ SAVED
        </div>
      )}

      {/* Image with Overlay */}
      <div className="relative overflow-hidden h-64">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
          <button
            onClick={handleWatch}
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{movie.title}</h3>
        
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-400 text-sm">{movie.release_date?.split('-')[0]}</p>
          <p className="text-yellow-400 text-sm font-bold">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>
        </div>

        <p className="text-gray-500 text-xs mt-2 line-clamp-2">
          {movie.overview}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleWatch}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition font-semibold"
          >
            ▶ Play
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
          >
            ℹ️
          </button>
          {user && <FavoriteButton movie={movie} />}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
*/

// ============================================
// FIREBASE DATA PASSED TO FMOVIECARD
// ============================================

/*
// Movie object structure from TMDB API that works with FavoriteButton:

{
  id: 550,
  title: "Fight Club",
  name: "Fight Club",  // For TV shows
  release_date: "1999-10-15",
  first_air_date: "1999-10-15",  // For TV shows
  poster_path: "/pB8BM7pdSp6B6Ih7QSoOAg0CUtO.jpg",
  overview: "An insomniac office worker and a devil-may-care soapmaker...",
  vote_average: 8.8,
  // ... other TMDB fields
}

// FavoriteButton automatically extracts:
// - id (uses as unique key)
// - title or name
// - release_date or first_air_date (extracts year)
// - poster_path (converts to full URL)
*/

// ============================================
// TIPS & BEST PRACTICES
// ============================================

/*
1. Always wrap FavoriteButton in AuthContext provider:
   - Wrap App with <AuthProvider> in main index.js

2. Movie data format:
   - id: must be unique
   - title/name: movie or show name
   - poster_path: relative URL (FavoriteButton converts to full URL)
   - release_date/first_air_date: any date format (extracts year)

3. Error handling:
   - FavoriteButton catches errors and shows toast
   - No need for additional try-catch
   
4. User feedback:
   - Toast notifications appear automatically
   - Heart icon animates on click
   - Loading state during sync
   
5. Cross-device sync:
   - Happens automatically
   - No manual refresh needed
   - Works in real-time when user is online

6. Offline support:
   - Changes queue and sync when online
   - Local state updates immediately
   - No user-facing delays

7. Performance:
   - FavoriteButton is lightweight
   - Memoized for performance
   - Doesn't cause parent re-renders
*/

export default {};
