import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, user, doctor, doctorToken, setDoctorToken } =
    useAppContext();

  const handleLogout = () => {
    if (user) {
      setToken(false);
      localStorage.removeItem("token");
    }
    if (doctor) {
      setDoctorToken(false);
      localStorage.removeItem("doctorToken");
    }
    window.location.reload();
  };

  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">Dr Preeti's Clinic</a>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {["/", "/about", "/contact"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-blue-400" : "text-white"
                } hover:text-blue-400`
              }
            >
              {path === "/"
                ? "Home"
                : path.slice(1).replace(/\b\w/g, (char) => char.toUpperCase())}
            </NavLink>
          ))}
        </div>

        {/* User Profile or Login Button */}
        <div className="relative hidden md:block">
          {user || doctor ? (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {(user || doctor)?.image ? (
                <img
                  src={(user || doctor)?.image}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 16c-4.42 0-8 2.69-8 6 0 .35.03.69.08 1.03.32 1.29 1.53 2.18 2.92 2.18h10.99c1.39 0 2.6-.89 2.92-2.18.05-.34.08-.68.08-1.03 0-3.31-3.58-6-8-6z"
                    />
                  </svg>
                </div>
              )}

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded">
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      navigate(doctor ? "/doctor/profile" : "/my-profile")
                    }
                  >
                    My Profile
                  </button>
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                    onClick={() =>
                      navigate(
                        doctor ? "/doctor/dashboard" : "/my-appointments"
                      )
                    }
                  >
                    My Appointments
                  </button>
                  <button
                    className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle navigation menu"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {showMenu && (
  <div className="md:hidden bg-gray-700">
    {["/", "/about", "/contact"].map((path, index) => (
      <NavLink
        key={index}
        to={path}
        className={({ isActive }) =>
          `block px-4 py-2 text-sm ${
            isActive ? "text-blue-400" : "text-white"
          } hover:text-blue-400`
        }
        onClick={() => setShowMenu(false)} // Close menu on link click
      >
        {path === "/"
          ? "Home"
          : path.slice(1).replace(/\b\w/g, (char) => char.toUpperCase())}
      </NavLink>
    ))}

    {user || doctor ? (
      <>
        <button
          className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
          onClick={() => {
            setShowMenu(false); // Close menu
            navigate(doctor ? "/doctor/profile" : "/my-profile");
          }}
        >
          My Profile
        </button>
        <button
          className="block px-4 py-2 text-sm text-white hover:bg-gray-600"
          onClick={() => {
            setShowMenu(false); // Close menu
            navigate(doctor ? "/doctor/dashboard" : "/my-appointments");
          }}
        >
          My Appointments
        </button>
        <button
          className="block w-full px-4 py-2 text-sm text-white bg-red-500 rounded text-center hover:bg-red-600 focus:ring-2 focus:ring-red-400"
          onClick={() => {
            setShowMenu(false); // Close menu
            handleLogout();
          }}
        >
          Logout
        </button>
      </>
    ) : (
      <button
  className="block w-full px-4 py-2 text-sm text-white bg-blue-500 rounded text-center hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
  onClick={() => {
    setShowMenu(false); // Close menu
    navigate("/login");
  }}
>
  Login
</button>

    )}
  </div>
)}

    </nav>
  );
};

export default Navbar;
