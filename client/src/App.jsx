import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import UserRoutes from './components/Routes/Private'
import AdminRoutes from './components/Routes/Admin'
import UserDashboard from './pages/user/UserDashboard'
import YourOrder from './pages/user/YourOrder'
import Dashboard from './pages/admin/Dashboard'
import Details from './pages/admin/Details'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        {/* user routing */}
        <Route path="/user" element={<UserRoutes />}>
          <Route path="" element={<UserDashboard />} />
          <Route path="your-order" element={<YourOrder />} />
        </Route>
        {/* admin routing */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="" element={<Dashboard />} />
          <Route path="details" element={<Details/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App