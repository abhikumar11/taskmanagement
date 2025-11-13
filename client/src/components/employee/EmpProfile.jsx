import axios from 'axios';
import React, {useState } from 'react'
import { toast } from 'react-toastify';

const EmpProfile = () => {
   
    const user=JSON.parse(localStorage.getItem("user"));
  const [frmInput, setFrmInput] = useState({});

  const handleInput = (e) => {
    setFrmInput({ ...frmInput, [e.target.name]: e.target.value });
    console.log(frmInput);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (frmInput.newPassword !== frmInput.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
     
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/employee/updateprofile`,
        { empid: user.empid, ...frmInput }
      );
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Update Profile
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="username"
              disabled
              value={user.name}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              name="newPassword"
              onChange={handleInput}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              onChange={handleInput}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition duration-200"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmpProfile;
