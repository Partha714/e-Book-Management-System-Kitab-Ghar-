import axios from "axios";
import API from "../../api"
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [profileData, setProfileData] = useState(null);
  const [value, setValue] = useState({ address: "" });
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // 🔹 Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get(
          "/get-user-information",
          { headers }
        );

        setProfileData(response.data);
        setValue({ address: response.data.address });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔹 Handle input change
  const change = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // 🔥 Update address
  const handleUpdate = async () => {
    try {
      const response = await API.put(
        "/update-user-address",
        value,
        { headers }
      );

      alert(response.data.message || "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update address");
    }
  };

  // ⏳ Loader
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-950">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen p-6">
      <h1 className="text-2xl text-yellow-100 font-semibold mb-6">
        Account Settings
      </h1>

      <div className="bg-zinc-800 p-6 rounded-lg max-w-xl space-y-4">
        
        {/* Username */}
        <div>
          <label className="block text-zinc-300 mb-1">Username</label>
          <input
            type="text"
            value={profileData.username}
            disabled
            className="w-full bg-zinc-900 text-zinc-400 p-3 rounded border border-zinc-700 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-zinc-300 mb-1">Email</label>
          <input
            type="email"
            value={profileData.email}
            disabled
            className="w-full bg-zinc-900 text-zinc-400 p-3 rounded border border-zinc-700 cursor-not-allowed"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-zinc-300 mb-1">Address</label>
          <textarea
            name="address"
            value={value.address}
            onChange={change}
            rows="4"
            className="w-full bg-zinc-900 text-white p-3 rounded border border-zinc-700
                       focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold
                     active:scale-95 transition"
        >
          Update Address
        </button>
      </div>
    </div>
  );
};

export default Settings;
