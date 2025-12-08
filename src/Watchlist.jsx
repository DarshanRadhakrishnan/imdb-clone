import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Watchlist() {
  const { user, userData, removeFromWatchlist } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl">Please log in to view your watchlist</p>
      </div>
    );
  }

  const watchlist = userData?.watchlist || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">📽️ My Watchlist</h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">Your watchlist is empty</p>
            <p className="text-gray-500">Add movies to keep track of what you want to watch</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {movie.posterUrl && (
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-2 truncate">{movie.title}</h2>
                  <p className="text-gray-400 text-sm mb-4">{movie.year}</p>
                  <button
                    onClick={() => removeFromWatchlist(movie.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
