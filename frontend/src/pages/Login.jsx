import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [view, setView] = useState("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", doctorID: "" });
  const { loginUser, loginDoctor, registerUser, loading, user } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (view === "signup") {
      if (!email || !password || !name || !confirmPassword) {
        return toast.error("Please fill in all fields!");
      }
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match!");
      }
      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters long!");
      }
      await registerUser(name, email, password);
    } else if (view === "login") {
      if (!email || !password) {
        return toast.error("Please fill in all fields!");
      }
      await loginUser(email, password);
    } else if (view === "doctor") {
      if (!email || !password) {
        return toast.error("Please fill in all fields for Doctor Login!");
      }
      await loginDoctor(email, password);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (user?.token && location.pathname !== "/my-appointments") {
      navigate("/my-appointments");
    }
  }, [user, navigate, location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center text-white">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          {view === "signup" ? "Join Us" : view === "doctor" ? "Doctor Login" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-400 mb-6">
          {view === "signup"
            ? "Create an account to get started."
            : view === "doctor"
            ? "Access your doctor portal."
            : "Log in to your account."}
        </p>
        <form onSubmit={handleSubmit}>
          {view === "signup" && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
                aria-label="Name"
              />
            </div>
          )}
          {(view === "login" || view === "signup" || view === "doctor") && (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  aria-label="Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your password"
                  aria-label="Password"
                />
              </div>
            </>
          )}
          {view === "signup" && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Re-enter your password"
                aria-label="Confirm Password"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-bold transition duration-300 ease-in-out flex items-center justify-center ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </>
            ) : view === "signup" ? (
              "Sign Up"
            ) : view === "doctor" ? (
              "Doctor Login"
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          {view !== "doctor" && (
            <button
              onClick={() => setView("doctor")}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-bold transition duration-300 ease-in-out mb-4"
            >
              Doctor Login
            </button>
          )}
          {view === "doctor" && (
            <button
              onClick={() => setView("login")}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg font-bold transition duration-300 ease-in-out"
            >
              User Login
            </button>
          )}
          {view !== "doctor" && (
            <p className="text-sm text-gray-400 mt-4">
              {view === "signup" ? "Already have an account?" : "Don't have an account yet?"}{" "}
              <button
                onClick={() => setView(view === "signup" ? "login" : "signup")}
                className="text-green-400 hover:underline focus:outline-none"
              >
                {view === "signup" ? "Login here" : "Sign up here"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
