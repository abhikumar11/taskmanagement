import React from 'react'
import { ToastContainer } from 'react-toastify';
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from "./components/admin/AdminDashboard";
import NewUser from './components/admin/NewUser';
import NewTask from './components/admin/NewTask';
import AdminLayout from './components/admin/AdminLayout';
import EmpLayout from './components/employee/EmpLayout';
import EmpDashboard from './components/employee/EmpDashboard';
import EmpTaskList from "./components/employee/EmpTaskList"
import EmpAllTask from "./components/employee/EmpAllTask"
import EmpProfile from './components/employee/EmpProfile';
import AdminProfile from './components/admin/AdminProfile';
const App = () => {

  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes>

        <Route path="/" element={<Home/>} />

        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/newuser" element={<NewUser/>} />
          <Route path="/admin/assigntask" element={<NewTask/>} />
          <Route path="/admin/profile" element={<AdminProfile/>} />
        </Route>

        <Route path="/employee" element={<EmpLayout />}>
          <Route path="/employee/dashboard" element={<EmpDashboard/>} />
          <Route path="/employee/tasklist" element={<EmpTaskList/>} />
          <Route path="/employee/alltasks" element={<EmpAllTask/>} />
          <Route path="/employee/profile" element={<EmpProfile/>} />
        </Route>
      </Routes>

    </div>

  )
}

export default App