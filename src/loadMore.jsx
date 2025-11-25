import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    const res = await axios.get(`/api/products?page=${page}&limit=10`);

    setItems(prev => [...prev, ...res.data.items]);  // append new results
    setHasMore(res.data.hasMore);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [page]);

  return (
    <div>
      <h1>Products</h1>

      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            {item.name}
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
