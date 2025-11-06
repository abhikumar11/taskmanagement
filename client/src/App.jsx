import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from "./components/admin/AdminDashboard";
import Dashboard from "./components/employee/Dashboard";
import NewUser from './components/admin/NewUser';
import NewTask from './components/admin/NewTask';
import AdminLayout from './components/admin/AdminLayout';
const App = () => {

  return (
    <div>
   <Routes>
     
      <Route path="/" element={<Home />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/newuser" element={<NewUser />} />
        <Route path="/admin/assigntask" element={<NewTask />} />
      </Route>

      
      <Route path="/employee/dashboard" element={<Dashboard />} />
    </Routes>
      
    </div>
    
  )
}

export default App