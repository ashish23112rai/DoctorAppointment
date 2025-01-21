import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { user,doctor,token,doctorToken,backendUrl } = useAppContext();
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State to handle the image file

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", user._id); // Pass userId
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("phone", profileData.phone);
      formData.append("address", JSON.stringify(profileData.address));
      formData.append("dob", profileData.dob);
      formData.append("gender", profileData.gender);

      if (imageFile) {
        formData.append("image", imageFile); // Append image file
      }

      const response = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setProfileData({ ...profileData, image: response.data.updatedImage || profileData.image });
        setIsEditing(false); // Disable editing after saving
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile.");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Update the image file state
  };

  useEffect(() => {
    if (user) {
      setProfileData(user);
    }
  }, [user]);

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img
                src={profileData.image || "https://via.placeholder.com/150"}
                alt="User Profile"
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

          {/* Basic Information */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-1">Gender:</p>
                {isEditing ? (
                  <select
                    value={profileData.gender || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, gender: e.target.value })
                    }
                    className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-400">{profileData.gender || "N/A"}</p>
                )}
              </div>
              <div>
                <p className="text-gray-300 mb-1">Date of Birth:</p>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.dob || ""}
                    onChange={(e) =>
                      setProfileData({ ...profileData, dob: e.target.value })
                    }
                    className="w-full bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-gray-400">{profileData.dob || "N/A"}</p>
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

export default MyProfile;
