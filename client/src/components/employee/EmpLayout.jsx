import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmpLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout successful");
    navigate("/");
  };

  const name = user?.name || "User";
  const firstLetter = name.charAt(0).toUpperCase();
  const formattedName = firstLetter + name.slice(1).toLowerCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-orange-500">Task Manager</h1>
          <span className="text-gray-600 text-lg hidden sm:inline">Employee Panel</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-700 font-medium text-lg">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold text-base shadow-md mr-2">
              {firstLetter}
            </div>
            <span>{formattedName}</span>
          </div>

          <button
            className="flex items-center text-red-500 hover:text-red-600 font-semibold transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </div>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default EmpLayout;
