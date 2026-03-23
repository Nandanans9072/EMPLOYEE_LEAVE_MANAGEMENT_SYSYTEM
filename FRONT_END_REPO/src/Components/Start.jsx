import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Start.css';

const Start = () => {
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    axios.defaults.withCredentials = true;
    
    useEffect(() => {
        setAnimate(true);
        
        axios.get('http://localhost:3000/verify')
        .then(result => {
            setIsLoading(false);
            if(result.data.Status) {
                if(result.data.role === "admin") {
                    navigate('/dashboard');
                } else {
                    navigate('/employee_detail/'+result.data.id);
                }
            }
        }).catch(err => {
            setIsLoading(false);
            console.log(err);
        });
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="start-container">
                <div className="background-overlay"></div>
                <div className="loading-card">
                    <div className="spinner-large"></div>
                    <h3>Checking Authentication...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="start-container">
            <div className="background-overlay_start"></div>
            
            <div className={`start-card ${animate ? 'card-enter_start' : ''}`}>
                <div className="card-header_start">
                    <div className="logo-container_start">
                        <div className="logo-circle_start">
                            <i className="logo-icon_start">🚀</i>
                        </div>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Choose your login method</p>
                </div>

                <div className="role-selection">
                    <div className="role-card" onClick={() => {navigate('/employee_login')}}>
                        <div className="role-icon employee-icon">
                            <i className="bi bi-person-badge"></i>
                        </div>
                        <h3>Employee</h3>
                        <p>Access your workspace and tasks</p>
                        <div className="role-button">
                            Employee
                            <span className="arrow">→</span>
                        </div>
                    </div>

                    <div className="role-card" onClick={() => {navigate('/adminlogin')}}>
                        <div className="role-icon admin-icon">
                            <i className="bi bi-shield-check"></i>
                        </div>
                        <h3>Administrator</h3>
                        <p>Manage system and users</p>
                        <div className="role-button">
                            Admin
                            <span className="arrow">→</span>
                        </div>
                    </div>
                </div>

                
            </div>

            {/* Floating elements for background */}
            <div className="floating-elements_start">
                <div className="float-circle_start circle-1_start"></div>
                <div className="float-circle_start circle-2_start"></div>
                <div className="float-circle_start circle-3_start"></div>
            </div>
        </div>
    );
};

export default Start;