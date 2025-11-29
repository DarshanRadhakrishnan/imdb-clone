import React, { useEffect, useState } from "react";
import { toggleFavorite, isFavorite } from "../utils/favorites";

const FavoriteButton = ({ movie }) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(movie.id));
  }, [movie.id]);

  const handleClick = () => {
    toggleFavorite(movie);
    setFav(!fav);
  };

  return (
    <button onClick={handleClick} className="text-red-500">
      {fav ? (
        <svg className="w-7 h-7 fill-red-600" viewBox="0 0 24 24">
          <path d="M12 21s-6.3-4.3-9.3-8.3C-1 8.1 1 3 5.3 3 7.6 3 9.4 4.6 12 7.3 14.6 4.6 16.4 3 18.7 3 23 3 25 8.1 21.3 12.7 18.3 16.7 12 21 12 21z"/>
        </svg>
      ) : (
        <svg className="w-7 h-7" fill="none" stroke="red" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3A5.5 5.5 0 002 8.5C2 13.28 7.55 17.36 11 21c3.45-3.64 9-7.72 9-12.5A5.5 5.5 0 0016.5 3z" />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;
