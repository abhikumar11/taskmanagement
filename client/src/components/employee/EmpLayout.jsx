import React, { useState, useRef, useEffect } from "react";
import { FaSignOutAlt, FaKey } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmpLayout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout successful");
    navigate("/");
  };

  const handleChangePassword = () => {
    navigate("/employee/profile");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div className="relative flex items-center" ref={dropdownRef}>
          <div
            className="flex items-center cursor-pointer text-gray-700 font-medium text-lg"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold text-base shadow-md mr-2">
              {firstLetter}
            </div>
            <span>{formattedName}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white border rounded shadow-md py-2 z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition flex items-center"
                onClick={handleChangePassword}
              >
                <FaKey className="mr-2 text-gray-600" /> Change Password
              </button>
              <button
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition flex items-center"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default EmpLayout;
