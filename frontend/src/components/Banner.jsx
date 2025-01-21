import React from "react";
import {useNavigate} from 'react-router-dom';
import FooterImage from "../assets/assets_frontend/Footer.jpg";

const Banner = () => {
    const navigate = useNavigate()
  return (
    <section className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-4xl font-extrabold mb-4 text-gray-100">
            Book Your Appointment Today!
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Take the first step towards a healthier you.<br/> Create your account now 
            and experience personalized care with Dr. Preeti.
          </p>
          <button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white text-sm py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          onClick={()=>{navigate('/login');scrollTo(0,0)}}>
            Create Account
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden md:block">
          <img
            src={FooterImage}
            alt="Personalized Care"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
