import { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { user, userData, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  if (!user) {
    return null; // Don't show navbar if not logged in
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🎬 IMDB Clone</h1>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
          >
            {userData?.photoURL && (
              <img
                src={userData.photoURL}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            {!userData?.photoURL && (
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                👤
              </div>
            )}
            <span className="font-semibold">{userData?.displayName || user.email}</span>
            <span className="text-lg">▼</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold">{userData?.displayName || "User"}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <a
                href="#watchlist"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                📽️ Watchlist
              </a>

              <a
                href="#history"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                ⏱️ History
              </a>

              <a
                href="#profile"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                ⚙️ Profile Settings
              </a>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition border-t border-gray-200"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
