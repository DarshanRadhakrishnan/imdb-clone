import React, { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import MovieCard from "../components/MovieCard";
import EmptyState from "../components/EmptyState";

const Favorites = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getFavorites());
  }, []);

  if (movies.length === 0)
    return <EmptyState message="No favorite movies yet ❤️" />;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Favorites;
