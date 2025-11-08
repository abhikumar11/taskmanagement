import React, { useEffect, useState } from "react";
import {FaUserPlus,FaTasks,FaUserCheck,FaSignOutAlt,FaListAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, activeTasks: 0, pendingTasks: 0 });
  const [recentActivity, setRecentActivity] = useState([]);

  const handleUser = () => {
    navigate("/admin/newuser");
  };

  const handleAssign = () => {
    navigate("/admin/assigntask");
  };


  const loadDashboardData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/dashboard`);
      setStats(res.data.stats);
      setRecentActivity(res.data.recentActivity);
    } catch (err) {
      console.error("Error loading dashboard:", err);
      toast.error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
     <div className="min-h-screen bg-gray-100 flex flex-col">
    
      <div className="p-6 flex flex-wrap justify-center sm:justify-start gap-5 mt-4">
        <button
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-base shadow-sm"
          onClick={handleUser}
        >
          <FaUserPlus className="mr-2" /> New User
        </button>

        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-base shadow-sm"
          onClick={handleAssign}
        >
          <FaUserCheck className="mr-2" /> Assign Task
        </button>
      </div>
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-orange-500">{stats.totalUsers}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Tasks</h3>
            <p className="text-3xl font-bold text-green-500">{stats.activeTasks}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Tasks</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.pendingTasks}</p>
          </div>
        </div>
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            📋 Recent Activity
          </h3>

          {recentActivity.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm text-left rounded-xl overflow-hidden">
                <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-sm">Title</th>
                    <th className="px-6 py-3 font-semibold text-sm">Employee ID</th>
                    <th className="px-6 py-3 font-semibold text-sm">Status</th>
                    <th className="px-6 py-3 font-semibold text-sm">Assigned Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentActivity.map((task, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-3 font-medium text-gray-800">
                        {task.title}
                      </td>
                      <td className="px-6 py-3 text-gray-600">{task.empid}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            task.status === "Not Completed"
                              ? "bg-red-100 text-red-700"
                              : task.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-600">
                        {new Date(task.assigndate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No recent activity available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
