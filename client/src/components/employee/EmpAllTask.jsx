import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmpAllTask = () => {
  const [taskList, setTaskList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employee/tasklist/${user.userid}`
      );
      setTaskList(res.data.tasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTasks = taskList.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
        📋 All Assigned Tasks
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by title or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gradient-to-r  from-orange-500 to-red-500 text-white">
            <tr>
              <th className="py-4 px-6 font-semibold">#</th>
              <th className="py-4 px-6 font-semibold">Task Title</th>
              <th className="py-4 px-6 font-semibold">Priority</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold">Assigned Date</th>
              <th className="py-4 px-6 font-semibold">Duration</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    {task.title}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {task.status || "Not Completed"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {task.assigndate
                      ? new Date(task.assigndate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="py-4 px-6">{task.duration || "—"} days</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-8 font-medium"
                >
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpAllTask;
