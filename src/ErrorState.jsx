import React from "react";

const ErrorState = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 text-center">
      <p className="text-red-500 font-medium mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
