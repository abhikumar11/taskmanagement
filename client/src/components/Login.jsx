import React, { useState } from "react";
import axios from "axios";
const Login = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[role,setRole]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(role=="admin"){
           try {
                const res=await axios.post("http://localhost:3001/admin/login",{email,password,role});
                alert(res.data);
        } catch (err) {

            alert(err.response.data);
        }
        }
       
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label  htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select id="role"  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" onChange={(e)=>setRole(e.target.value)}>
                <option value="" disabled selected>Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
            </select>
          </div>
          <button
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
