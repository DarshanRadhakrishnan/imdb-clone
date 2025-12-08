import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const FavoriteButton = ({ movie }) => {
  const { user, userData, addToWatchlist, removeFromWatchlist } = useContext(AuthContext);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Check if movie is in watchlist
  useEffect(() => {
    if (userData?.watchlist) {
      const exists = userData.watchlist.some((m) => m.id === movie.id);
      setIsInWatchlist(exists);
    }
  }, [userData?.watchlist, movie.id]);

  const handleClick = async () => {
    if (!user) {
      setToastMessage("Please login to add movies to your watchlist");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsLoading(true);
    try {
      if (isInWatchlist) {
        await removeFromWatchlist(movie.id);
        setToastMessage("Removed from Watchlist");
      } else {
        await addToWatchlist({
          id: movie.id,
          title: movie.title || movie.name,
          year: movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0],
          posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "",
        });
        setToastMessage("Added to Watchlist ✓");
      }
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (error) {
      console.error("Error updating watchlist:", error);
      setToastMessage("Error updating watchlist");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`text-red-500 hover:scale-110 transition-transform duration-200 ${isLoading ? "opacity-50" : ""}`}
        title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      >
        {isInWatchlist ? (
          <svg className="w-7 h-7 fill-red-600 animate-pulse" viewBox="0 0 24 24">
            <path d="M12 21s-6.3-4.3-9.3-8.3C-1 8.1 1 3 5.3 3 7.6 3 9.4 4.6 12 7.3 14.6 4.6 16.4 3 18.7 3 23 3 25 8.1 21.3 12.7 18.3 16.7 12 21 12 21z" />
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="none" stroke="red" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3A5.5 5.5 0 002 8.5C2 13.28 7.55 17.36 11 21c3.45-3.64 9-7.72 9-12.5A5.5 5.5 0 0016.5 3z" />
          </svg>
        )}
      </button>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          {toastMessage}
        </div>
      )}
    </>
  );
};

export default FavoriteButton;
