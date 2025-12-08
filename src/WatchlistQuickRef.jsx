import React from "react";

/**
 * Quick Reference Component
 * Shows code snippets and usage patterns for the cloud watchlist system
 */
const WatchlistQuickRef = () => {
  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">🎬 Cloud Watchlist - Quick Reference</h2>

      {/* Usage Pattern 1 */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">1. Add FavoriteButton to Movie Components</h3>
        <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
{`import FavoriteButton from "./FavoriteButton";

function MovieCard({ movie }) {
  return (
    <div>
      <img src={movie.posterUrl} />
      <h3>{movie.title}</h3>
      <FavoriteButton movie={movie} />
    </div>
  );
}`}
        </pre>
      </div>

      {/* Usage Pattern 2 */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">2. Access Watchlist in Components</h3>
        <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
{`import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function MyComponent() {
  const { user, userData, addToWatchlist } = useContext(AuthContext);

  // watchlist data
  console.log(userData?.watchlist);

  // add movie
  await addToWatchlist({
    id: "123",
    title: "Inception",
    year: "2010",
    posterUrl: "url"
  });
}`}
        </pre>
      </div>

      {/* Usage Pattern 3 */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">3. Check if Movie is Favorited</h3>
        <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
{`const { userData } = useContext(AuthContext);

const isInWatchlist = userData?.watchlist?.some(
  m => m.id === movieId
);

if (isInWatchlist) {
  // Show "Remove from Watchlist"
} else {
  // Show "Add to Watchlist"
}`}
        </pre>
      </div>

      {/* Features */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">✨ Key Features</h3>
        <ul className="space-y-2">
          <li>✅ Cloud storage with Firebase Firestore</li>
          <li>✅ Real-time sync across all devices</li>
          <li>✅ Toast notifications on actions</li>
          <li>✅ Auto-sync on login</li>
          <li>✅ Beautiful UI with animations</li>
          <li>✅ Error handling & offline support</li>
        </ul>
      </div>

      {/* Components */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">📁 Files Created</h3>
        <ul className="space-y-2 text-sm">
          <li>📝 FavoriteButton.jsx - Cloud-enabled button</li>
          <li>📝 Favorites.jsx - Watchlist page</li>
          <li>📝 favorites.js - Firebase helper functions</li>
          <li>📝 WatchlistStatus.jsx - Status indicator</li>
          <li>📝 SyncInfo.jsx - Sync information display</li>
        </ul>
      </div>

      {/* Toast Messages */}
      <div className="mb-8 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">💬 Toast Messages</h3>
        <div className="space-y-2">
          <div className="bg-green-600 bg-opacity-20 p-2 rounded">✓ Added to Watchlist ✓</div>
          <div className="bg-red-600 bg-opacity-20 p-2 rounded">✗ Removed from Watchlist</div>
          <div className="bg-blue-600 bg-opacity-20 p-2 rounded">ℹ Please login to add movies</div>
          <div className="bg-yellow-600 bg-opacity-20 p-2 rounded">⚠ Error updating watchlist</div>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">🔄 Data Flow</h3>
        <pre className="bg-black p-4 rounded text-sm">
{`User Interaction
    ↓
FavoriteButton.click()
    ↓
AuthContext.addToWatchlist()
    ↓
Firebase Firestore Update
    ↓
AuthContext updates userData
    ↓
All components re-render
    ↓
Toast notification shows
    ↓
Other devices sync automatically`}
        </pre>
      </div>
    </div>
  );
};

export default WatchlistQuickRef;
