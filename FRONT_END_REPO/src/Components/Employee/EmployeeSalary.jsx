import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EmployeeSalary = () => {
  const { id } = useParams()
  const [salaryData, setSalaryData] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/salary/${id}`)
      .then(res => setSalaryData(res.data))
      .catch(err => console.log(err))
  }, [id])

  return (
    <div className='p-4'>
      <h3 className='mb-3'>Salary Details</h3>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Month</th>
            <th>Basic Pay</th>
            <th>Allowance</th>
            <th>Deduction</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.basic}</td>
              <td>{item.allowance}</td>
              <td>{item.deduction}</td>
              <td>{item.net}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeSalary
