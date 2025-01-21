import React from "react";
import AboutImage from "../assets/assets_frontend/about.jpg";

const About = () => {
  return (
    <section id="about" className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        {/* About Us Section */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          {/* Left Section: Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={AboutImage}
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right Section: Text */}
          <div className="md:w-1/2 text-gray-100 p-3">
            <h2 className="text-4xl font-extrabold mb-6">About Us</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Welcome to our clinic! We are dedicated to providing personalized 
              homeopathic treatments tailored to your unique needs. With a 
              commitment to holistic wellness, our experienced team ensures that 
              every patient receives compassionate care and expert guidance. 
              Join us on a journey to better health and vitality.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-700 rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-semibold mb-6 text-center">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2l4-4M6 12l2-2l2 2l2-2l2 2l2-2"
                  />
                </svg>
              </div>
              <p className="text-gray-300 text-lg">
                Experienced professionals with years of expertise in homeopathic 
                care.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4h4"
                  />
                </svg>
              </div>
              <p className="text-gray-300 text-lg">
                Personalized treatment plans tailored to your unique health needs.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v4h6v-4M9 10V4h6v6"
                  />
                </svg>
              </div>
              <p className="text-gray-300 text-lg">
                Focus on holistic healing for complete physical and mental 
                well-being.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <div className="text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h7l5-5M14 7l5 5H8l-5 5h7"
                  />
                </svg>
              </div>
              <p className="text-gray-300 text-lg">
                Modern facilities and a friendly, supportive environment.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-12">
          <h3 className="text-3xl font-semibold mb-6 text-center text-gray-100">
            Our Mission
          </h3>
          <p className="text-center text-lg text-gray-300 leading-relaxed">
            To empower individuals to achieve optimal health and well-being through 
            holistic, patient-focused care. We aim to deliver top-quality 
            homeopathic treatments and educate our patients about the importance of 
            wellness and preventive health.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
