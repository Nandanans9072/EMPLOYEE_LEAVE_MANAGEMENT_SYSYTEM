import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link, useLocation, Outlet } from 'react-router-dom'
import { 
  FaTachometerAlt, FaCogs, FaClipboardList, FaBell
} from 'react-icons/fa'
import './EmployeeDetail.css'

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [hasUnreadNotif, setHasUnreadNotif] = useState(false);
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Fetch employee details
  useEffect(() => {
    axios.get(`http://localhost:3000/employee/detail/${id}`)
      .then(result => {
        if (result.data.Status && result.data.Result.length > 0) {
          setEmployee(result.data.Result[0])
        } else {
          setEmployee({})
        }
      }).catch(() => setEmployee({}))
  }, [id]);

  // Poll for new notifications for this employee
  useEffect(() => {
    if (!id) return;
    const fetchNotifications = () => {
      axios.get(`http://localhost:3000/employee/notifications/${id}`)
        .then(res => {
          if (res.data.Status) {
            setNotifications(res.data.Result);
            setHasUnreadNotif(res.data.Result.length > 0);
          }
        }).catch(console.log);
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const handleMarkRead = () => {
    axios.post(`http://localhost:3000/employee/notifications/read/${id}`)
      .then(res => {
        if (res.data.Status) {
          setShowNotif(false);
          setHasUnreadNotif(false);
          setNotifications([]);
        }
      });
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout').then(result => {
      if (result.data.Status) {
        localStorage.removeItem("valid")
        navigate('/')
      }
    });
  };

  const basePath = `/employee_detail/${id}`;
  const leavePath = `/employee_detail/${id}/leave`;
  const settingPath = `/employee-dashboard/setting/${id}`;
  const currentPath = location.pathname;

  return (
    <div className="emp-dashboard">
      {/* Sidebar */}
      <div className="emp-sidebar">
        <h4>Employee Portal</h4>
        <ul className="nav flex-column">
          <li className={`nav-item ${currentPath === basePath ? 'active' : ''}`}>
            <Link to={basePath} className="nav-link">
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          <li className={`nav-item ${currentPath === leavePath ? 'active' : ''}`}>
            <Link to={leavePath} className="nav-link"><FaClipboardList className="me-2" /> Leave Management</Link>
          </li>
          <li className={`nav-item ${currentPath === settingPath ? 'active' : ''}`}>
            <Link to={settingPath} className="nav-link"><FaCogs className="me-2" /> Settings</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="emp-main">
        {/* Topbar */}
        <div className="emp-topbar">
          <div>
            <h2 className="welcome-badge">Employee ID: #{employee.id || id}</h2>
          </div>
          <div className="topbar-actions">
            <button className="btn-notification" onClick={() => setShowNotif(v => !v)}>
              <FaBell />
              {hasUnreadNotif && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </button>
            {showNotif && notifications.length > 0 && (
              <div className="notification-popup">
                <strong>🔔 Leave Status Update!</strong>
                <ul>
                  {notifications.map(n => (
                    <li key={n.id}>
                      <b>{n.leave_type}</b> leave ({n.start_date}–{n.end_date}) was&nbsp;
                      <span style={{
                        color: n.status === "approved" ? "green" : "red",
                        fontWeight: 600
                      }}>{n.status.toUpperCase()}</span>
                    </li>
                  ))}
                </ul>
                <button className="notif-close-btn" onClick={handleMarkRead}>
                  Mark as read
                </button>
              </div>
            )}
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        {/* Dashboard Content */}
        {currentPath === basePath && (
          <div className="dashboard-content">
            <div className="welcome-card">
              <div className="welcome-content">
                <div className="d-flex align-items-center">
                  <div className="welcome-text">
                    <h5 className="mb-1 opacity-90">Welcome Back</h5>
                    <h2 className="mb-0 fw-bold">{employee.name || "Employee"}</h2>
                    <p className="mb-0 opacity-80">Have a productive day!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-section">
              <div className="profile-card">
                <img
                  src={employee.image
                    ? `http://localhost:3000/Images/${employee.image}`
                    : 'https://placehold.co/120x120/667eea/ffffff?text=EMP'
                  }
                  alt="Employee"
                  className="emp-photo"
                  onError={e => { e.target.src = 'https://placehold.co/120x120/667eea/ffffff?text=EMP' }}
                />
                <h5 className="fw-bold mb-2">{employee.name || "Employee"}</h5>
                <p className="text-muted mb-3">{employee.email || "No email"}</p>
              </div>
            </div>
          </div>
        )}
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default EmployeeDetail;
