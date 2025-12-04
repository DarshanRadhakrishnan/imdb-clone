import FavoriteButton from "./FavoriteButton";


const MovieCard = ({ movie }) => {
  return (
    <div className="relative p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
      <img
        src={movie.poster}
        alt={movie.title}
        className="rounded-lg w-full h-60 object-cover"
      />

      <h3 className="font-semibold text-lg mt-3">{movie.title}</h3>

      {/* Heart Icon */}
      <div className="absolute top-3 right-3">
        <FavoriteButton movie={movie} />
      </div>
    </div>
  );
};

export default MovieCard;
