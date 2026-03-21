import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("[localhost](http://localhost:8000/auth/login)", { username, password });
      localStorage.setItem("access_token", res.data.access_token);
      alert("Login successful!");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to BragBoard</h2>

        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-md p-3 mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md p-3 mb-3"
          required
        />

        <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-md w-full hover:opacity-90">
          Sign In
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Don't have an account? <a href="/register" className="text-indigo-600 font-medium">Sign up</a>
        </p>
      </form>
    </div>
  );
}
