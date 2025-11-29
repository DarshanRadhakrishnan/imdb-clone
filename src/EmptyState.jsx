import React from "react";

const EmptyState = ({ message = "No data available." }) => {
  return (
    <div className="w-full flex items-center justify-center py-10 text-gray-500">
      {message}
    </div>
  );
};

export default EmptyState;
