import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const MyAppointments = () => {
  const { user, token, backendUrl } = useAppContext();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/user/my-appointments`, {
          headers: { token },
          params: { userId: user._id },
        });

        if (response.data.success) {
          setAppointments(response.data.appointments);
        } else {
          setError("Failed to fetch appointments.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    if (user && token) fetchAppointments();
  }, [user, token, backendUrl]);

  const cancelAppointment = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { userId: user._id, appointmentId: id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === id ? { ...appt, isCancelled: true } : appt
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("An error occurred while cancelling.");
      console.error(err);
    }
  };

  const handleCancel = (id) => {
    cancelAppointment(id);
  };

  const handleReschedule = (id) => {
    alert(`Appointment ID: ${id} rescheduling functionality will be available soon.`);
  };

  const categorizeAppointments = (appointments) => {
    const upcomingAppointments = appointments.filter(
      (appointment) => !appointment.isCompleted
    );
    const previousAppointments = appointments.filter(
      (appointment) => appointment.isCompleted
    );
    return { previousAppointments, upcomingAppointments };
  };

  const { previousAppointments, upcomingAppointments } = categorizeAppointments(appointments);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  return (
    <section className="bg-gray-900 text-white py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">My Appointments</h2>

        {/* Upcoming Appointments Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-teal-500 mb-4 border-b border-gray-700 pb-2">
            Upcoming Appointments
          </h3>
          <div className="space-y-6">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-teal-500 transition duration-300"
                >
                  <p className="text-lg font-semibold text-gray-300 mb-2">
                    Date:{" "}
                    <span className="text-white">
                      {new Date(appointment.slotDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-lg font-semibold text-gray-300 mb-2">
                    Time: <span className="text-white">{appointment.slotTime}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-300 mb-2">
                    Doctor: <span className="text-white">{appointment?.doctor || "N/A"}</span>
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleCancel(appointment._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReschedule(appointment._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    >
                      Pay Online
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No upcoming appointments.</p>
            )}
          </div>
        </div>

        {/* Previous Appointments Section */}
        <div>
          <h3 className="text-2xl font-semibold text-teal-500 mb-4 border-b border-gray-700 pb-2">
            Previous Appointments
          </h3>
          <div className="space-y-6">
            {previousAppointments.length > 0 ? (
              previousAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-teal-500 transition duration-300"
                >
                  <p className="text-lg font-semibold text-gray-300 mb-2">
                    Date:{" "}
                    <span className="text-white">
                      {new Date(appointment.slotDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-lg font-semibold text-gray-300 mb-2">
                    Time: <span className="text-white">{appointment.slotTime}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-300 mb-2">
                    Doctor: <span className="text-white">{appointment?.doctor || "N/A"}</span>
                  </p>
                  <p className="text-gray-400">
                    Notes: {appointment?.notes || "No notes available."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No previous appointments.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAppointments;
