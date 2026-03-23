import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Employee.css";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    fetchCategories();
  }, []);

  const fetchEmployees = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          // Convert array to object for easy lookup
          const categoryMap = {};
          result.data.Result.forEach(cat => {
            categoryMap[cat.id] = cat.name;
          });
          setCategories(categoryMap);
        } else {
          console.log("Error fetching categories:", result.data.Error);
        }
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
        // Fallback categories if API fails
        setCategories({
          1: "Engineering",
          2: "Marketing", 
          3: "Sales",
          4: "HR",
          5: "Finance",
          6: "Operations"
        });
      });
  };

  const getCategoryName = (categoryId) => {
    return categories[categoryId] || "Uncategorized";
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios.delete('http://localhost:3000/auth/delete_employee/'+id)
      .then(result => {
          if(result.data.Status) {
              fetchEmployees();
          } else {
              alert(result.data.Error);
          }
      })
      .catch(err => console.log(err));
    }
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailModal(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employee.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.phone && emp.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    getCategoryName(emp.category_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(salary);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return "N/A";
    // Return the phone exactly as provided (no formatting)
    return phone;
  };

  if (loading) {
    return (
      <div className="employee-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-container">
      {/* Employee Detail Modal */}
      {showDetailModal && selectedEmployee && (
        <div className="employee-detail-modal">
          <div className="modal-overlay" onClick={handleCloseDetails}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Employee Details</h2>
              <button className="close-btn" onClick={handleCloseDetails}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="employee-profile-section">
                <div className="profile-image-large">
                  {selectedEmployee.image ? (
                    <img
                      src={`http://localhost:3000/Images/` + selectedEmployee.image}
                      alt={selectedEmployee.name}
                      className="profile-img"
                    />
                  ) : (
                    <div className="profile-placeholder">
                      <i className="bi bi-person-circle"></i>
                    </div>
                  )}
                </div>
                <div className="profile-info">
                  <h3>{selectedEmployee.name}</h3>
                  <p className="employee-id">Employee ID: {selectedEmployee.id}</p>
                  <div className="employee-tags">
                    <span className="employee-role">{selectedEmployee.role || "Employee"}</span>
                    <span className="category-badge">
                      {getCategoryName(selectedEmployee.category_id)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-section">
                  <h4>Contact Information</h4>
                  <div className="detail-item">
                    <i className="bi bi-envelope"></i>
                    <div>
                      <label>Email</label>
                      <span>{selectedEmployee.email}</span>
                    </div>
                  </div>
                  
                  {/* Phone Number in Modal */}
                  <div className="detail-item">
                    <i className="bi bi-telephone"></i>
                    <div>
                      <label>Phone Number</label>
                      <span className="phone-number">{formatPhone(selectedEmployee.phone)}</span>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <i className="bi bi-geo-alt"></i>
                    <div>
                      <label>Address</label>
                      <span>{selectedEmployee.address}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Employment Details</h4>
                  <div className="detail-item">
                    <i className="bi bi-currency-dollar"></i>
                    <div>
                      <label>Salary</label>
                      <span className="salary">{formatSalary(selectedEmployee.salary)}/month</span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="bi bi-tags"></i>
                    <div>
                      <label>Category</label>
                      <span className="category-name">
                        {getCategoryName(selectedEmployee.category_id)}
                      </span>
                    </div>
                  </div>
                  <div className="detail-item">
                    <i className="bi bi-calendar"></i>
                    <div>
                      <label>Join Date</label>
                      <span>{formatDate(selectedEmployee.join_date)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEmployee.description && (
                <div className="detail-section">
                  <h4>About</h4>
                  <p className="employee-description">{selectedEmployee.description}</p>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-edit" onClick={() => navigate(`/dashboard/edit_employee/` + selectedEmployee.id)}>
                <i className="bi bi-pencil"></i>
                Edit Employee
              </button>
              <button className="btn-close" onClick={handleCloseDetails}>
                <i className="bi bi-x"></i>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="employee-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Employee Management</h1>
            <p>Manage your team members and their information</p>
          </div>
          <Link to="/dashboard/add_employee" className="add-employee-btn">
            <i className="bi bi-person-plus"></i>
            Add Employee
          </Link>
        </div>
      </div>

      <div className="employee-content">
        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search employees by name, email, phone, address, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Employee Table */}
        <div className="table-container">
          <div className="table-header">
            <h3>Employee List ({filteredEmployees.length})</h3>
            <div className="table-actions">
              <button className="refresh-btn" onClick={fetchEmployees}>
                <i className="bi bi-arrow-clockwise"></i>
                Refresh
              </button>
            </div>
          </div>

          {filteredEmployees.length === 0 ? (
            <div className="no-data">
              <i className="bi bi-people"></i>
              <h4>No employees found</h4>
              <p>Try adjusting your search or add a new employee</p>
              <Link to="/dashboard/add_employee" className="add-btn">
                Add Employee
              </Link>
            </div>
          ) : (
            <div className="modern-table-wrapper">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Category</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((e) => (
                    <tr key={e.id} className="employee-row">
                      <td>
                        <div className="employee-info-cell">
                          <div className="employee-avatar">
                            {e.image ? (
                              <img
                                src={`http://localhost:3000/Images/` + e.image}
                                alt={e.name}
                                className="avatar-img"
                              />
                            ) : (
                              <div className="avatar-placeholder">
                                <i className="bi bi-person-circle"></i>
                              </div>
                            )}
                          </div>
                          <div className="employee-details">
                            <span className="employee-name">{e.name}</span>
                            <span className="employee-id">ID: {e.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="category-cell">
                          <span className="category-tag">
                            {getCategoryName(e.category_id)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <span className="email">{e.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="phone-info">
                          <span className="phone-number">{formatPhone(e.phone)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="salary-info">
                          <span className="salary-amount">{formatSalary(e.salary)}</span>
                          <span className="salary-period">/month</span>
                        </div>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/dashboard/edit_employee/` + e.id}
                            className="btn-edit"
                            title="Edit Employee"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(e.id, e.name)}
                            title="Delete Employee"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                          <button
                            className="btn-view"
                            onClick={() => handleViewDetails(e)}
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;