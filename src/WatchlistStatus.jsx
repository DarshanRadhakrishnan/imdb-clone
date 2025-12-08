import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Shows watchlist statistics and sync status
 * Displays in navbar or dashboard
 */
const WatchlistStatus = () => {
  const { user, userData, loading } = useContext(AuthContext);
  const [lastSync, setLastSync] = useState(null);

  useEffect(() => {
    if (!loading && userData) {
      setLastSync(new Date().toLocaleTimeString());
    }
  }, [userData, loading]);

  if (!user || loading) {
    return null;
  }

  const watchlistCount = userData?.watchlist?.length || 0;

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21s-6.3-4.3-9.3-8.3C-1 8.1 1 3 5.3 3 7.6 3 9.4 4.6 12 7.3 14.6 4.6 16.4 3 18.7 3 23 3 25 8.1 21.3 12.7 18.3 16.7 12 21 12 21z" />
        </svg>
        <span className="font-semibold text-white">{watchlistCount}</span>
        <span className="text-gray-400">Saved</span>
      </div>

      {lastSync && (
        <div className="text-gray-500 text-xs">
          Synced: {lastSync}
        </div>
      )}

      <div className="animate-pulse">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
        <span className="text-gray-500 ml-1">Online</span>
      </div>
    </div>
  );
};

export default WatchlistStatus;
