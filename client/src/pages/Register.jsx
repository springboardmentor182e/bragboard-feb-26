import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    department: "",
    job_title: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("[localhost](http://localhost:8000/auth/register)", form);
      alert("Account created! Please login.");
      window.location.href = "/login";
    } catch {
      alert("Error creating account");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Join BragBoard</h2>

        <div className="grid grid-cols-2 gap-3">
          <input name="full_name" placeholder="Full Name" onChange={handleChange} className="border p-2 rounded" />
          <input name="username" placeholder="Username" onChange={handleChange} className="border p-2 rounded" />
        </div>

        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded w-full mt-3" />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <input name="department" placeholder="Department" onChange={handleChange} className="border p-2 rounded" />
          <input name="job_title" placeholder="Job Title" onChange={handleChange} className="border p-2 rounded" />
        </div>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded w-full mt-3" />

        <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-md w-full mt-4 hover:opacity-90">
          Create Account
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <a href="/login" className="text-indigo-600">Sign in</a>
        </p>
      </form>
    </div>
  );
}
