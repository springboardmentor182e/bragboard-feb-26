import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(data);
    localStorage.setItem("token", res.data.access_token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to BragBoard</h2>

        <input
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setData({...data, username: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setData({...data, password: e.target.value})}
        />

        <button className="w-full bg-purple-600 text-white p-2 rounded">
          Sign In
        </button>
      </form>
    </div>
  );
}