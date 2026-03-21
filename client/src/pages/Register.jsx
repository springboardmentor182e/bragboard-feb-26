// src/pages/Register.jsx
import { useState } from "react";
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/register", form);
      alert("Account created successfully!");
    } catch (err) {
      alert("Error creating account");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {["full_name", "username", "email", "department", "job_title", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            name={field}
            placeholder={field.replace("_", " ")}
            className="w-full p-2 mb-4 border rounded"
            onChange={handleChange}
          />
        ))}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
