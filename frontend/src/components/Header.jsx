import React from "react";
import { Link } from "react-router-dom";
import HeaderImage from "../assets/assets_frontend/Header.jpg";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-extrabold mb-4 text-gray-100">
            Book Your Appointment <br /> with Dr. Preeti Today!
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Take the first step towards better health with personalized
            homeopathic care.
            <br /> Dr. Preeti is here to guide you to wellness!
          </p>
          <Link
            to="/appointment"
            className="inline-flex items-center bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white text-sm py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <span>Book Appointment</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:block">
          <img
            src= {HeaderImage} // Replace with your actual image URL
            alt="Homeopathic Clinic"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
