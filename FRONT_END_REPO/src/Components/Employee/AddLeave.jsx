import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AddLeave.css";

const AddLeave = () => {
  const [values, setValues] = useState({
    employee_id: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setValues((prev) => ({ ...prev, employee_id: id }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Basic validation for leave dates
    if (new Date(values.end_date) < new Date(values.start_date)) {
      alert("End date cannot be before start date.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
  
try {
  const response = await axios.post("http://localhost:3000/employee/addleave", {
    ...values,
    leave_type: values.leave_type.trim(),
    reason: values.reason.trim(),
  });

  if (!response.data.Status) {
    // Show alert from backend
    alert(response.data.message);
    return;
  }

  alert("Leave applied successfully!");
  navigate(`/employee_detail/${id}/leave`);
} catch (err) {
  console.error(err);
  alert("Error submitting leave");
}

 };

  return (
    <div className="add-leave-container">
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit} className="add-leave-form">
        <label htmlFor="employee_id">Employee ID:</label>
        <input
          type="text"
          name="employee_id"
          id="employee_id"
          value={values.employee_id}
          onChange={handleChange}
          required
          readOnly
        />

        <label htmlFor="leave_type">Leave Type (e.g. Sick, Casual, Earned):</label>
        <input
          type="text"
          name="leave_type"
          id="leave_type"
          value={values.leave_type}
          onChange={handleChange}
          required
        />

        <label htmlFor="start_date">From Date:</label>
        <input
          type="date"
          name="start_date"
          id="start_date"
          value={values.start_date}
          onChange={handleChange}
          required
        />

        <label htmlFor="end_date">To Date:</label>
        <input
          type="date"
          name="end_date"
          id="end_date"
          value={values.end_date}
          onChange={handleChange}
          required
        />

        <label htmlFor="reason">Description / Reason:</label>
        <textarea
          name="reason"
          id="reason"
          value={values.reason}
          onChange={handleChange}
          rows={3}
          required
        />

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddLeave;
