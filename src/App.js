import { useEffect, useState } from "react";
import { getPopularMovies } from "./api";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const results = await getPopularMovies();
      setMovies(results);
    }
    fetchMovies();
  }, []);

  return (
    <div className="App">
      <h1>Popular Movies</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
