import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(data);

      // ✅ store token
      localStorage.setItem("token", res.data.access_token);

      // ✅ go to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome to BragBoard
        </h2>

        <input
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button className="w-full bg-purple-600 text-white p-2 rounded">
          Sign In
        </button>

        {/* ✅ Register Link */}
        <p
          onClick={() => navigate("/register")}
          className="text-blue-500 cursor-pointer mt-3 text-center"
        >
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
}