import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    phone: "",
    image: "",
  });
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);
    formData.append('phone', employee.phone);

    axios.post('http://localhost:3000/auth/add_employee', formData)
    .then(result => {
        setLoading(false);
        if(result.data.Status) {
            navigate('/dashboard/employee');
        } else {
            alert(result.data.Error);
        }
    })
    .catch(err => {
        setLoading(false);
        console.log(err);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEmployee({...employee, image: file});
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="add-employee-container">
      <div className="form-card">
        <div className="form-header">
          <div className="header-icon">
            <i className="bi bi-person-plus"></i>
          </div>
          <div className="header-text">
            <h2>Add New Employee</h2>
            <p>Fill in the details to create a new employee account</p>
          </div>
        </div>

        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="inputName" className="form-label">
                <i className="bi bi-person"></i>
                Full Name
              </label>
              <input
                type="text"
                className="form-input"
                id="inputName"
                placeholder="Enter employee's full name"
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="inputEmail" className="form-label">
                <i className="bi bi-envelope"></i>
                Email Address
              </label>
              <input
                type="email"
                className="form-input"
                id="inputEmail"
                placeholder="Enter email address"
                autoComplete="off"
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="form-group">
              <label htmlFor="inputPhone" className="form-label">
                <i className="bi bi-telephone"></i>
                Phone Number
              </label>
              <input
                type="tel"
                className="form-input"
                id="inputPhone"
                placeholder="Enter phone number"
                autoComplete="off"
                onChange={(e) =>
                  setEmployee({ ...employee, phone: e.target.value })
                }
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="inputPassword" className="form-label">
                <i className="bi bi-lock"></i>
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="inputPassword"
                placeholder="Create a password"
                onChange={(e) =>
                  setEmployee({ ...employee, password: e.target.value })
                }
                required
              />
            </div>

            {/* Salary Field */}
            <div className="form-group">
              <label htmlFor="inputSalary" className="form-label">
                <i className="bi bi-currency-dollar"></i>
                Salary
              </label>
              <input
                type="text"
                className="form-input"
                id="inputSalary"
                placeholder="Enter monthly salary"
                autoComplete="off"
                onChange={(e) =>
                  setEmployee({ ...employee, salary: e.target.value })
                }
                required
              />
            </div>

            {/* Category Field */}
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                <i className="bi bi-building"></i>
                Department
              </label>
              <select 
                name="category" 
                id="category" 
                className="form-select"
                onChange={(e) => setEmployee({...employee, category_id: e.target.value})}
                required
              >
                <option value="">Select Department</option>
                {category.map((c) => {
                  return <option key={c.id} value={c.id}>{c.name}</option>;
                })}
              </select>
            </div>

            {/* Address Field */}
            <div className="form-group full-width">
              <label htmlFor="inputAddress" className="form-label">
                <i className="bi bi-geo-alt"></i>
                Address
              </label>
              <textarea
                className="form-input"
                id="inputAddress"
                placeholder="Enter complete address"
                rows="3"
                onChange={(e) =>
                  setEmployee({ ...employee, address: e.target.value })
                }
                required
              ></textarea>
            </div>

            {/* Image Upload Field */}
            <div className="form-group full-width">
              <label className="form-label">
                <i className="bi bi-image"></i>
                Profile Image
              </label>
              <div className="image-upload-container">
                <div className="image-preview">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="preview-image" />
                  ) : (
                    <div className="image-placeholder">
                      <i className="bi bi-person-circle"></i>
                      <span>No image selected</span>
                    </div>
                  )}
                </div>
                <label htmlFor="inputGroupFile01" className="upload-btn">
                  <i className="bi bi-cloud-upload"></i>
                  Choose Image
                  <input
                    type="file"
                    id="inputGroupFile01"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="file-input"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Adding Employee...
                </>
              ) : (
                <>
                  <i className="bi bi-person-plus"></i>
                  Add Employee
                </>
              )}
            </button>
            
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/dashboard/employee')}
            >
              <i className="bi bi-arrow-left"></i>
              Back to Employees
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;