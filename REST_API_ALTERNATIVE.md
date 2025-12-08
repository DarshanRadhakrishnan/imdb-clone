/**
 * Optional REST API Alternative
 * 
 * If you prefer REST API instead of Firebase Firestore,
 * here's a template to replace Firebase operations with REST API calls
 * 
 * Setup:
 * 1. Create a backend (Node.js, Python, etc.)
 * 2. Create endpoints below
 * 3. Replace Firebase calls with API calls
 * 4. Uncomment the apiWatchlist functions
 */

// ============================================
// REST API CONFIGURATION
// ============================================

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// ============================================
// REST API ENDPOINTS (for your backend)
// ============================================

/*
Backend Endpoints to create:

POST /api/watchlist/add
  Request: { movieId, title, year, posterUrl }
  Response: { success: true, watchlist: [...] }
  Headers: Authorization: Bearer {token}

DELETE /api/watchlist/remove/:movieId
  Response: { success: true, watchlist: [...] }
  Headers: Authorization: Bearer {token}

GET /api/watchlist
  Response: { watchlist: [...] }
  Headers: Authorization: Bearer {token}

GET /api/watchlist/:movieId
  Response: { isInWatchlist: true/false }
  Headers: Authorization: Bearer {token}
*/

// ============================================
// REST API FUNCTIONS (Optional Alternative)
// ============================================

/**
 * REST API version: Add to watchlist
 * Uncomment to use instead of Firebase
 */
export const addToWatchlistAPI = async (token, movieData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/watchlist/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movieData),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.watchlist;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

/**
 * REST API version: Remove from watchlist
 */
export const removeFromWatchlistAPI = async (token, movieId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/watchlist/remove/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.watchlist;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
};

/**
 * REST API version: Get watchlist
 */
export const getWatchlistAPI = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/watchlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.watchlist || [];
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
};

/**
 * REST API version: Check if movie is in watchlist
 */
export const isInWatchlistAPI = async (token, movieId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/watchlist/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.isInWatchlist;
  } catch (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }
};

// ============================================
// BACKEND EXAMPLE (Node.js/Express)
// ============================================

/*
// routes/watchlist.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// GET /api/watchlist - Get user's watchlist
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    res.json({ watchlist: user.watchlist || [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/watchlist/add - Add to watchlist
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { id, title, year, posterUrl } = req.body;

    const user = await User.findById(userId);
    
    // Check if already exists
    const exists = user.watchlist.some(m => m.id === id);
    if (exists) {
      return res.json({ watchlist: user.watchlist });
    }

    user.watchlist.push({ id, title, year, posterUrl });
    await user.save();

    res.json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/watchlist/remove/:movieId - Remove from watchlist
router.delete('/remove/:movieId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);
    user.watchlist = user.watchlist.filter(m => m.id !== movieId);
    await user.save();

    res.json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/watchlist/:movieId - Check if in watchlist
router.get('/:movieId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);
    const isInWatchlist = user.watchlist.some(m => m.id === movieId);

    res.json({ isInWatchlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
*/

// ============================================
// COMPARISON: Firebase vs REST API
// ============================================

/*
FIREBASE (Current Implementation)
  Pros:
    ✅ Zero backend setup needed
    ✅ Real-time syncing out of the box
    ✅ Automatic scaling
    ✅ Secure by default
    ✅ Easy authentication
    ✅ Cloud-hosted (no server maintenance)
  
  Cons:
    ❌ Limited control
    ❌ Vendor lock-in
    ❌ Google-only authentication
    ❌ Pricing can increase with scale

REST API (Optional)
  Pros:
    ✅ Full control
    ✅ Custom logic on backend
    ✅ Can use any authentication
    ✅ Can integrate with existing systems
    ✅ Database agnostic
  
  Cons:
    ❌ Requires backend setup
    ❌ Manual real-time implementation (WebSocket)
    ❌ Server maintenance needed
    ❌ Higher initial complexity
    ❌ Need to handle scaling yourself

Recommendation:
  - Use Firebase for quick MVP (current)
  - Switch to REST API if need full control
  - Can run both in parallel during migration
*/

// ============================================
// MIGRATION PATH: Firebase → REST API
// ============================================

/*
If you want to migrate from Firebase to REST API:

Step 1: Keep current AuthContext structure
  - Keep user state management
  - Keep localStorage backup

Step 2: Create API wrapper layer
  - Replace Firebase calls with API calls
  - Update error handling
  - Add retry logic

Step 3: Test with both in parallel
  - Run Firebase and API side-by-side
  - Verify data consistency
  - Test error scenarios

Step 4: Switch to API
  - Remove Firebase calls
  - Keep backup tokens
  - Monitor for issues

Step 5: Deprecate Firebase
  - Keep Firebase running as backup
  - Gradually reduce Firebase usage
  - Eventually turn off Firebase

Code changes needed (minimal):
  - In favorites.js: Replace Firebase imports
  - In AuthContext.js: Replace Firebase calls
  - In .env: Add API_URL instead of Firebase config
  - Components: No changes needed!
*/

// ============================================
// EXAMPLE: Hybrid Approach
// ============================================

/*
Use both Firebase and API:

// firebase.js
export const addToWatchlist = async (userId, movieData, token) => {
  try {
    // Try API first (primary)
    return await addToWatchlistAPI(token, movieData);
  } catch (apiError) {
    // Fallback to Firebase
    console.log("API failed, using Firebase:", apiError);
    try {
      return await addToWatchlistFirebase(userId, movieData);
    } catch (firebaseError) {
      // Both failed
      throw new Error("Could not sync watchlist");
    }
  }
};

This way:
  ✅ Switching between services is transparent
  ✅ Graceful fallback if one fails
  ✅ Can migrate gradually
  ✅ Zero component changes
*/

// ============================================
// ENVIRONMENT VARIABLES
// ============================================

/*
For REST API, add to .env:

# Firebase (if keeping as backup)
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...

# REST API
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=30000

For production:
REACT_APP_API_URL=https://api.example.com/api
*/

// ============================================
// AUTHENTICATION TOKEN FLOW
// ============================================

/*
REST API with JWT:

1. User logs in (Firebase Auth or custom)
2. Get JWT token from backend
3. Store token in memory (not localStorage for security)
4. Include token in all API requests
5. Backend verifies token

// Get token from Firebase Auth
const token = await user.getIdToken();

// Or from custom login endpoint
const response = await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
const { token } = await response.json();

// Use in requests
fetch('/api/watchlist', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
*/

// ============================================
// WEBSOCKET FOR REAL-TIME (Optional)
// ============================================

/*
For real-time sync with REST API, use WebSocket:

// websocket.js
class WatchlistSocket {
  constructor(token) {
    this.socket = new WebSocket(
      `wss://api.example.com/watchlist?token=${token}`
    );
    
    this.socket.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      
      if (type === 'watchlist_updated') {
        // Update UI with new watchlist
        this.onUpdate(data);
      }
    };
  }
  
  send(action) {
    this.socket.send(JSON.stringify(action));
  }
}

// Usage in AuthContext
useEffect(() => {
  if (user && token) {
    const socket = new WatchlistSocket(token);
    socket.onUpdate = (newWatchlist) => {
      setUserData(prev => ({
        ...prev,
        watchlist: newWatchlist
      }));
    };
  }
}, [user, token]);
*/

export {};
