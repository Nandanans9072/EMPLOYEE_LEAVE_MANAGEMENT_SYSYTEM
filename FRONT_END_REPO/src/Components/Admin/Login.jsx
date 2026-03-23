import React, { useState, useEffect } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [animate, setAnimate] = useState(false)
    const navigate = useNavigate()
    
    axios.defaults.withCredentials = true;

    useEffect(() => {
        setAnimate(true)
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            setIsLoading(false)
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => {
            setIsLoading(false)
            setError('Connection error. Please try again.')
            console.log(err)
        })
    }

    return (
        <div className='login-container_log'>
            <div className='background-overlay_log'></div>
            
            <div className={`login-card_log ${animate ? 'card-enter_log' : ''}`}>
                <div className='card-header_log'>
                    <div className='logo-container_log'>
                        <div className='logo-circle_log'>
                            <i className='logo-icon_log'>🔒</i>
                        </div>
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Admin</p>
                </div>

                <div className={`error-message_log ${error ? 'error-show_log' : ''}`}>
                    {error && (
                        <div className='error-content_log'>
                            <span className='error-icon_log'>⚠️</span>
                            {error}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className='login-form_log'>
                    <div className='input-group_log'>
                        <label htmlFor="email">Email Address</label>
                        <div className='input-container_log'>
                            <input 
                                type="email" 
                                name='email' 
                                autoComplete='off' 
                                placeholder='Enter your email'
                                value={values.email}
                                onChange={(e) => setValues({...values, email: e.target.value})}
                                className='form-input_log'
                            />
                            <span className='input-icon_log'>✉️</span>
                        </div>
                    </div>

                    <div className='input-group_log'>
                        <label htmlFor="password">Password</label>
                        <div className='input-container_log'>
                            <input 
                                type="password" 
                                name='password' 
                                placeholder='Enter your password'
                                value={values.password}
                                onChange={(e) => setValues({...values, password: e.target.value})}
                                className='form-input_log'
                            />
                            <span className='input-icon_log'>🔒</span>
                        </div>
                    </div>

                    <div className='form-options_log'>
                        <label className='checkbox-label_log'>
                            <input type="checkbox" name="tick" id="tick" className='checkbox-input_log'/>
                            <span className='checkmark_log'></span>
                            Remember me
                        </label>
                        
                    </div>

                    <button 
                        type="submit" 
                        className={`login-button_log ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className='button-loader_log'>
                                <div className='spinner_log'></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                
            </div>

            {/* Floating elements for background */}
            <div className='floating-elements_log'>
                <div className='float-circle_log circle-1_log'></div>
                <div className='float-circle_log circle-2_log'></div>
                <div className='float-circle_log circle-3_log'></div>
            </div>
        </div>
    )
}

export default Login