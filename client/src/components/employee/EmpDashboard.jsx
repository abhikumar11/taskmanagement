import React, { useEffect, useState } from "react";
import { ClipboardList, CheckCircle,List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmpDashboard = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const [counts, setCounts] = useState({
    assigned: 0,
    completed: 0,
    pending: 0,
  });

  const loadTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employee/tasklist/${user.userid}`
      );
      setTaskList(res.data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    const assigned = taskList.length;
    const completed = taskList.filter((task) => task.status === "Completed").length;
    const pending = taskList.filter((task) => task.status !== "Completed").length;

    setCounts({ assigned, completed, pending });
  }, [taskList]);

  const handleViewTasks = () => {
    navigate("/employee/tasklist");
  };

  const handleCompletedTasks = () => {
    navigate("/employee/alltasks");
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
         <button
          className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition text-base shadow-sm"
          onClick={handleCompletedTasks}
        >
          <List className="mr-2" /> All Tasks
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
            <p className="text-3xl font-bold text-blue-500">{counts.assigned}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Completed Tasks
            </h3>
            <p className="text-3xl font-bold text-green-500">{counts.completed}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Pending Tasks
            </h3>
            <p className="text-3xl font-bold text-orange-500">{counts.pending}</p>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Tasks</h3>
          <div className="bg-white rounded-2xl shadow p-5">
            {taskList.length > 0 ? (
              taskList
                .slice(0, 5)
                .map((task, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b last:border-none py-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{task.title}</p>
                      <p className="text-sm text-gray-500">
                        {task.priority || "Low"} Priority
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {task.status || "Not Started"}
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No recent tasks assigned yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
