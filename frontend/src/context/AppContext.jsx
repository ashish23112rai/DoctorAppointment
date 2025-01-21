import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [doctorToken, setDoctorToken] = useState(localStorage.getItem("doctorToken"));

  const backendUrl = "https://doctorappointment-backend-7dqw.onrender.com";
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }

    if (doctorToken) {
      fetchDoctorData(doctorToken);
    }
  }, [token, doctorToken]);

  const fetchUserData = async (token) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (response.data.success) {
        setUser(response.data.userData);
      } else {
        toast.error("Failed to fetch user data.");
        logoutUser();
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data.");
      logoutUser();
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorData = async (doctorToken) => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/doctor/get-profile-doctor`, {
        headers: { doctorToken },
      });
      if (response.data.success) {
        setDoctor(response.data.doctorData);
      } else {
        toast.error("Failed to fetch doctor data.");
        logoutDoctor();
      }
    } catch (error) {
      toast.error("An error occurred while fetching doctor data.");
      logoutDoctor();
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
      if (response.data.success) {
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        toast.success("Login successful!");
        logoutDoctor();
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
      if (response.data.success) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.info("Logged out successfully.");
    navigate("/login");
  };

  const loginDoctor = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/doctor/login-doctor`, { email, password });
      if (response.data.success) {
        const newToken = response.data.token;
        localStorage.setItem("doctorToken", newToken);
        setDoctorToken(newToken);
        setDoctor(response.data.doctorData);
        toast.success("Doctor login successful!");
        logoutUser();
        navigate("/doctor/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred during doctor login.");
    } finally {
      setLoading(false);
    }
  };

  const logoutDoctor = () => {
    localStorage.removeItem("doctorToken");
    setDoctorToken(null);
    setDoctor(null);
    toast.info("Doctor logged out successfully.");
    navigate("/login");
  };

  useEffect(() => {
    if (!loading) {
      if (!user && !doctor) {
        if (location.pathname.startsWith("/doctor") && location.pathname !== "/login") {
          navigate("/login");
        } else if (location.pathname !== "/login" && location.pathname !== "/register" && !['/about', '/contact', '/'].includes(location.pathname)) {
          navigate("/login");
        }
      }
    }
  }, [user, doctor, loading, navigate, location]);

  return (
    <AppContext.Provider
      value={{
        user,
        doctor,
        loginUser,
        loginDoctor,
        token,
        doctorToken,
        setDoctorToken,
        setToken,
        backendUrl,
        registerUser,
        logoutUser,
        logoutDoctor,
        loading,
      }}
    >
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 z-50">
          <Loader />
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
