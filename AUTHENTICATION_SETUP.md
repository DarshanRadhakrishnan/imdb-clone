# Authentication & Personalization Setup Guide

## Overview
This IMDB Clone now includes Firebase Authentication and user personalization features.

## Features Implemented

### ✅ User Authentication
- Email/Password registration and login
- Persistent authentication state
- User session management
- Secure logout functionality

### ✅ User Profile
- Display user avatar and name in Navbar
- User data stored in Firestore
- Profile management ready for extension

### ✅ Personalized Features
- **Watchlist**: Save movies to personalized watchlist
- **Viewing History**: Track watched movies with timestamps
- All data synced with Firestore

### ✅ Protected Routes
- Automatic login redirect for non-authenticated users
- Loading state while checking auth status

## Installation Steps

### 1. Install Firebase
```bash
npm install firebase
```

### 2. Set Up Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** (Email/Password provider)
4. Create a **Firestore Database** (Start in test mode)
5. Go to **Project Settings** and copy your Web App credentials

### 3. Add Firebase Credentials
Create a `.env` file in your project root:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=1:your_app_id
```

### 4. Firestore Security Rules
For testing, paste this in Firestore Security Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## File Structure

```
src/
├── firebase.js              # Firebase initialization
├── AuthContext.js           # Authentication context and hooks
├── Login.jsx                # Login/Sign up form
├── Navbar.jsx               # User profile display in navbar
├── ProtectedRoute.jsx       # Route protection wrapper
├── Watchlist.jsx            # User watchlist page
├── ViewingHistory.jsx       # User viewing history page
└── App.js                   # Updated with Auth Provider
```

## Usage Examples

### 1. Use Authentication in Components
```jsx
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function MyComponent() {
  const { user, userData, addToWatchlist } = useContext(AuthContext);
  
  if (!user) return <p>Please log in</p>;
  
  return (
    <div>
      <h1>Hello, {userData.displayName}</h1>
      <button onClick={() => addToWatchlist(movie)}>
        Add to Watchlist
      </button>
    </div>
  );
}
```

### 2. Access User Data
```jsx
const { user, userData } = useContext(AuthContext);

// user: Firebase Auth user object
// userData: {
//   uid,
//   email,
//   displayName,
//   photoURL,
//   watchlist: [],
//   history: [],
//   createdAt
// }
```

### 3. Add/Remove from Watchlist
```jsx
const { addToWatchlist, removeFromWatchlist } = useContext(AuthContext);

// Add movie
await addToWatchlist({
  id: "movie_id",
  title: "Movie Title",
  year: 2024,
  posterUrl: "image_url"
});

// Remove from watchlist
await removeFromWatchlist("movie_id");
```

### 4. Add to Viewing History
```jsx
const { addToHistory } = useContext(AuthContext);

await addToHistory({
  id: "movie_id",
  title: "Movie Title",
  year: 2024,
  posterUrl: "image_url"
});
```

## Components Included

### AuthContext.js
- Manages authentication state and user data
- Provides auth functions: register, login, logout
- Provides data functions: addToWatchlist, removeFromWatchlist, addToHistory

### Login.jsx
- Login/Sign up form
- Email and password validation
- Display errors to user
- Switch between login and signup modes

### Navbar.jsx
- Shows user avatar and display name
- Dropdown menu with links to Watchlist, History, Settings
- Logout button
- Only visible when user is logged in

### Watchlist.jsx
- Full page showing user's saved movies
- Remove from watchlist functionality
- Empty state when no movies

### ViewingHistory.jsx
- Shows all viewed movies with timestamps
- Displays in chronological order (newest first)
- Keeps last 50 items per user

### ProtectedRoute.jsx
- Wraps components that require authentication
- Shows loading state while checking auth
- Redirects to login if not authenticated

## Firestore Database Schema

### users Collection
```
users/{userId}
├── uid: string
├── email: string
├── displayName: string
├── photoURL: string
├── watchlist: array
│   └── {id, title, year, posterUrl}
├── history: array
│   └── {id, title, year, posterUrl, viewedAt}
└── createdAt: string (ISO timestamp)
```

## Testing

### Demo Credentials (can create your own)
- Email: demo@example.com
- Password: Demo123456

### Test Flow
1. Open app → Login page
2. Sign up with email/password/name
3. Navbar shows your name and avatar
4. Add movies to watchlist
5. View watchlist
6. Check viewing history
7. Logout

## Next Steps / Extensions

1. **Upload Profile Photo**
   - Allow users to upload and store profile pictures
   - Store in Firebase Storage

2. **Ratings & Reviews**
   - Let users rate movies (1-10)
   - Store reviews in Firestore

3. **Social Features**
   - Follow other users
   - See friend's watchlists
   - Share reviews

4. **Recommendations**
   - Suggest movies based on watchlist
   - ML-based recommendations

5. **Advanced Filters**
   - Filter watchlist by genre, year, rating
   - Search viewing history

## Troubleshooting

### "Authentication is disabled" error
- Go to Firebase Console → Authentication → Sign-in method
- Enable Email/Password

### Firestore not saving data
- Check Firestore Security Rules allow write for authenticated users
- Check browser console for errors

### .env not loading
- Restart development server after adding .env file
- Variables must start with `REACT_APP_`

## Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
