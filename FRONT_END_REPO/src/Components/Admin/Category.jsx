import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import { FaBuilding, FaPlus, FaUsers, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchEmployees();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const fetchEmployees = () => {
    setLoadingEmployees(true);
    axios.get('http://localhost:3000/auth/employee')
      .then(result => {
        if (result.data.Status) {
          setEmployees(result.data.Result || []);
        } else {
          console.log('Error fetching employees:', result.data.Error);
        }
      })
      .catch(err => console.log('Employees fetch error:', err))
      .finally(() => setLoadingEmployees(false));
  };

  const getEmployeesForCategory = (categoryId) => {
    return employees.filter(emp => Number(emp.category_id) === Number(categoryId));
  };

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" department?`)) {
      axios.delete(`http://localhost:3000/auth/delete_category/${id}`)
        .then(result => {
          if (result.data.Status) {
            fetchCategories();
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="category-container">
      {/* Header Section */}
      <div className="category-header">
        <div className="header-content">
          <div className="header-info">
            <div className="header-icon">
              <FaBuilding />
            </div>
            <div className="header-text">
              <h1>Department Management</h1>
              <p>Manage your organization's departments and teams</p>
            </div>
          </div>
          <Link to="/dashboard/add_category" className="add-department-btn">
            <FaPlus className="btn-icon" />
            Add Department
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      

      {/* Departments Table */}
      <div className="departments-section">
        <div className="section-header">
          <h3>All Departments ({category.length})</h3>
          <button className="refresh-btn" onClick={fetchCategories}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading departments...</p>
          </div>
        ) : (
          <div className="table-container">
            {category.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FaBuilding />
                </div>
                <h4>No Departments Found</h4>
                <p>Get started by creating your first department</p>
                <Link to="/dashboard/add_category" className="empty-btn">
                  <FaPlus className="btn-icon" />
                  Add Department
                </Link>
              </div>
            ) : (
              <div className="modern-table-wrapper">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>ID</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((c, index) => (
                      <React.Fragment key={c.id}>
                        <tr className="department-row">
                          <td>
                            <div className="department-info">
                              <div className="dept-avatar">
                                <FaBuilding />
                              </div>
                              <div className="dept-details">
                                <div className="dept-main">
                                  <span className="dept-name">{c.name}</span>
                                  <button className="expand-btn" onClick={() => toggleCategory(c.id)} aria-expanded={!!expandedCategories[c.id]}>
                                    {expandedCategories[c.id] ? <FaChevronUp /> : <FaChevronDown />}
                                  </button>
                                </div>
                                <span className="dept-meta">{getEmployeesForCategory(c.id).length} employees</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="dept-id">DEPT-{c.id.toString().padStart(3, '0')}</span>
                          </td>
                          <td>
                            <span className="status-badge active">Active</span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn-delete"
                                onClick={() => handleDelete(c.id, c.name)}
                                title="Delete Department"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedCategories[c.id] && (
                          <tr className="department-employee-row">
                            <td colSpan={4} className="employee-list-cell">
                              {loadingEmployees ? (
                                <div className="loading-small">Loading...</div>
                              ) : (
                                <ul className="employee-list">
                                  {getEmployeesForCategory(c.id).length === 0 ? (
                                    <li className="no-employees">No employees in this department</li>
                                  ) : (
                                    getEmployeesForCategory(c.id).map(emp => (
                                      <li key={emp.id} className="employee-list-item">
                                        <span className="emp-name">{emp.name}</span>
                                        <span className="emp-meta">{emp.email}</span>
                                      </li>
                                    ))
                                  )}
                                </ul>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;