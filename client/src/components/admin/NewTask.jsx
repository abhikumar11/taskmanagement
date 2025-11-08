import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
const NewTask = () => {
  const [emp, setEmp] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    priority: "",
  });

  useEffect(() => {
    fetchEmp();
  }, []);

  const fetchEmp = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employee/allemployees`
      );
      setEmp(res.data);
      console.log(res);
    } catch (err) {
      console.log(err.response?.data?.msg || err.message);
    }
  };

  const handleAssignClick = (employee) => {
    setFormData({ title: "", description: "", duration: "", priority: "" });
    setSelectedEmp(employee);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/assigntask`,
        { ...formData, empid: selectedEmp._id }
      );
       toast.success(res.data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
    setFormData({ title: "", description: "", duration: "", priority: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center py-12 px-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Assign New Task
        </h1>

       <div className="overflow-x-auto mt-6">
  <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow-lg">
    <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm uppercase tracking-wide">
      <tr>
        <th className="px-6 py-4 text-left">Employee Name</th>
        <th className="px-6 py-4 text-left">Designation</th>
        <th className="px-6 py-4 text-center">Action</th>
      </tr>
    </thead>

    <tbody className="bg-white">
      {emp.length > 0 ? (
        emp.map((e, i) => (
          <tr
            key={i}
            className={`${
              i % 2 === 0 ? "bg-orange-50" : "bg-white"
            } hover:bg-orange-100 transition-all duration-200`}
          >
            <td className="px-6 py-3 font-medium text-gray-800 border-b border-gray-200">
              {e.name}
            </td>
            <td className="px-6 py-3 text-gray-600 border-b border-gray-200">
              {e.designation}
            </td>
            <td className="px-6 py-3 text-center border-b border-gray-200">
              <button
                onClick={() => handleAssignClick(e)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-full shadow-md text-sm font-semibold transition-transform transform hover:scale-105"
              >
                Assign Task
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="3"
            className="text-center text-gray-500 py-6 italic bg-gray-50"
          >
            Loading employees...
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative animate-fadeIn">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">
              Assign Task to {selectedEmp?.name}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Describe the task"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="e.g. 3 days"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                  Assign
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTask;
