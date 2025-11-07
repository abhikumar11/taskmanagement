import React from "react";
import { ClipboardList, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmpDashboard = () => {
  const navigate = useNavigate();

  const handleViewTasks = () => {
    navigate("/employee/tasklist");
  };

  const handleCompletedTasks = () => {
    //navigate("/employee/completed-tasks");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
     
      <div className="p-6 flex flex-wrap justify-center sm:justify-start gap-5 mt-4">
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-base shadow-sm"
          onClick={handleViewTasks}
        >
          <ClipboardList className="mr-2" /> View Tasks
        </button>

        <button
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-base shadow-sm"
          onClick={handleCompletedTasks}
        >
          <CheckCircle className="mr-2" /> Completed Tasks
        </button>
      </div>

      
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Employee Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Assigned Tasks
            </h3>
            <p className="text-3xl font-bold text-blue-500">0</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Completed Tasks
            </h3>
            <p className="text-3xl font-bold text-green-500">0</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Pending Tasks
            </h3>
            <p className="text-3xl font-bold text-orange-500">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
