import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({});

  const handleRegister = async () => {
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-[500px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Join BragBoard</h2>

        <input placeholder="Full Name"
          className="input" 
          onChange={(e)=>setForm({...form, full_name:e.target.value})}
        />

        <input placeholder="Username"
          className="input"
          onChange={(e)=>setForm({...form, username:e.target.value})}
        />

        <input placeholder="Email"
          className="input"
          onChange={(e)=>setForm({...form, email:e.target.value})}
        />

        <input type="password"
          placeholder="Password"
          className="input"
          onChange={(e)=>setForm({...form, password:e.target.value})}
        />

        <button onClick={handleRegister}
          className="w-full mt-4 bg-purple-600 text-white p-2 rounded">
          Create Account
        </button>
      </div>
    </div>
  );
}