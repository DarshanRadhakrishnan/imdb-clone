import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

/**
 * Display information about watchlist syncing across devices
 */
const SyncInfo = () => {
  const { user, userData, loading } = useContext(AuthContext);

  if (!user || loading) return null;

  const watchlist = userData?.watchlist || [];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7.5-1.5A9 9 0 1112 3a9 9 0 009.5 8.5z" />
        </svg>
        <h3 className="font-bold text-lg">Cloud Sync Active</h3>
      </div>

      <p className="text-sm mb-3">Your watchlist is automatically synced across all your devices:</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white bg-opacity-10 rounded p-3">
          <p className="text-xs text-gray-200">Watchlist Items</p>
          <p className="text-2xl font-bold">{watchlist.length}</p>
        </div>
        <div className="bg-white bg-opacity-10 rounded p-3">
          <p className="text-xs text-gray-200">Synced Devices</p>
          <p className="text-2xl font-bold">∞</p>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-200 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Last updated: {new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default SyncInfo;
