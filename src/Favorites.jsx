import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Favorites = () => {
  const { user, userData, loading } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <p className="text-2xl mb-4">Please log in to view your watchlist</p>
          <p className="text-gray-400">Your watchlist will sync across all your devices</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const watchlist = userData?.watchlist || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">❤️ My Watchlist</h1>
          <p className="text-gray-400">Cloud synced across all your devices</p>
          <p className="text-gray-500 text-sm mt-2">{watchlist.length} movies in your watchlist</p>
        </div>

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
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:scale-105 transition-all"
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
                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition">
                      ▶ Play
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition">
                      👁 Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
