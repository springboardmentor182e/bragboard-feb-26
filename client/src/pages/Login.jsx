import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await API.post("/auth/login", { username, password });
    localStorage.setItem("token", res.data.access_token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Welcome to BragBoard
        </h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}