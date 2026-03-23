import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './Components/Start'
import Login from './Components/Admin/Login.jsx'
import Dashboard from './Components/Admin/Dashboard.jsx'
import Home from './Components/Admin/Home.jsx'
import Employee from './Components/Admin/Employee.jsx'
import Category from './Components/Admin/Category.jsx'
import Profile from './Components/Admin/Profile.jsx'
import AddCategory from './Components/Admin/AddCategory.jsx'
import AddEmployee from './Components/Admin/AddEmployee.jsx'
import EditEmployee from './Components/Admin/EditEmployee.jsx'
import Leave from './Components/Admin/Leave.jsx'
import PrivateRoute from './Components/PrivateRoute'

import EmployeeLogin from './Components/Employee/EmployeeLogin.jsx'
import EmployeeDetail from './Components/Employee/EmployeeDetail.jsx'
import EmployeeLeave from './Components/Employee/EmployeeLeave.jsx'
import EmployeeSalary from './Components/Employee/EmployeeSalary.jsx'
import AddLeave from './Components/Employee/AddLeave.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔹 Start Page */}
        <Route path='/' element={<Start />} />

        {/* 🔹 Admin Login */}
        <Route path='/adminlogin' element={<Login />} />

        {/* 🔹 Employee Login */}
        <Route path='/employee_login' element={<EmployeeLogin />} />

        {/* 🔹 EMPLOYEE DASHBOARD (Parent route) */}
        <Route path='/employee_detail/:id' element={<EmployeeDetail />}>
          {/* 👇 Nested routes appear inside EmployeeDetail’s <Outlet /> */}
          <Route path='leave' element={<EmployeeLeave />} />
          <Route path='salary' element={<EmployeeSalary />} />
          {/* You can also add setting page later */}
          <Route path='addleave' element={<AddLeave />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        {/* 🔹 ADMIN DASHBOARD (Protected) */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path='' element={<Home />} />
          <Route path='employee' element={<Employee />} />
          <Route path='category' element={<Category />} />
          <Route path='profile' element={<Profile />} />
          <Route path='add_category' element={<AddCategory />} />
          <Route path='add_employee' element={<AddEmployee />} />
          <Route path='edit_employee/:id' element={<EditEmployee />} />
          <Route path='leaves' element={<Leave />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
