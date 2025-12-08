import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            // Create user profile if it doesn't exist
            const newUserData = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || "User",
              photoURL: currentUser.photoURL || "",
              watchlist: [],
              history: [],
              createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, "users", currentUser.uid), newUserData);
            setUserData(newUserData);
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register with email and password
  const register = async (email, password, displayName) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });

      // Create user profile in Firestore
      const newUserData = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName,
        photoURL: "",
        watchlist: [],
        history: [],
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "users", result.user.uid), newUserData);
      setUserData(newUserData);

      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      setUserData(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Add movie to watchlist
  const addToWatchlist = async (movie) => {
    if (!user) throw new Error("User not logged in");
    try {
      const watchlist = userData?.watchlist || [];
      const movieExists = watchlist.some((m) => m.id === movie.id);
      if (!movieExists) {
        watchlist.push(movie);
        await setDoc(doc(db, "users", user.uid), { watchlist }, { merge: true });
        setUserData({ ...userData, watchlist });
      }
    } catch (err) {
      console.error("Error adding to watchlist:", err);
      throw err;
    }
  };

  // Remove from watchlist
  const removeFromWatchlist = async (movieId) => {
    if (!user) throw new Error("User not logged in");
    try {
      const watchlist = userData?.watchlist?.filter((m) => m.id !== movieId) || [];
      await setDoc(doc(db, "users", user.uid), { watchlist }, { merge: true });
      setUserData({ ...userData, watchlist });
    } catch (err) {
      console.error("Error removing from watchlist:", err);
      throw err;
    }
  };

  // Add to viewing history
  const addToHistory = async (movie) => {
    if (!user) throw new Error("User not logged in");
    try {
      const history = userData?.history || [];
      const historyEntry = {
        ...movie,
        viewedAt: new Date().toISOString(),
      };
      // Keep only last 50 items
      const newHistory = [historyEntry, ...history].slice(0, 50);
      await setDoc(doc(db, "users", user.uid), { history: newHistory }, { merge: true });
      setUserData({ ...userData, history: newHistory });
    } catch (err) {
      console.error("Error adding to history:", err);
      throw err;
    }
  };

  const value = {
    user,
    userData,
    loading,
    error,
    register,
    login,
    logout,
    addToWatchlist,
    removeFromWatchlist,
    addToHistory,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
