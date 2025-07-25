import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import UserRoutes from './components/Routes/UserRoutes'
import UserDashboard from './pages/user/UserDashboard'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/user" element={<UserRoutes />}>
          <Route path="" element={<UserDashboard />} />
          {/* <Route path="your-order" element={<Your} */}
        </Route>
      </Routes>
    </div>
  )
}

export default App