import React from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

const Home = () => {
  const { data, loading, error, retry } = useFetch("/api/products");

  if (loading) return <Loader text="Fetching products..." />;
  if (error) return <ErrorState message={error} onRetry={retry} />;
  if (!data || data.length === 0) return <EmptyState message="No products found." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {data.map((item) => (
        <div key={item.id} className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-600 mt-1">Price: ₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
