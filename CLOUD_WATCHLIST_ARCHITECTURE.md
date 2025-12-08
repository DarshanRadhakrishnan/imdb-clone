/**
 * CLOUD WATCHLIST ARCHITECTURE GUIDE
 * 
 * This file documents the complete architecture and data flow
 * of the cloud-based watchlist system
 */

// ============================================
// SYSTEM ARCHITECTURE
// ============================================

/*
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │   Movie Card     │  │   Favorites      │  │    Navbar    │  │
│  │  with Heart      │  │    Page          │  │              │  │
│  │  FavoriteButton  │  │                  │  │ WatchlistStat│  │
│  └────────┬─────────┘  └──────────────────┘  └──────────────┘  │
└───────────┼──────────────────────────────────────────────────────┘
            │
            │ User Click (Add/Remove)
            ▼
┌─────────────────────────────────────────────────────────────────┐
│              REACT COMPONENTS (src/)                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          FavoriteButton.jsx                              │  │
│  │  • Detects click                                         │  │
│  │  • Shows loading state                                   │  │
│  │  • Checks authentication                                 │  │
│  │  • Displays toast notifications                          │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                        │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │          AuthContext.js                                  │  │
│  │  • Manages user auth state                               │  │
│  │  • Manages watchlist data (userData.watchlist)           │  │
│  │  • Provides addToWatchlist() method                       │  │
│  │  • Provides removeFromWatchlist() method                  │  │
│  │  • Real-time listener for Firestore changes              │  │
│  └──────────────────────┬───────────────────────────────────┘  │
└────────────────────────┼──────────────────────────────────────┘
                         │
                         │ Firebase API Calls
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│            FIREBASE SERVICES                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          firebase.js                                     │  │
│  │  • Initialize Firebase App                               │  │
│  │  • Configure Firestore (db)                              │  │
│  │  • Configure Auth (auth)                                 │  │
│  └──────────────────────┬───────────────────────────────────┘  │
│                         │                                        │
│  ┌──────────────────────▼───────────────────────────────────┐  │
│  │          Firebase Firestore (Cloud)                      │  │
│  │                                                           │  │
│  │  Collection: users                                       │  │
│  │    Document: {userId}                                    │  │
│  │      watchlist: [                                        │  │
│  │        { id, title, year, posterUrl },                  │  │
│  │        { id, title, year, posterUrl }                   │  │
│  │      ]                                                   │  │
│  │      history: [...]                                      │  │
│  │      email, displayName, photoURL                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Firebase Authentication                          │  │
│  │  • Email/Password auth                                   │  │
│  │  • Session management                                    │  │
│  │  • User verification                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

Sync Direction:
  Device A <─────▶ Firebase Cloud ◀─────▶ Device B
  (Instant sync across devices)
*/

// ============================================
// DATA FLOW SEQUENCE
// ============================================

/*
SCENARIO: User adds movie to watchlist

1. USER ACTION
   └─▶ Click ❤️ heart icon on movie card

2. FABORITE BUTTON
   ├─▶ Check if user is logged in
   ├─▶ If not: Show toast "Please login..."
   └─▶ If yes: Proceed to step 3

3. AUTH CONTEXT CALLED
   ├─▶ addToWatchlist(movieData)
   ├─▶ Validate movie object
   └─▶ Call Firebase Firestore

4. FIREBASE FIRESTORE
   ├─▶ Update users/{userId}/watchlist
   ├─▶ Add movie object to array
   ├─▶ Confirm success
   └─▶ Trigger real-time listeners

5. AUTH CONTEXT LISTENER
   ├─▶ Receive Firestore update
   ├─▶ Update userData.watchlist
   └─▶ Trigger re-renders

6. COMPONENT UPDATES
   ├─▶ FavoriteButton: Heart turns red
   ├─▶ Favorites page: Movie appears
   ├─▶ WatchlistStatus: Count increments
   └─▶ Other components: Show update

7. USER FEEDBACK
   ├─▶ Toast: "Added to Watchlist ✓"
   ├─▶ Heart animates
   ├─▶ Watchlist badge appears
   └─▶ Notification auto-dismisses

8. CLOUD SYNC
   └─▶ Other devices logged in as user:
       ├─▶ Receive real-time update
       ├─▶ watchlist auto-updates
       ├─▶ Show movie in their watchlist
       └─▶ No manual refresh needed
*/

// ============================================
// COMPONENT RELATIONSHIPS
// ============================================

/*
App (root)
├─ AuthProvider
│  ├─ Navbar
│  │  ├─ WatchlistStatus (shows count & sync)
│  │  └─ User dropdown menu
│  │
│  ├─ MovieSearch / MovieCard pages
│  │  └─ MovieCard
│  │     └─ FavoriteButton ◀─ Syncs watchlist here!
│  │
│  ├─ Favorites (Watchlist Page)
│  │  ├─ SyncInfo (shows sync details)
│  │  └─ Movie list from userData.watchlist
│  │
│  └─ ViewingHistory
│     └─ History items from userData.history

All components share state via AuthContext:
  const { userData, addToWatchlist, ... } = useContext(AuthContext)
*/

// ============================================
// STATE MANAGEMENT FLOW
// ============================================

/*
Redux-like flow with Context API:

┌──────────────────┐
│   User Action    │
│   Click heart    │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│  FavoriteButton dispatches   │
│  addToWatchlist action       │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  AuthContext updates state   │
│  - userData.watchlist        │
│  - triggers listeners        │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Firebase updates           │
│  - Firestore collection     │
│  - Real-time listeners      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  All subscribed components   │
│  - FavoriteButton (re-render)│
│  - Favorites page (list)     │
│  - WatchlistStatus (count)   │
│  - Other devices (sync)      │
└──────────────────────────────┘
*/

// ============================================
// FIREBASE OPERATIONS
// ============================================

/*
Operation: Add to Watchlist

  setDoc(doc(db, 'users', userId), {
    watchlist: arrayUnion({
      id: '550',
      title: 'Fight Club',
      year: '1999',
      posterUrl: 'https://...'
    })
  }, { merge: true })

Operation: Remove from Watchlist

  setDoc(doc(db, 'users', userId), {
    watchlist: arrayRemove(movieObject)
  }, { merge: true })

Operation: Listen to Changes

  onSnapshot(doc(db, 'users', userId), (doc) => {
    const watchlist = doc.data().watchlist
    // Update UI
  })

Operation: Get Current Watchlist

  const doc = await getDoc(doc(db, 'users', userId))
  const watchlist = doc.data().watchlist || []
*/

// ============================================
// ERROR HANDLING & RETRY LOGIC
// ============================================

/*
Try-Catch Flow:

try {
  1. Call Firebase operation
  2. Wait for response
  3. Update local state
  4. Show success toast
}
catch (error) {
  1. Log error to console
  2. Identify error type:
     - Network: "No internet connection"
     - Auth: "You must be logged in"
     - Permission: "Access denied"
     - Other: "Error updating watchlist"
  3. Show error toast
  4. Optional: Retry logic
}
finally {
  1. Hide loading state
  2. Re-enable button
}

Offline Support:
  - Firebase SDK queues operations
  - Auto-retries when online
  - No manual retry needed
  - User sees eventual consistency
*/

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

/*
1. Real-Time Listeners
   - Firestore listener on mounted
   - Auto-unsubscribe on unmounted
   - Batch updates to prevent re-renders

2. Lazy Loading
   - Load only when user logs in
   - Watch list loaded once per session
   - Re-fetch on tab focus

3. Caching
   - Context holds data in memory
   - No repeated fetches
   - Update on mutations

4. Debouncing
   - Toast notifications debounced
   - Prevents spam
   - 2-3 second auto-dismiss

5. Code Splitting
   - AuthContext in separate file
   - Firebase initialized once
   - Firebase functions in favorites.js
*/

// ============================================
// SECURITY ARCHITECTURE
// ============================================

/*
Layer 1: Frontend
  - User logs in via Firebase Auth
  - JWT token stored in browser
  - Token included in Firebase requests

Layer 2: Firebase Auth
  - Verifies email/password
  - Generates and validates JWT
  - Handles session management
  - Enforces auth state

Layer 3: Firestore Rules
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId} {
        // Only authenticated user can access own data
        allow read, write: if request.auth.uid == userId;
      }
    }
  }

Layer 4: Data Isolation
  - Each user has separate document
  - No cross-user data access
  - Firestore enforces at database level
  - No data leaks possible

Layer 5: Encryption
  - Data encrypted in transit (HTTPS)
  - Data encrypted at rest (Firebase)
  - TLS 1.2+ required
*/

// ============================================
// INTEGRATION CHECKLIST
// ============================================

/*
✅ Component Integration
  □ FavoriteButton in MovieCard
  □ Favorites as watchlist page
  □ WatchlistStatus in Navbar
  □ SyncInfo in Favorites page

✅ Context Setup
  □ App wrapped with AuthProvider
  □ AuthContext initialized
  □ Firebase initialized
  □ Firestore listener setup

✅ Firebase Setup
  □ Firebase project created
  □ Email auth enabled
  □ Firestore database created
  □ Security rules applied

✅ Environment
  □ .env file with credentials
  □ Firebase package installed
  □ REACT_APP variables set
  □ Dev server restarted

✅ Testing
  □ Login works
  □ Add to watchlist works
  □ Toast shows
  □ Data persists
  □ Cross-device sync works
  □ Offline queueing works
*/

// ============================================
// FILE DEPENDENCIES
// ============================================

/*
FavoriteButton.jsx
  ├─ React (useState, useEffect, useContext)
  ├─ AuthContext.js
  └─ (Renders inline toast)

Favorites.jsx
  ├─ React (useContext)
  ├─ AuthContext.js
  └─ (Uses userData.watchlist)

favorites.js
  ├─ firebase.js (auth, db)
  ├─ firebase/firestore (operations)
  └─ (Optional: for legacy localStorage)

AuthContext.js
  ├─ React (createContext, useState, useEffect)
  ├─ firebase.js
  ├─ firebase/auth (auth functions)
  └─ firebase/firestore (data operations)

firebase.js
  ├─ firebase/app (initializeApp)
  ├─ firebase/auth (getAuth)
  └─ firebase/firestore (getFirestore)

WatchlistStatus.jsx
  ├─ React (useContext)
  └─ AuthContext.js

SyncInfo.jsx
  ├─ React (useContext)
  └─ AuthContext.js
*/

export {};
