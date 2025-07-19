import React from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App