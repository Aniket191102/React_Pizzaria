import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    id: "", // Include ID if needed for update
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setProfile({
        id: user.id || "", // Get the user ID
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your API expects the user ID in the URL like /users/:id
      const response = await axios.put(`http://localhost:3000/users/${profile.id}`, profile, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200 || response.status === 204) {
        // Update localStorage with new profile info
        localStorage.setItem("user", JSON.stringify(profile));
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Manage Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Address
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
