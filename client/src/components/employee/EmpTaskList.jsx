import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmpTaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState({ completeddate: "", status: "" });

  const loadData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employee/tasklist/${user.userid}`
      );
      setTaskList(res.data.tasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReportChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value });
  };

  const handleReportSave = async() => {
   
   try {
            const res=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/employee/taskreport`,
          {taskid:selectedTask._id,...reportData});
          toast.success(res.data.msg);
   } catch (err) {
          toast.error(err.response.data.msg);
   }
    setShowReportModal(false);
  };
  const incompleteTasks = taskList.filter(task => task.status !== "Completed");

  return (
    
    <div className="p-8 bg-gray-100 min-h-screen relative">
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
            {incompleteTasks && incompleteTasks.length > 0 ? (
             incompleteTasks.map((task,index)=>(
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 font-medium text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6 font-semibold text-gray-800">{task.title}</td>
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
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowViewModal(true);
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-transform hover:scale-105"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setReportData({completeddate:"",status:"" });
                          setShowReportModal(true);
                        }}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition-transform hover:scale-105"
                      >
                        Report
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-8 font-medium">
                  No tasks assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showViewModal && selectedTask && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-2xl shadow-xl p-8 w-full max-w-md z-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedTask.title}</h2>
          <p className="text-gray-600 mb-2">
            <strong>Description:</strong> {selectedTask.description || "No description"}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Duration:</strong> {selectedTask.duration || "N/A"} days
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Priority:</strong> {selectedTask.priority || "Low"}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Assigned Date:</strong>{" "}
            {selectedTask.assigndate
              ? new Date(selectedTask.assigndate).toLocaleDateString()
              : "N/A"}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Status:</strong> {selectedTask.status || "Not Completed"}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setShowViewModal(false)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      
      {showReportModal && selectedTask && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-2xl shadow-xl p-8 w-full max-w-md z-50">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Report Task: {selectedTask.title}</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Completed Date</label>
              <input
                type="date"
                name="completeddate"
                value={reportData.completeddate}
                onChange={handleReportChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={reportData.status}
                onChange={handleReportChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Not Completed">Not Completed</option>
              </select>
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReportSave}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmpTaskList;
