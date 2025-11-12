import React from 'react';
import { Star } from 'lucide-react';

const MovieCard = ({ poster, title, year, rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl max-w-sm">
      {/* Movie Poster */}
      <div className="relative h-96 overflow-hidden bg-gray-200">
        <img
          src={poster}
          alt={`${title} poster`}
          className="w-full h-full object-cover"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-75 text-white px-3 py-1.5 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm">{year}</p>
      </div>
    </div>
  );
};

// Sample static data
const sampleMovies = [
  {
    id: 1,
    poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    title: "The Shawshank Redemption",
    year: "1994",
    rating: 9.3
  },
  {
    id: 2,
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    title: "The Godfather",
    year: "1972",
    rating: 9.2
  },
  {
    id: 3,
    poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    title: "The Dark Knight",
    year: "2008",
    rating: 9.0
  },
  {
    id: 4,
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    title: "Inception",
    year: "2010",
    rating: 8.8
  }
];

// Demo App
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Movie Gallery
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Reusable MovieCard Component Demo
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              poster={movie.poster}
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}