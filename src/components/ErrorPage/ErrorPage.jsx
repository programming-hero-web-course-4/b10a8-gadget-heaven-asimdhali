import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../assets/error.png"; // Replace this with your actual error image path.

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img
          src={errorImage}
          alt="Error"
          className="w-[200px] mx-auto mb-8"
        />
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
