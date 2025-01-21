import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 z-50">
    <FaSpinner className="text-white text-4xl animate-spin" />
  </div>
);

export default Loader;