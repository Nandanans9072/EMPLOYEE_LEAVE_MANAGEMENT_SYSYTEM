import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("dashboard");
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAdmins: 0,
    totalSalary: 0,
    pendingLeaves: 0
  });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [employeeStats, setEmployeeStats] = useState({
    totalEmployees: 0,
    totalSalary: 0
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('/employee') || path.includes('/add_employee') || path.includes('/edit_employee')) {
      setActiveLink('employee');
    } else if (path.includes('Category')) setActiveLink('category');
    else if (path.includes('leaves')) setActiveLink('leaves');
    else if (path.includes('setting')) setActiveLink('setting');
    else setActiveLink('dashboard');

    fetchDashboardData();
    fetchEmployeeStats();
  }, []);

useEffect(() => {
  const fetchNotifications = () => {
    axios.get("http://localhost:3000/auth/notifications")
      .then(res => {
        if (res.data.Status) {
          setNotifications(res.data.Result);
        }
      })
      .catch(err => console.log(err));
  };

  fetchNotifications(); // initial fetch
  const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
  return () => clearInterval(interval);
}, []);


  const fetchDashboardData = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/dashboard-data')
      const data = await res.json();
      setStats({
        totalEmployees: data.totalEmployees,
        totalAdmins: data.totalAdmins,
        totalSalary: data.totalSalary,
        pendingLeaves: data.pendingLeaves
      });
      setRecentEmployees(data.recentEmployees || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      // Fallback demo data
      setStats({
        totalEmployees: 24,
        totalAdmins: 3,
        totalSalary: 125000,
        pendingLeaves: 5
      });
      setRecentEmployees([
        { id: 1, name: "John Doe", position: "Developer", department: "IT" },
        { id: 2, name: "Jane Smith", position: "Designer", department: "Creative" }
      ]);
    }
  }

  const fetchEmployeeStats = () => {
    axios.get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          const employees = result.data.Result;
          const totalSalary = employees.reduce((total, emp) => total + parseInt(emp.salary || 0), 0);
          setEmployeeStats({
            totalEmployees: employees.length,
            totalSalary: totalSalary
          });
          setStats(prevStats => ({
            ...prevStats,
            totalEmployees: employees.length,
            totalSalary: totalSalary
          }));
        }
      })
      .catch((err) => {
        console.log(err);
        // Fallback data
        setEmployeeStats({
          totalEmployees: 24,
          totalSalary: 125000
        });
      });
  };

  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleStatCardClick = (type) => {
    if (type === 'employees') {
      navigate('/dashboard/employee');
    } else if (type === 'salary') {
      navigate('/dashboard/employee');
    }
  };

  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [hasUnreadNotif, setHasUnreadNotif] = useState(false);

  useEffect(() => {
    const fetchPendingLeaves = () => {
      axios.get('http://localhost:3000/auth/leaves/pending')
        .then((res) => {
          if (res.data.Status) {
            setPendingLeaves(res.data.Result);
            setHasUnreadNotif(res.data.Result.length > 0);
          }
        })
        .catch((err) => {
          console.log(err);
          // Demo leave data
          setPendingLeaves([
            { id: 1, employee_name: "John Doe", leave_type: "Sick Leave", start_date: "2024-01-15", end_date: "2024-01-16" },
            { id: 2, employee_name: "Jane Smith", leave_type: "Vacation", start_date: "2024-01-20", end_date: "2024-01-25" }
          ]);
          setHasUnreadNotif(true);
        });
    };
    fetchPendingLeaves();
    const interval = setInterval(fetchPendingLeaves, 30000);
    return () => clearInterval(interval);
  }, []);

  // Demo data for charts and additional sections
  const departmentDistribution = [
    { name: "IT", value: 8, color: "#3b82f6" },
    { name: "HR", value: 4, color: "#ef4444" },
    { name: "Finance", value: 5, color: "#10b981" },
    { name: "Marketing", value: 7, color: "#f59e0b" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Team Meeting", date: "2024-01-10", type: "meeting" },
    { id: 2, title: "Project Deadline", date: "2024-01-15", type: "deadline" },
    { id: 3, title: "Company Workshop", date: "2024-01-20", type: "event" }
  ];

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <div className="brand-wrapper">
            <div className="logo">
              <i className="bi bi-building"></i>
            </div>
            {sidebarOpen && (
              <div className="brand-content">
                <h3 className="brand-title">EmployeeMS</h3>
                <span className="brand-subtitle">Admin Portal</span>
              </div>
            )}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <i className={`bi ${sidebarOpen ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
          </button>
        </div>

        {/* Profile Section */}
        <div className="sidebar-profile">
          <div className="profile-content">
            <label htmlFor="uploadImage" className="profile-image-container">
              {image ? (
                <img src={image} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
              )}
            </label>
            <input
              type="file"
              id="uploadImage"
              accept="image/*"
              onChange={handleImageUpload}
              className="d-none"
            />
            {sidebarOpen && (
              <div className="profile-info">
                <h5 className="profile-name">Admin User</h5>
                <span className="profile-role">Administrator</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link 
                to="/dashboard" 
                className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
              >
                <div className="nav-icon">
                  <i className="bi bi-speedometer2"></i>
                </div>
                {sidebarOpen && <span className="nav-text">Dashboard</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard/employee" 
                className={`nav-link ${activeLink === 'employee' ? 'active' : ''}`}
                onClick={() => handleNavClick('employee')}
              >
                <div className="nav-icon">
                  <i className="bi bi-people"></i>
                </div>
                {sidebarOpen && <span className="nav-text">Employees</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard/Category" 
                className={`nav-link ${activeLink === 'category' ? 'active' : ''}`}
                onClick={() => handleNavClick('category')}
              >
                <div className="nav-icon">
                  <i className="bi bi-building"></i>
                </div>
                {sidebarOpen && <span className="nav-text">Departments</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard/leaves" 
                className={`nav-link ${activeLink === 'leaves' ? 'active' : ''}`}
                onClick={() => handleNavClick('leaves')}
              >
                <div className="nav-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                {sidebarOpen && <span className="nav-text">Leaves</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/dashboard/settings" 
                className={`nav-link ${activeLink === 'settings' ? 'active' : ''}`}
                onClick={() => handleNavClick('settings')}
              >
                <div className="nav-icon">
                  <i className="bi bi-gear"></i>
                </div>
                {sidebarOpen && <span className="nav-text">Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <div className="logout-icon">
              <i className="bi bi-box-arrow-right"></i>
            </div>
            {sidebarOpen && <span className="logout-text">Logout</span>}
          </button>
        </div>
      </div>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <i className="bi bi-list"></i>
            </button>
            <div className="breadcrumb">
              <span className="page-title capitalize">{activeLink}</span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="user-actions">
              <button className="notification-btn" onClick={() => setShowNotif((v) => !v)}>
                <i className="bi bi-bell"></i>
                {hasUnreadNotif && (
                  <span className="notification-badge">{pendingLeaves.length}</span>
                )}
              </button>
              {showNotif && pendingLeaves.length > 0 && (
                <div className="notification-popup">
                  <strong>🔔 New Leave Request!</strong>
                  <ul>
                    {pendingLeaves.map(l => (
                      <li key={l.id}>
                        <strong>{l.employee_name || "Employee"}</strong> requested <b>{l.leave_type}</b> (
                        {(l.start_date && !isNaN(new Date(l.start_date))) ? new Date(l.start_date).toISOString().split('T')[0] : (l.start_date || "N/A")}
                        ::
                        {(l.end_date && !isNaN(new Date(l.end_date))) ? new Date(l.end_date).toISOString().split('T')[0] : (l.end_date || "N/A")}
                        )
                      </li>
                    ))}
                  </ul>
                  <button
                    className="notif-close-btn"
                    onClick={() => {
                      setShowNotif(false);
                      setHasUnreadNotif(false);
                    }}
                  >
                    Mark as read
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="content-area">
          <div className="content-wrapper">
            {activeLink === 'dashboard' ? (
              <div className="dashboard-overview">
                {/* Welcome Banner */}
                <div className="welcome-banner">
                  <div className="welcome-content">
                    <h1>Welcome back, Admin! 👋</h1>
                    <p>Here's what's happening with your team today.</p>
                  </div>
                  <div className="welcome-stats">
                    <div className="mini-stat">
                      <span className="mini-stat-value">{employeeStats.totalEmployees}</span>
                      <span className="mini-stat-label">Active Employees</span>
                    </div>
                    <div className="mini-stat">
                      <span className="mini-stat-value">{stats.pendingLeaves}</span>
                      <span className="mini-stat-label">Pending Actions</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                  <div 
                    className="stat-card clickable" 
                    onClick={() => handleStatCardClick('employees')}
                    title="Click to view employees"
                  >
                    <div className="stat-icon employees">
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-info">
                        <h3>{employeeStats.totalEmployees}</h3>
                        <p>Total Employees</p>
                      </div>
                      <div className="stat-trend up">
                        <i className="bi bi-arrow-up"></i>
                        {employeeStats.totalEmployees > 0 ? 'Live' : '0%'}
                      </div>
                    </div>
                  </div>

                  

                  <div 
                    className="stat-card clickable"
                    onClick={() => handleStatCardClick('salary')}
                    title="Click to view salary details"
                  >
                    <div className="stat-icon salary">
                      <i className="bi bi-cash-coin"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-info">
                        <h3>{formatCurrency(employeeStats.totalSalary)}</h3>
                        <p>Total Salary</p>
                      </div>
                      
                    </div>
                  </div>

                  
                </div>

             
               
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;