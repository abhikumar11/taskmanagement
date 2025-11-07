import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmpLayout = () => {
  const user=JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();
  
  const handleLogout=()=>{
    localStorage.removeItem("user");
    toast.success("logout successfull");
    navigate("/")
  }
  return (
    <div>
       <div className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-orange-500">Task Manager</h1>
                <span className="text-gray-600 text-lg">Employee Panel</span>
              </div>
      
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Welcome: {user.name}</span>
                <button className="flex items-center text-red-500 hover:text-red-600 font-semibold transition" onClick={handleLogout}>
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            </div>
            <Outlet/>
    </div>
  )
}

export default EmpLayout