import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-600"></div>
      <p className="mt-3 text-gray-600">{text}</p>
    </div>
  );
};

export default Loader;
