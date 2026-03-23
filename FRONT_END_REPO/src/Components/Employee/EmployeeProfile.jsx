import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updates, setUpdates] = useState({
    name: "",
    email: "",
    address: "",
    salary: "",
  });

  // Fetch employee data
  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(res => {
        if (res.data.Status && res.data.Result.length > 0) {
          setEmployee(res.data.Result[0]);
          setUpdates(res.data.Result[0]);
        }
      });
  }, [id]);

  // Handle update fields
  const handleChange = (e) => {
    setUpdates({ ...updates, [e.target.name]: e.target.value });
  };

  // Submit update
const handleSave = () => {
  axios.put(`http://localhost:3000/employee/update/${id}`, updates)
    .then(res => {
      if (res.data.Status) {
        // ✅ Show success to employee
        alert("Profile updated successfully!");

        // ✅ Send notification to admin
        axios.post("http://localhost:3000/admin/profile-update-notification", {
          employee_id: id,
          message: "Employee updated profile."
        })
        .then(() => console.log("Admin notified"))
        .catch(() => console.error("Failed to notify admin"));

        // ✅ Update local state
        setEditMode(false);
        setEmployee(updates);
      } else {
        alert("Update failed!");
      }
    })
    .catch(() => alert("Error updating profile"));
};



  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">

        <img
          src={employee.image 
            ? `http://localhost:3000/Images/${employee.image}`
            : "https://placehold.co/130x130/667eea/ffffff?text=EMP"}
          alt="profile"
          className="profile-photo"
        />

        {/* Details */}
        <div className="profile-details">

          {/* NAME */}
          <div className="profile-field">
            <label>Name:</label>
            {editMode ? (
              <input name="name" value={updates.name} onChange={handleChange} />
            ) : (
              <p>{employee.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="profile-field">
            <label>Email:</label>
            {editMode ? (
              <input name="email" value={updates.email} onChange={handleChange} />
            ) : (
              <p>{employee.email}</p>
            )}
          </div>

          {/* ADDRESS */}
          <div className="profile-field">
            <label>Address:</label>
            {editMode ? (
              <textarea name="address" value={updates.address} onChange={handleChange}></textarea>
            ) : (
              <p>{employee.address}</p>
            )}
          </div>

          {/* SALARY (Allowed to edit? optional) */}
          <div className="profile-field">
            <label>Salary:</label>
            <p>{employee.salary}</p>
          </div>

        </div>

        {/* Buttons */}
        <div className="profile-actions">
          {!editMode ? (
            <button className="profile-btn edit" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          ) : (
            <>
              <button className="profile-btn save" onClick={handleSave}>
                Save
              </button>
              <button className="profile-btn cancel" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
