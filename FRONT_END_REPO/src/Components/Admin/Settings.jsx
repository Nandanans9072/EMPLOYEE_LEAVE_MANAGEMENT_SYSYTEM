import React, { useState } from "react";
import { FaCog, FaUser, FaBell, FaShield, FaDatabase, FaPalette, FaSave, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    // Profile Settings
    profile: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@companymail.com",
      phone: "+1 (555) 123-4567",
      position: "Administrator"
    },
    // Notification Settings
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      salaryUpdates: true,
      leaveRequests: true,
      systemAlerts: true
    },
    // Security Settings
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordChangeRequired: false
    },
    // System Settings
    system: {
      autoBackup: true,
      backupFrequency: "daily",
      dataRetention: 365,
      maxFileSize: 10
    },
    // Appearance Settings
    appearance: {
      theme: "light",
      sidebarCollapsed: false,
      density: "comfortable",
      language: "english"
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = (section) => {
    // Here you would typically make an API call to save settings
    console.log(`Saving ${section} settings:`, settings[section]);
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    // Here you would typically make an API call to change password
    console.log("Changing password...");
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "security", label: "Security", icon: <FaShield /> },
    { id: "system", label: "System", icon: <FaDatabase /> },
    { id: "appearance", label: "Appearance", icon: <FaPalette /> }
  ];

  return (
    <div className="settings-container">
      {/* Header Section */}
      <div className="settings-header">
        <div className="header-content">
          <div className="header-info">
            <div className="header-icon">
              <FaCog />
            </div>
            <div className="header-text">
              <h1>Settings</h1>
              <p>Manage your account preferences and system configuration</p>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-content">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <div className="sidebar-header">
            <h3>Preferences</h3>
          </div>
          <nav className="sidebar-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="nav-icon">{tab.icon}</span>
                <span className="nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="settings-main">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Profile Settings</h2>
                <p>Update your personal information and contact details</p>
              </div>
              
              <div className="settings-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={settings.profile.firstName}
                      onChange={(e) => handleInputChange("profile", "firstName", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={settings.profile.lastName}
                      onChange={(e) => handleInputChange("profile", "lastName", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => handleInputChange("profile", "email", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={settings.profile.phone}
                      onChange={(e) => handleInputChange("profile", "phone", e.target.value)}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={settings.profile.position}
                      onChange={(e) => handleInputChange("profile", "position", e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="save-btn"
                    onClick={() => handleSaveSettings("profile")}
                  >
                    <FaSave />
                    Save Profile Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Notification Preferences</h2>
                <p>Choose how and when you want to be notified</p>
              </div>
              
              <div className="settings-form">
                <div className="toggle-group">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Email Notifications</h4>
                      <p>Receive important updates via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleInputChange("notifications", "emailNotifications", e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Push Notifications</h4>
                      <p>Get instant browser notifications</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => handleInputChange("notifications", "pushNotifications", e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Salary Updates</h4>
                      <p>Notifications about payroll and salary changes</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.salaryUpdates}
                        onChange={(e) => handleInputChange("notifications", "salaryUpdates", e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Leave Requests</h4>
                      <p>Alerts for new leave applications</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.leaveRequests}
                        onChange={(e) => handleInputChange("notifications", "leaveRequests", e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>System Alerts</h4>
                      <p>Important system maintenance notifications</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.notifications.systemAlerts}
                        onChange={(e) => handleInputChange("notifications", "systemAlerts", e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="save-btn"
                    onClick={() => handleSaveSettings("notifications")}
                  >
                    <FaSave />
                    Save Notification Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Security Settings</h2>
                <p>Manage your account security and privacy</p>
              </div>
              
              <div className="settings-form">
                <div className="toggle-group">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleInputChange("security", "twoFactorAuth", e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Require Password Change</h4>
                      <p>Force password change on next login</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.security.passwordChangeRequired}
                        onChange={(e) => handleInputChange("security", "passwordChangeRequired", e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Session Timeout (minutes)</label>
                  <select
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleInputChange("security", "sessionTimeout", parseInt(e.target.value))}
                    className="form-input"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
                
                <div className="password-section">
                  <h3>Change Password</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Current Password</label>
                      <div className="password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="form-input"
                          placeholder="Enter current password"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>New Password</label>
                      <div className="password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="form-input"
                          placeholder="Enter new password"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <div className="password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="form-input"
                          placeholder="Confirm new password"
                        />
                        <button 
                          type="button"
                          className="password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="change-password-btn"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="save-btn"
                    onClick={() => handleSaveSettings("security")}
                  >
                    <FaSave />
                    Save Security Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>System Settings</h2>
                <p>Configure system behavior and data management</p>
              </div>
              
              <div className="settings-form">
                <div className="toggle-group">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h4>Automatic Backups</h4>
                      <p>Automatically backup system data</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.system.autoBackup}
                        onChange={(e) => handleInputChange("system", "autoBackup", e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Backup Frequency</label>
                    <select
                      value={settings.system.backupFrequency}
                      onChange={(e) => handleInputChange("system", "backupFrequency", e.target.value)}
                      className="form-input"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Data Retention (days)</label>
                    <input
                      type="number"
                      value={settings.system.dataRetention}
                      onChange={(e) => handleInputChange("system", "dataRetention", parseInt(e.target.value))}
                      className="form-input"
                      min={30}
                      max={1095}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Max File Size (MB)</label>
                    <input
                      type="number"
                      value={settings.system.maxFileSize}
                      onChange={(e) => handleInputChange("system", "maxFileSize", parseInt(e.target.value))}
                      className="form-input"
                      min={1}
                      max={50}
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="save-btn"
                    onClick={() => handleSaveSettings("system")}
                  >
                    <FaSave />
                    Save System Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="settings-section">
              <div className="section-header">
                <h2>Appearance Settings</h2>
                <p>Customize the look and feel of your dashboard</p>
              </div>
              
              <div className="settings-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Theme</label>
                    <select
                      value={settings.appearance.theme}
                      onChange={(e) => handleInputChange("appearance", "theme", e.target.value)}
                      className="form-input"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto (System)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Sidebar Behavior</label>
                    <select
                      value={settings.appearance.sidebarCollapsed ? "collapsed" : "expanded"}
                      onChange={(e) => handleInputChange("appearance", "sidebarCollapsed", e.target.value === "collapsed")}
                      className="form-input"
                    >
                      <option value="expanded">Always Expanded</option>
                      <option value="collapsed">Collapsible</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Density</label>
                    <select
                      value={settings.appearance.density}
                      onChange={(e) => handleInputChange("appearance", "density", e.target.value)}
                      className="form-input"
                    >
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Language</label>
                    <select
                      value={settings.appearance.language}
                      onChange={(e) => handleInputChange("appearance", "language", e.target.value)}
                      className="form-input"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="save-btn"
                    onClick={() => handleSaveSettings("appearance")}
                  >
                    <FaSave />
                    Save Appearance Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;