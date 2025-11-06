import React, { useEffect, useState } from 'react'
import axios from "axios";
const NewTask = () => {
  const [emp, setEmp] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [formData, setFormData] = useState({title: "",description: "",duration:""});

  useEffect(()=>{
        fetchEmp();
  },[])

  const fetchEmp=async()=>{
      try {
               const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/employee/allemployees`);
          setEmp(res.data);
          console.log(res);
      } catch (err) {
        console.log(err.response.data.msg)
      }
  }
   const handleAssignClick = (employee) => {
    setFormData({ title: "", description: "", duration: "" });
    setSelectedEmp(employee);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setShowModal(false);
      try {

         const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/admin/assigntask`,{...formData,empid:selectedEmp._id}
        );
        console.log(res);
      } catch (err) {
        console.log(err)
      }
    setFormData({ title: "", description: "", duration: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center py-12 px-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Assign New Task
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-orange-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left border-b">Employee Name</th>
                <th className="px-6 py-3 text-left border-b">Designation</th>
                <th className="px-6 py-3 text-center border-b">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {emp.length > 0 ? (
                emp.map((e, i) => (
                  <tr
                    key={i}
                    className="hover:bg-orange-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-3 border-b">{e.name}</td>
                    <td className="px-6 py-3 border-b">{e.designation}</td>
                    <td className="px-6 py-3 border-b text-center">
                      <button
                        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
                        onClick={() => handleAssignClick(e)}
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
                    className="text-center text-gray-500 py-4 italic"
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

            <form className="space-y-4">
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

              <div className="flex justify-between pt-4">
                 <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition"
                  onClick={handleSubmit}
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
  )
}

export default NewTask