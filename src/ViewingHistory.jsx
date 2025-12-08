import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function ViewingHistory() {
  const { user, userData } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-2xl">Please log in to view your history</p>
      </div>
    );
  }

  const history = userData?.history || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">⏱️ Viewing History</h1>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">No viewing history yet</p>
            <p className="text-gray-500">Start watching movies to build your history</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((movie, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-700 transition"
              >
                {movie.posterUrl && (
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{movie.title}</h3>
                  <p className="text-gray-400 text-sm">{movie.year}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Viewed: {formatDate(movie.viewedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
