import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await loginUser({ email, password });

      // ✅ Safe token handling
      if (res?.data?.access_token) {
        localStorage.setItem("token", res.data.access_token);
        alert("Login Success");
        navigate("/dashboard");
      } else {
        alert("Invalid response from server");
      }

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#0f172a] to-[#1e1b4b]">

      <div className="bg-[#111827] p-8 rounded-2xl shadow-xl w-96 text-white">

        <h1 className="text-3xl font-bold mb-2">
          Welcome to BargBoard
        </h1>

        <p className="text-gray-400 mb-6">
          Sign in to your employee account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <label className="block mb-2 text-sm">Email Address</label>
          <input
            type="email"
            placeholder="john.doe@company.com"
            className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label>
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>

            <span className="text-purple-400 cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-lg font-semibold hover:opacity-90"
          >
            Sign In
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Admin Login */}
        <button className="w-full bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
          Admin Login →
        </button>

        {/* Signup */}
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}