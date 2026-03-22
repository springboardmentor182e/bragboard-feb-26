import { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
  const [data, setData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(data);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 rounded-xl shadow w-[500px]" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Join BragBoard</h2>

        <input placeholder="Full Name" className="input" onChange={(e)=>setData({...data, full_name:e.target.value})}/>
        <input placeholder="Username" className="input" onChange={(e)=>setData({...data, username:e.target.value})}/>
        <input placeholder="Email" className="input" onChange={(e)=>setData({...data, email:e.target.value})}/>
        <input placeholder="Department" className="input" onChange={(e)=>setData({...data, department:e.target.value})}/>
        <input placeholder="Job Title" className="input" onChange={(e)=>setData({...data, job_title:e.target.value})}/>
        <input type="password" placeholder="Password" className="input" onChange={(e)=>setData({...data, password:e.target.value})}/>

        <button className="w-full bg-purple-600 text-white p-2 rounded mt-3">
          Create Account
        </button>
      </form>
    </div>
  );
}