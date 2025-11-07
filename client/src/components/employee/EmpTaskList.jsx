import axios from "axios";
import React, { useEffect, useState } from "react";

const EmpTaskList = () => {
  const [taskList, setTaskList] = useState([]);

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employee/tasklist/${user.userid}`
      );
      console.log(res.data.tasks);
      setTaskList(res.data.tasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
        📋 My Task List
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <tr>
              <th className="py-4 px-6 font-semibold">SR No.</th>
              <th className="py-4 px-6 font-semibold">Task Name</th>
              <th className="py-4 px-6 font-semibold">Duration (days)</th>
              <th className="py-4 px-6 font-semibold">Priority</th>
              <th className="py-4 px-6 font-semibold text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {taskList && taskList.length > 0 ? (
              taskList.map((task, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 font-medium text-gray-600">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    {task.title}
                  </td>
                  <td className="py-4 px-6">{task.duration || "—"}</td>
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
                      {task.priority || "Low"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-transform hover:scale-105">
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-gray-500 py-8 font-medium"
                >
                  No tasks assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpTaskList;
