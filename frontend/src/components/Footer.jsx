import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-400">
            Dedicated to providing personalized homeopathic care to enhance your
            well-being. Your health is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-sm text-gray-400 hover:text-white transition duration-300"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white transition duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-sm text-gray-400 hover:text-white transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">
            <span className="block">Phone: +1 234 567 890</span>
            <span className="block">Email: contact@clinic.com</span>
            <span className="block">Address: 123 Wellness Street, Health City</span>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Dr. Preeti's Clinic. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
