import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const NewUser = () => {
  const [frmInput,setFrmInput]=useState({});

  const handleInput=(e)=>{
    setFrmInput({...frmInput,[e.target.name]:e.target.value});
    console.log(frmInput);
  }
  const handleSubmit=async(e)=>{

    e.preventDefault();
      console.log(frmInput);
      try{
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/createemployee`,frmInput);
                 toast.success(res.data.message);
      }catch(err){
        console.log(err.response.data);
      }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Add New User
        </h2>
        
        <form className="space-y-5">
          
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              name="username"
              onChange={handleInput}
            />
          </div>

        
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              name="useremail"
              onChange={handleInput}
            />
          </div>

          
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Designation</label>
            <input
              type="text"
              placeholder="Enter designation"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              name="userdes"
              onChange={handleInput}
            />
          </div>

         
          <button
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition duration-200"
            onClick={handleSubmit}
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewUser
