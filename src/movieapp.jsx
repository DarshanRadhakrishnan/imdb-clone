import React, { useState, useMemo, useEffect } from 'react';
import { Search, Star, Calendar, Film, TrendingUp, SortAsc } from 'lucide-react';

const MovieApp = () => {
  // Sample movie data with poster URLs
  const movies = [
    { id: 1, title: "The Shawshank Redemption", genre: ["Drama"], year: 1994, rating: 9.3, popularity: 98, poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
    { id: 2, title: "The Dark Knight", genre: ["Action", "Crime", "Drama"], year: 2008, rating: 9.0, popularity: 95, poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop" },
    { id: 3, title: "Inception", genre: ["Action", "Sci-Fi", "Thriller"], year: 2010, rating: 8.8, popularity: 94, poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop" },
    { id: 4, title: "Pulp Fiction", genre: ["Crime", "Drama"], year: 1994, rating: 8.9, popularity: 92, poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop" },
    { id: 5, title: "The Matrix", genre: ["Action", "Sci-Fi"], year: 1999, rating: 8.7, popularity: 91, poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop" },
    { id: 6, title: "Forrest Gump", genre: ["Drama", "Romance"], year: 1994, rating: 8.8, popularity: 93, poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop" },
    { id: 7, title: "Interstellar", genre: ["Sci-Fi", "Drama", "Adventure"], year: 2014, rating: 8.7, popularity: 90, poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop" },
    { id: 8, title: "The Godfather", genre: ["Crime", "Drama"], year: 1972, rating: 9.2, popularity: 97, poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop" },
    { id: 9, title: "Parasite", genre: ["Drama", "Thriller"], year: 2019, rating: 8.5, popularity: 88, poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop" },
    { id: 10, title: "Avengers: Endgame", genre: ["Action", "Adventure", "Sci-Fi"], year: 2019, rating: 8.4, popularity: 96, poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop" },
    { id: 11, title: "Joker", genre: ["Crime", "Drama", "Thriller"], year: 2019, rating: 8.4, popularity: 89, poster: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=400&h=600&fit=crop" },
    { id: 12, title: "The Lion King", genre: ["Animation", "Adventure", "Drama"], year: 1994, rating: 8.5, popularity: 90, poster: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=600&fit=crop" },
    { id: 13, title: "Gladiator", genre: ["Action", "Adventure", "Drama"], year: 2000, rating: 8.5, popularity: 87, poster: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=400&h=600&fit=crop" },
    { id: 14, title: "The Prestige", genre: ["Drama", "Mystery", "Thriller"], year: 2006, rating: 8.5, popularity: 86, poster: "https://images.unsplash.com/photo-1574267432644-f74f5ef90518?w=400&h=600&fit=crop" },
    { id: 15, title: "Dune", genre: ["Sci-Fi", "Adventure"], year: 2021, rating: 8.0, popularity: 92, poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop" },
    { id: 16, title: "Everything Everywhere All at Once", genre: ["Action", "Adventure", "Comedy"], year: 2022, rating: 7.8, popularity: 85, poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop" },
    { id: 17, title: "Top Gun: Maverick", genre: ["Action", "Drama"], year: 2022, rating: 8.3, popularity: 91, poster: "https://images.unsplash.com/photo-1502127458966-620a46b53e62?w=400&h=600&fit=crop" },
    { id: 18, title: "Oppenheimer", genre: ["Biography", "Drama", "History"], year: 2023, rating: 8.4, popularity: 94, poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop" },
    { id: 19, title: "Spider-Man: No Way Home", genre: ["Action", "Adventure", "Sci-Fi"], year: 2021, rating: 8.2, popularity: 93, poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { id: 20, title: "The Batman", genre: ["Action", "Crime", "Drama"], year: 2022, rating: 7.8, popularity: 88, poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=600&fit=crop" }
  ];

  const genres = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Drama", "History", "Mystery", "Romance", "Sci-Fi", "Thriller"];
  const yearRanges = ["All Years", "2020-2024", "2015-2019", "2010-2014", "2000-2009", "1990-1999", "Before 1990"];
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState("All Years");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const getYearRange = (range) => {
    switch(range) {
      case "2020-2024": return [2020, 2024];
      case "2015-2019": return [2015, 2019];
      case "2010-2014": return [2010, 2014];
      case "2000-2009": return [2000, 2009];
      case "1990-1999": return [1990, 1999];
      case "Before 1990": return [0, 1989];
      default: return [0, 3000];
    }
  };

  const filteredAndSortedMovies = useMemo(() => {
    let result = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenres.length === 0 || 
        selectedGenres.every(g => movie.genre.includes(g));
      const [minYear, maxYear] = getYearRange(yearRange);
      const matchesYear = movie.year >= minYear && movie.year <= maxYear;
      const matchesRating = movie.rating >= minRating;
      
      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });

    result.sort((a, b) => {
      switch(sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.year - a.year;
        case "oldest":
          return a.year - b.year;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return result;
  }, [movies, searchTerm, selectedGenres, yearRange, minRating, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedGenres([]);
    setYearRange("All Years");
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .skeleton {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          background-size: 1000px 100%;
        }

        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .lazy-image {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .lazy-image.loaded {
          opacity: 1;
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Film className="w-12 h-12 text-purple-400" />
            MovieHub
          </h1>
          <p className="text-gray-300 text-lg">Discover your next favorite film</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Filters Section */}
        {isLoading ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10">
            <div className="h-8 w-32 skeleton rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i}>
                  <div className="h-6 w-24 skeleton rounded mb-2"></div>
                  <div className="h-10 skeleton rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10 fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Genre Filter */}
              <div>
                <label className="block text-white font-medium mb-2">Genres</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {genres.map(genre => (
                    <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedGenres.includes(genre)}
                        onChange={() => toggleGenre(genre)}
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-300 text-sm">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Year Range Filter */}
              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Release Year
                </label>
                <select
                  value={yearRange}
                  onChange={(e) => setYearRange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {yearRanges.map(range => (
                    <option key={range} value={range} className="bg-slate-800">{range}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Minimum Rating: {minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0.0</span>
                  <span>10.0</span>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <SortAsc className="w-4 h-4" />
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="popularity" className="bg-slate-800">Popularity</option>
                  <option value="rating" className="bg-slate-800">Highest Rated</option>
                  <option value="newest" className="bg-slate-800">Newest First</option>
                  <option value="oldest" className="bg-slate-800">Oldest First</option>
                  <option value="title" className="bg-slate-800">Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedGenres.length > 0 || yearRange !== "All Years" || minRating > 0) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedGenres.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm flex items-center gap-2">
                    {genre}
                    <button onClick={() => toggleGenre(genre)} className="hover:text-white">×</button>
                  </span>
                ))}
                {yearRange !== "All Years" && (
                  <span className="px-3 py-1 bg-blue-500/30 text-blue-200 rounded-full text-sm flex items-center gap-2">
                    {yearRange}
                    <button onClick={() => setYearRange("All Years")} className="hover:text-white">×</button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className="px-3 py-1 bg-yellow-500/30 text-yellow-200 rounded-full text-sm flex items-center gap-2">
                    Rating ≥ {minRating.toFixed(1)}
                    <button onClick={() => setMinRating(0)} className="hover:text-white">×</button>
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-4 fade-in">
            <p className="text-gray-300 text-center">
              Found <span className="font-bold text-purple-400">{filteredAndSortedMovies.length}</span> movies
            </p>
          </div>
        )}

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Skeleton Loading State
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
                <div className="h-64 skeleton"></div>
                <div className="p-4">
                  <div className="h-6 skeleton rounded mb-2"></div>
                  <div className="h-4 skeleton rounded w-24 mb-2"></div>
                  <div className="h-4 skeleton rounded w-32 mb-3"></div>
                  <div className="flex gap-1">
                    <div className="h-6 w-16 skeleton rounded"></div>
                    <div className="h-6 w-16 skeleton rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Actual Movie Cards
            filteredAndSortedMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))
          )}
        </div>

        {/* No Results */}
        {!isLoading && filteredAndSortedMovies.length === 0 && (
          <div className="text-center py-12 fade-in">
            <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No movies found matching your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Separate MovieCard component with lazy image loading
const MovieCard = ({ movie, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all hover:transform hover:scale-105 fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative h-64 bg-gradient-to-br from-purple-600 to-blue-600 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Film className="w-16 h-16 text-white/30" />
          </div>
        ) : (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            className={`w-full h-full object-cover lazy-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white font-bold">{movie.rating}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-400">{movie.year}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-gray-300 text-sm">Popularity: {movie.popularity}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {movie.genre.map(g => (
            <span key={g} className="px-2 py-1 bg-white/10 text-gray-300 rounded text-xs">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieApp;