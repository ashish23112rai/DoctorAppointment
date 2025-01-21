import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css"; // Import Flatpickr theme

const DoctorDashboard = () => {
  const { doctor, backendUrl, doctorToken } = useAppContext();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    patient: "",
  });
  const [sortOrder, setSortOrder] = useState("latest");
  const [notes, setNotes] = useState({});
  const [savedNotes, setSavedNotes] = useState({});  // Track saved notes

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/doctor/my-appointments`, {
          headers: { doctorToken },
        });
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!doctor) {
      navigate("/login");
    }
  }, [doctor, navigate]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortOrderChange = () => {
    setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"));
  };

  const handleMarkAsDone = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/doctor/update-appointment`,
        { id: appointmentId, isCompleted: true },
        { headers: { doctorToken } }
      );
  
      const updatedAppointment = response.data.updatedAppointment;
  
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, isCompleted: true } : appt
        )
      );
    } catch (error) {
      console.error("Error marking appointment as completed:", error);
    }
  };

  const handleSaveNotes = async (appointmentId, note) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/doctor/update-appointment`,
        { id: appointmentId, notes: note },
        { headers: { doctorToken } }
      );
  
      const updatedAppointment = response.data.updatedAppointment;
  
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, notes: note } : appt
        )
      );

      setSavedNotes((prev) => ({ ...prev, [appointmentId]: note }));
      
      alert("Notes added successfully");
    } catch (error) {
      console.error("Error adding notes:", error);
    }
  };

  const filteredAppointments = appointments
    ?.filter((appointment) => {
      const matchesDateRange =
        (!filters.startDate || new Date(appointment.slotDate) >= new Date(filters.startDate)) &&
        (!filters.endDate || new Date(appointment.slotDate) <= new Date(filters.endDate));
      const matchesPatient = filters.patient
        ? appointment.userData?.name.toLowerCase().includes(filters.patient.toLowerCase())
        : true;
      return matchesDateRange && matchesPatient;
    })
    ?.sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.slotDate) - new Date(a.slotDate);
      }
      return new Date(a.slotDate) - new Date(b.slotDate);
    });

  const upcomingAppointments = filteredAppointments?.filter((appt) => !appt.isCompleted);
  const previousAppointments = filteredAppointments?.filter((appt) => appt.isCompleted);

  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Doctor Dashboard</h1>

        {/* Filters and Sort */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Date Range:</label>
              <Flatpickr
                className="form-control w-full p-2 rounded-md bg-gray-600 text-gray-300"
                options={{
                  mode: "range",
                  dateFormat: "Y-m-d",
                }}
                value={[filters.startDate, filters.endDate].map((date) => date ? new Date(date) : "")}  // Ensure valid date values
                onChange={([start, end]) => {
                  setFilters({
                    ...filters,
                    startDate: start ? start.toISOString().split("T")[0] : "",  // Set valid date format
                    endDate: end ? end.toISOString().split("T")[0] : "",
                  });
                }}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Patient Name:</label>
              <input
                type="text"
                name="patient"
                placeholder="Enter patient name"
                value={filters.patient}
                onChange={handleFilterChange}
                className="w-full p-2 rounded-md bg-gray-600 text-gray-300"
              />
            </div>
            <div>
              <button
                onClick={handleSortOrderChange}
                className="w-full p-2 rounded-md bg-green-600 text-gray-100"
              >
                Sort by: {sortOrder === "latest" ? "Latest" : "Oldest"}
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-6">Upcoming Appointments</h2>
            <div className="space-y-6">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col relative"
                >
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    {appointment.userData?.name || "Unknown"}
                  </h3>
                  <p className="text-gray-300">
                    <strong>Date:</strong> {new Date(appointment.slotDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300">
                    <strong>Time:</strong> {appointment.slotTime || "N/A"}
                  </p>
                  <button
                    onClick={() => handleMarkAsDone(appointment._id)}
                    className="mt-4 px-4 py-2 rounded-md bg-green-600 text-gray-100"
                  >
                    Mark as Done
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previous Appointments */}
        {previousAppointments.length > 0 && (
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Previous Appointments</h2>
            <div className="space-y-6">
              {previousAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col relative"
                >
                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    {appointment.userData?.name || "Unknown"}
                  </h3>
                  <p className="text-gray-300">
                    <strong>Date:</strong> {new Date(appointment.slotDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300">
                    <strong>Time:</strong> {appointment.slotTime || "N/A"}
                  </p>

                  <div className="mt-4">
                    {appointment.notes || savedNotes[appointment._id] ? (
                      <textarea
                        value={savedNotes[appointment._id] || appointment.notes || ""}
                        readOnly
                        className="w-full p-2 rounded-md bg-gray-600 text-gray-300"
                      ></textarea>
                    ) : (
                      <div>
                        <textarea
                          placeholder="Add notes for this patient"
                          value={notes[appointment._id] || ""}
                          onChange={(e) =>
                            setNotes({ ...notes, [appointment._id]: e.target.value })
                          }
                          className="w-full p-2 rounded-md bg-gray-600 text-gray-300"
                        ></textarea>
                        <button
                          onClick={() =>
                            handleSaveNotes(appointment._id, notes[appointment._id])
                          }
                          className="mt-2 px-4 py-2 rounded-md bg-green-600 text-gray-100"
                        >
                          Save Notes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
