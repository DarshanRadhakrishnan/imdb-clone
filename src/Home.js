import ThemeToggle from "./ThemeToggle";

export default function Home({ items = [], loading, onLoadMore, hasMore }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Products</h1>
        <ThemeToggle />
      </div>

      {/* Responsive Grid */}
      <div
        className="
          grid 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-5
        "
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="
              p-4 bg-white dark:bg-gray-800 
              rounded-xl shadow-md 
              hover:shadow-xl 
              transition 
              hover:scale-[1.02] 
              cursor-pointer
            "
          >
            <img
              src={item.image}
              alt={item.name}
              className="
                w-full h-40 object-cover 
                rounded-lg mb-3 
                transition
              "
            />
            <h2 className="text-lg font-semibold dark:text-white">
              {item.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              {item.description || "Short description goes here..."}
            </p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="
              px-6 py-3 bg-blue-600 text-white 
              rounded-xl shadow 
              hover:bg-blue-700 
              transition 
              disabled:bg-gray-400
            "
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
