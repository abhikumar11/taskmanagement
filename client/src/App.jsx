import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from "./components/admin/AdminDashboard";
import Dashboard from "./components/employee/Dashboard";
import NewUser from './components/admin/NewUser';
const App = () => {

  return (
    <div>

      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>

      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/newuser" element={<NewUser/>}/>
      </Routes>

      <Routes>
        <Route path="/employee/dashboard" element={<Dashboard/>}/>
      </Routes>
      
    </div>
    
  )
}

export default App