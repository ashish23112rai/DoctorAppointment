import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { useAppContext } from "../context/AppContext";

const Appointment = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const { user, token, backendUrl } = useAppContext();
  const [amount] = useState(500);
  const [bookedSlots, setBookedSlots] = useState([]);
  // console.log(user, token, backendUrl);
  

  // Generate dynamic dates for the current week starting from today
  useEffect(() => {
    const today = new Date();
    const tempDates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      tempDates.push({
        day: nextDate.toLocaleDateString("en-US", { weekday: "short" }), // e.g., Mon, Tue
        date: nextDate.getDate(), // e.g., 2, 3
        fullDate: nextDate, // Full Date object
      });
    }
    setDates(tempDates);
    setSelectedDate(tempDates[0]); // Default to the first date
  }, [setBookedSlots]);

  // Generate time slots for the selected date
  const generateTimeSlots = (startHour, endHour, intervalMinutes) => {
    const slots = [];
    const now = new Date();
    const isToday = selectedDate?.fullDate?.toDateString() === now.toDateString();

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const slotTime = new Date();
        slotTime.setHours(hour, minute, 0, 0);

        // Filter out past times if the selected date is today
        if (!isToday || slotTime > now) {
          slots.push(
            slotTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })
          );
        }
      }
    }
    setTimeSlots(slots);
  };

  // Fetch booked slots for the selected date
  // Fetch booked slots for the selected date
  const fetchBookedSlots = async (date) => {
    try {
        const response = await axios.get(`${backendUrl}/api/user/bookedSlots`, {
            params: { date: date.toISOString() }, // Send the date as a query parameter
            headers: { token },
        });

        if (response.data.success) {
            console.log(response);
            setBookedSlots(response.data.bookedSlots);
        } else {
            console.error("Error fetching booked slots:", response.data.message);
        }
    } catch (error) {
        console.error("Error fetching booked slots:", error);
    }
};


  


  // Update time slots whenever the selected date changes
  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots(10, 14, 30); // Slots from 10:00 AM to 2:00 PM every 30 minutes
      fetchBookedSlots(selectedDate.fullDate); // Fetch booked slots for the selected date
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Clear selected time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time to book your appointment.");
      return;
    }
    const appointmentDetails = {
      userId: user?._id,
      slotDate: selectedDate.fullDate.toISOString(),
      slotTime: selectedTime,
      amount,
    };

    try {
      // Send the appointment data to the backend
      const response = await axios.post(`${backendUrl}/api/user/book-appointment`, appointmentDetails, {
        headers: { token },
      });
      if (response.data.success) {
        alert(`Appointment booked for ${selectedDate.day}, ${selectedDate.date} at ${selectedTime}`);
        fetchBookedSlots(selectedDate.fullDate)
        setSelectedTime(null);
      } else {
        alert("Error booking appointment: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while booking the appointment.");
    }
  };

  return (
    <section id="book-appointment" className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-100">
            Book an Appointment
          </h2>
          <p className="text-lg text-gray-300">
            Schedule your consultation with our experienced homeopathy doctor.
          </p>
        </div>

        {/* Doctor's Profile and Booking Section */}
        <div className="bg-gray-700 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Doctor's Photo */}
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-md flex-shrink-0">
            <img
              src="https://img.freepik.com/premium-photo/medical-concept-indian-beautiful-female-doctor-white-coat-with-stethoscope-waist-up-medical-student-woman-hospital-worker-looking-camera-smiling-studio-blue-background_185696-621.jpg?w=1060"
              alt="Doctor"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Doctor's Details */}
          <div className="flex-grow">
            <h3 className="text-3xl font-semibold text-gray-100">
              Dr. Preeti <span className="text-green-500"></span>
            </h3>
            <p className="text-lg text-gray-300">MBBS - General Physician</p>
            <p className="text-sm text-gray-400 mb-2">4 Years Experience</p>
            <p className="text-gray-300 mb-4">
              Dr. Preeti is dedicated to providing quality medical care
              with a focus on preventive medicine, early diagnosis, and
              personalized treatments.
            </p>
            <p className="text-lg font-semibold text-gray-100">
              Appointment Fee: <span className="text-green-500">₹{amount}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="mt-8 bg-gray-700 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-100 mb-4">
            Booking Slots
          </h3>

          {/* Date Picker */}
          <div className="flex space-x-4 overflow-x-auto pb-4 mb-4 border-b border-gray-600">
            {dates.map((item, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(item)}
                className={`py-2 px-4 rounded-lg ${selectedDate === item
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 text-gray-300"
                } font-semibold hover:bg-green-500`}
              >
                {item.day} {item.date}
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className="grid grid-cols-3 gap-4">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelect(slot)}
                disabled={bookedSlots.includes(slot)} // Disable booked slots
                className={`py-2 px-4 rounded-lg ${selectedTime === slot
                  ? "bg-green-500 text-white"
                  : bookedSlots.includes(slot)
                  ? "bg-gray-500 text-gray-400" // Muted booked slots
                  : "bg-gray-600 text-gray-300"
                } font-semibold hover:bg-green-500`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleBookAppointment}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-8 rounded-lg shadow-lg hover:from-teal-500 hover:to-green-500 transition duration-300 ease-in-out"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
