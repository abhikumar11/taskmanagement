import React from "react";
import { FaUserPlus, FaTasks, FaUserCheck, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {

  const user=JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();
  
  const handleLogout=()=>{
    localStorage.removeItem("user");
    alert("logout successfull");
    navigate("/")
  }
  const handleUser=()=>{
    navigate("/admin/newuser")
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-orange-500">Task Manager</h1>
          <span className="text-gray-600 text-lg">Admin Panel</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Welcome: {user.name}</span>
          <button className="flex items-center text-red-500 hover:text-red-600 font-semibold transition" onClick={handleLogout}>
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-wrap justify-center sm:justify-start gap-5 mt-4">
        <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-base shadow-sm" onClick={handleUser}>
          <FaUserPlus className="mr-2" /> New User
        </button>

        <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-base shadow-sm">
          <FaTasks className="mr-2" /> New Task
        </button>

        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-base shadow-sm">
          <FaUserCheck className="mr-2" /> Assign Task
        </button>
      </div>

      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-orange-500">23</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Tasks</h3>
            <p className="text-3xl font-bold text-green-500">12</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Tasks</h3>
            <p className="text-3xl font-bold text-blue-500">4</p>
          </div>
        </div>

        <div className="mt-10 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
