import React from "react";
import HairImage from '../assets/assets_frontend/hair.jpg';
import SkinImage from '../assets/assets_frontend/skin.avif';
import AllergyImage from '../assets/assets_frontend/allergy.jpg';
import StressImage from '../assets/assets_frontend/stress.avif';
import DigestionImage from '../assets/assets_frontend/digestion.jpg';
import ArthritisImage from '../assets/assets_frontend/arthritis.jpg';

const SpecialityMenu = () => {
  const specialties = [
    { name: "Hair", image: HairImage },
    { name: "Skin", image: SkinImage },
    { name: "Allergy", image: AllergyImage },
    { name: "Stress", image: StressImage },
    { name: "Digestion", image: DigestionImage },
    { name: "Arthritis", image: ArthritisImage },
  ];

  return (
    <div id="speciality-menu" className="bg-gray-800 text-white py-12 relative">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Book Your Appointment for Specialized Care</h2>

        {/* Description */}
        <p className="text-base md:text-lg text-center mb-8">
          Choose from a wide range of homeopathic treatments tailored to your health needs. Select the specialty you're seeking
          treatment for, and book your appointment today!
        </p>

        {/* Specialties Badge Scroll */}
        <div className="flex flex-wrap justify-center gap-6 p-5">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="flex flex-col items-center group relative"
            >
              {/* Circular Badge with Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-blue-500 group-hover:translate-y-[-10px] group-hover:z-10 transition-all duration-300 ease-in-out relative">
                <img src={specialty.image} alt={specialty.name} className="w-full h-full object-cover" />
              </div>

              {/* Specialty Name */}
              <p className="text-xs sm:text-sm mt-2 text-center text-gray-300">{specialty.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialityMenu;
