import { useState, useEffect, useCallback } from "react";

const API_KEY = "YOUR_OMDB_API_KEY"; // replace with your key

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // ----------------- Debounce Function -----------------
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // ----------------- Fetch Movie API -----------------
  const fetchMovies = async (searchText) => {
    if (!searchText.trim()) {
      setResults([]);
      setNoResults(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchText}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setResults(data.Search);
        setNoResults(false);
      } else {
        setResults([]);
        setNoResults(true);
      }
    } catch (err) {
      console.error("API Error:", err);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  };

  // Create a debounced version of the API call
  const debouncedSearch = useCallback(debounce(fetchMovies, 500), []);

  // When query changes → trigger debounced API call
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div style={styles.container}>
      <h2>Movie Search</h2>

      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />

      {loading && <p>Loading...</p>}

      {!loading && noResults && (
        <p style={{ color: "red", marginTop: "10px" }}>No Results Found</p>
      )}

      <div style={styles.grid}>
        {results.map((movie) => (
          <div key={movie.imdbID} style={styles.card}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
              alt={movie.Title}
              style={styles.poster}
            />
            <h4>{movie.Title}</h4>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------- Simple Styles -------------------
const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  input: {
    width: "90%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "10px",
    borderRadius: "8px",
    background: "#f5f5f5",
  },
  poster: {
    width: "100%",
    borderRadius: "8px",
  },
};
