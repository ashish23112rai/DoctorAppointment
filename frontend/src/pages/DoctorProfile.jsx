import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { doctor, doctorToken, backendUrl } = useAppContext();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append("doctorId", doctor._id);
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      formData.append("address", JSON.stringify(profileData.address));
      formData.append("dob", profileData.dob);
      formData.append("gender", profileData.gender);
      formData.append("specialty", profileData.specialty);
      formData.append("availability", profileData.availability);
      formData.append("qualifications", JSON.stringify(profileData.qualifications));
      formData.append("experienceYears", profileData.experienceYears);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        formData,
        { headers: { doctorToken } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setProfileData({ ...profileData, image: response.data.updatedImage || profileData.image });
        setIsEditing(false);
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile.");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleToggleAvailability = () => {
    setProfileData((prevData) => ({
      ...prevData,
      availability: !prevData.availability,
    }));
  };

  useEffect(() => {
    if (doctor) {
      setProfileData(doctor);
    }
  }, [doctor]);

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Doctor Profile</h2>

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src={profileData.image || "https://via.placeholder.com/150"}
                alt="Doctor Profile"
                className="w-32 h-32 rounded-full border-4 border-green-500 shadow-md"
              />
              {isEditing && (
                <div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="mt-4 text-gray-400"
                  />
                </div>
              )}
            </div>
            <div className="md:ml-6 text-center md:text-left">
              <h3 className="text-2xl font-semibold">{profileData.name || "N/A"}</h3>
              <p className="text-gray-400">{profileData.email || "N/A"}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-1">Phone:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.phone || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-400">{profileData.phone || "N/A"}</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 mb-1">Address:</p>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={profileData.address?.line1 || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: { ...profileData.address, line1: e.target.value },
                        })
                      }
                      className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
                    />
                    <input
                      type="text"
                      value={profileData.address?.line2 || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: { ...profileData.address, line2: e.target.value },
                        })
                      }
                      className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                ) : (
                  <p className="text-gray-400">
                    {profileData.address?.line1 || "N/A"}, {profileData.address?.line2 || "N/A"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Specialty and Availability */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Specialty & Availability
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-1">Specialty:</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.specialty || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, specialty: e.target.value })
                    }
                    className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-400">{profileData.specialty || "N/A"}</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 mb-1">Availability:</p>
                {isEditing ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.availability}
                      onChange={handleToggleAvailability}
                      className="mr-2"
                    />
                    <span>{profileData.availability ? "Yes" : "No"}</span>
                  </div>
                ) : (
                  <p className="text-gray-400">{profileData.availability ? "Yes" : "No"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Qualifications and Experience */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Qualifications & Experience
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-1">Qualifications:</p>
                {isEditing ? (
                  <textarea
                    value={profileData.qualifications.join(", ") || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        qualifications: e.target.value.split(",").map((q) => q.trim()),
                      })
                    }
                    className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-400">{profileData.qualifications?.join(", ") || "N/A"}</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 mb-1">Years of Experience:</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.experienceYears || ""}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        experienceYears: Number(e.target.value),
                      })
                    }
                    className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-400">{profileData.experienceYears || "N/A"} years</p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            {isEditing ? (
              <button
                onClick={handleSaveClick}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-6 rounded-lg hover:from-teal-500 hover:to-green-500 transition duration-300 ease-in-out"
              >
                Save Info
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out"
              >
                Edit Info
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
