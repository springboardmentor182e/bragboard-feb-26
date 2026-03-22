import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(data);
    navigate("/"); // better than window.location
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-8 rounded-xl shadow w-[500px]" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Join BragBoard</h2>

        <input placeholder="Full Name" className="border p-2 w-full mb-2 rounded"
          onChange={(e)=>setData({...data, full_name:e.target.value})}/>

        <input placeholder="Username" className="border p-2 w-full mb-2 rounded"
          onChange={(e)=>setData({...data, username:e.target.value})}/>

        <input placeholder="Email" className="border p-2 w-full mb-2 rounded"
          onChange={(e)=>setData({...data, email:e.target.value})}/>

        <input placeholder="Department" className="border p-2 w-full mb-2 rounded"
          onChange={(e)=>setData({...data, department:e.target.value})}/>

        <input placeholder="Job Title" className="border p-2 w-full mb-2 rounded"
          onChange={(e)=>setData({...data, job_title:e.target.value})}/>

        <input type="password" placeholder="Password" className="border p-2 w-full mb-2 rounded"
          onChange={(e)=>setData({...data, password:e.target.value})}/>

        <button className="w-full bg-purple-600 text-white p-2 rounded mt-3">
          Create Account
        </button>

        {/* ✅ ADD HERE */}
        <p 
          onClick={() => navigate("/")} 
          className="text-blue-500 cursor-pointer mt-3 text-center"
        >
          Already have an account? Login
        </p>

      </form>
    </div>
  );
}