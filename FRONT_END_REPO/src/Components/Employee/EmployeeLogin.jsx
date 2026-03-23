import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import './EmployeeLogin.css';
import axios from 'axios';

const EmployeeLogin = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => { setAnimate(true); }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    axios.post('http://localhost:3000/employee/employee_login', values)
      .then(result => {
        setIsLoading(false);
        if (result.data.loginStatus) {
          localStorage.setItem("valid", "true");
          navigate('/employee_detail/' + result.data.id);
        } else {
          setError(result.data.Error || "Invalid credentials.");
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError('Connection error. Please try again.');
      });
  };

  return (
    <div className='login-container'>
      <div className='background-overlay'></div>
      <div className={`login-card ${animate ? 'card-enter' : ''}`}>
        <div className='card-header'>
          <div className='logo-container'>
            <div className='logo-circle'>
              <i className='logo-icon'>👨‍💼</i>
            </div>
          </div>
          <h2>Employee Portal</h2>
          <p>Sign in to your employee account</p>
        </div>
        <div className={`error-message ${error ? 'error-show' : ''}`}>
          {error && (
            <div className='error-content'>
              <span className='error-icon'>⚠️</span>
              {error}
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='input-group'>
            <label htmlFor="email">Email Address</label>
            <div className='input-container'>
              <input
                type="email"
                name='email'
                autoComplete='off'
                placeholder='Enter your email'
                value={values.email}
                onChange={e => setValues({...values, email: e.target.value})}
                className='form-input'
                required
              />
              <span className='input-icon'>✉️</span>
            </div>
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <div className='input-container'>
              <input
                type="password"
                name='password'
                placeholder='Enter your password'
                value={values.password}
                onChange={e => setValues({...values, password: e.target.value})}
                className='form-input'
                required
              />
              <span className='input-icon'>🔒</span>
            </div>
          </div>
          <div className='form-options'>
            <label className='checkbox-label'>
              <input type="checkbox" name="tick" id="tick" className='checkbox-input' />
              <span className='checkmark'></span>
              You are Agree with terms & conditions
            </label>
          </div>
          <button
            type="submit"
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className='button-loader'>
                <div className='spinner'></div>
                Signing in...
              </div>
            ) : 'Log in'}
          </button>
        </form>
      </div>
      {/* Floating elements for background */}
      <div className='floating-elements'>
        <div className='float-circle circle-1'></div>
        <div className='float-circle circle-2'></div>
        <div className='float-circle circle-3'></div>
      </div>
    </div>
  );
};
export default EmployeeLogin;
