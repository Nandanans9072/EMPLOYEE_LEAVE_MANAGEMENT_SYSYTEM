import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EmployeeLeave.css";

const EmployeeLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
  const fetchLeaves = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/employee/leave_report/${id}`);
        setLeaves(response.data.Status ? response.data.Result : []);
      } catch (error) {
        console.error("Error fetching leaves:", error);
        setLeaves([]);
      }
      setLoading(false);
    };
    fetchLeaves();
  }, [id]);

  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.status.toLowerCase().includes(search.toLowerCase()) ||
      leave.leave_type.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
const handleDelete = async (leaveId) => {
  if (!window.confirm("Are you sure you want to delete this leave request?")) return;
  try {
    await axios.delete(`http://localhost:3000/employee/delete_leave/${leaveId}`);
    setLeaves(leaves.filter(l => l.leave_id !== leaveId)); // Update UI instantly
    alert("Leave request deleted.");
    window.location.reload();
  } catch (err) {
    alert("Failed to delete leave!");
    console.error(err);
  }
};

const handleEdit = (leave) => {
  // navigate to the edit leave page and pass leave data
  navigate(`/employee_detail/${id}/editleave/${leave.leave_id}`, { state: { leave } });
};


  const calculateDays = (from, to) => {
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const getStats = () => {
    const total = leaves.length;
    const pending = leaves.filter((leave) => leave.status === "pending").length;
    const approved = leaves.filter((leave) => leave.status === "approved").length;
    const rejected = leaves.filter((leave) => leave.status === "rejected").length;

    return { total, pending, approved, rejected };
  };

  const stats = getStats();

  return (
    <div className="leave-container">
      {/* Header Section */}
      <div className="leave-header">
        <div className="header-content">
          <div className="header-info">
            <div className="header-icon">📋</div>
            <div className="header-text">
              <h1>Leave Management</h1>
              <p>Manage and track your leave requests</p>
            </div>
          </div>
          <button className="add-leave-btn" onClick={() => navigate(`/employee_detail/${id}/addleave`)}>
            <span>+</span> Add Leave Request
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon total">📊</div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Leaves</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon approved">✅</div>
          <div className="stat-info">
            <h3>{stats.approved}</h3>
            <p>Approved</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon rejected">❌</div>
          <div className="stat-info">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by status or leave type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Leaves Section */}
      <div className="leaves-section">
        <div className="section-header">
          <h3>Your Leave Requests</h3>
          <span className="leave-count">
            {filteredLeaves.length} {filteredLeaves.length === 1 ? "request" : "requests"}
          </span>
        </div>

        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Leave Type</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <tr key={index} className="loading-row">
                    <td colSpan="7">
                      <div
                        style={{
                          height: "20px",
                          background: "#f1f5f9",
                          borderRadius: "6px",
                          margin: "0.5rem 0",
                        }}
                      ></div>
                    </td>
                  </tr>
                ))
              ) : filteredLeaves.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="empty-state">
                      <div className="empty-icon">📝</div>
                      <h4>No leave requests found</h4>
                      <p>
                        {search
                          ? "No leaves match your search criteria. Try adjusting your search terms."
                          : "You haven't applied for any leaves yet. Get started by adding your first leave request."}
                      </p>
                      <button
                        className="add-leave-btn"
                        onClick={() => navigate(`/employee_detail/${id}/addleave`)}
                      >
                        <span>+</span> Add Your First Leave
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((leave, index) => (
                  <tr key={leave.leave_id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className="type-badge">{leave.leave_type}</span>
                    </td>
                    <td>
                      <div className="duration-info">
                        <div className="date-range">
                          <span className="date-icon">📅</span>
                          {formatDate(leave.start_date)} - {formatDate(leave.end_date)}
                        </div>
                        <span className="days-count">{calculateDays(leave.start_date, leave.end_date)} days</span>
                      </div>
                    </td>
                    <td>
                      <div className="description" title={leave.reason}>
                        {leave.reason}
                      </div>
                    </td>
                    <td>
                      <div className="applied-date">
                        <span className="clock-icon">⏰</span>
                        {formatDate(leave.applied_at)}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${leave.status.toLowerCase()}`}>
                        {leave.status === "pending" && "⏳"}
                        {leave.status === "approved" && "✅"}
                        {leave.status === "rejected" && "❌"}
                        {leave.status}
                      </span>
                    </td>
                      <td>
                        <div className="action-buttons">
                          {/* Only allow edit and delete for pending leaves */}
                          {leave.status?.toLowerCase() === "pending" && (
                            <>
                              <button
                                className="btn-edit"
                                title="Edit Leave"
                                onClick={() => handleEdit(leave)}
                              >
                                ✏️
                              </button>
                              <button
                                className="btn-delete"
                                title="Delete Leave"
                                onClick={() => handleDelete(leave.id)}
                              >🗑️</button>
                            </>
                          )}
                        </div>
                      </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeave;
