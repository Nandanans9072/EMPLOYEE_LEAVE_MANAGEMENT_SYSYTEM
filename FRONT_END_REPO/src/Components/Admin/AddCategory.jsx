import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBuilding, FaPlus, FaArrowLeft } from 'react-icons/fa'
import './AddCategory.css'

const AddCategory = () => {
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!category.trim()) {
            alert('Please enter a category name')
            return
        }
        
        setLoading(true)
        axios.post('http://localhost:3000/auth/add_category', {category: category.trim()})
        .then(result => {
            setLoading(false)
            if(result.data.Status) {
                navigate('/dashboard/category')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    return (
        <div className='add-category-container'>
            <div className='form-card'>
                {/* Header Section */}
                <div className='form-header'>
                    <div className='header-icon'>
                        <FaBuilding />
                    </div>
                    <div className='header-text'>
                        <h2>Create New Department</h2>
                        <p>Add a new department to organize your teams</p>
                    </div>
                </div>

                {/* Back Button */}
                <button 
                    className='back-btn'
                    onClick={() => navigate('/dashboard/category')}
                >
                    <FaArrowLeft />
                    Back to Departments
                </button>

                {/* Form Section */}
                <form className='category-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="category" className='form-label'>
                            <FaBuilding className='label-icon' />
                            Department Name
                        </label>
                        <input 
                            type="text" 
                            name='category' 
                            id='category'
                            placeholder='Enter department name (e.g., Engineering, Marketing, HR)'
                            onChange={(e) => setCategory(e.target.value)}
                            className='form-input'
                            value={category}
                            required
                        />
                        
                    </div>

                    <div className='form-actions'>
                        <button 
                            type='submit' 
                            className='submit-btn'
                            disabled={loading || !category.trim()}
                        >
                            {loading ? (
                                <>
                                    <div className='spinner'></div>
                                    Creating Department...
                                </>
                            ) : (
                                <>
                                    <FaPlus className='btn-icon' />
                                    Create Department
                                </>
                            )}
                        </button>
                        
                        <button 
                            type='button' 
                            className='cancel-btn'
                            onClick={() => navigate('/dashboard/category')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Quick Tips */}
                
            </div>
        </div>
    )
}

export default AddCategory