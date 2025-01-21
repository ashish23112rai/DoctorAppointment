import React from "react";
import DoctorImage from "../assets/assets_frontend/DrRandom.jpg"

const MeetDrPreeti = () => {
  return (
    <section className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left Section - Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src={DoctorImage}
            alt="Dr. Preeti"
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section - Content */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-100">
            Meet Dr. Preeti
          </h2>
          <p className="text-lg text-gray-300">
            Dr. Preeti is a highly skilled and compassionate homeopathic
            practitioner with years of experience in providing personalized
            care. Her holistic approach focuses on treating the root cause of
            ailments, ensuring lasting wellness for her patients. With a deep
            commitment to healing and a passion for improving lives, Dr. Preeti
            is your trusted partner on your journey to better health.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MeetDrPreeti;
