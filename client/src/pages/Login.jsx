import { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await loginUser(form);
    await login(res.data.access_token);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex">

      {/* 🔥 LEFT SIDE (BRANDING) */}
      <div className="
        hidden lg:flex flex-1 items-center justify-center
        bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
        text-white p-10
      ">

        <div className="max-w-md space-y-6">

          <h1 className="text-4xl font-bold leading-tight">
            Welcome to <br /> BragBoard 🚀
          </h1>

          <p className="text-white/80">
            Recognize, appreciate, and celebrate your team.
            Build a culture of appreciation that drives performance.
          </p>

          {/* Highlight */}
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
            🌟 “Recognition is the fuel that keeps teams moving forward”
          </div>

        </div>
      </div>

      {/* 🔐 RIGHT SIDE (FORM) */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">

        <div className="
          w-full max-w-md
          bg-white/70 backdrop-blur-xl
          border border-white/20
          rounded-2xl p-8
          shadow-xl
        ">

          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Login to your account
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Continue your recognition journey ✨
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full mt-1 px-4 py-2 rounded-lg
                  border border-slate-200
                  focus:ring-2 focus:ring-indigo-500 outline-none
                "
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-slate-600">Password</label>

              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="
                    w-full px-4 py-2 rounded-lg
                    border border-slate-200
                    focus:ring-2 focus:ring-indigo-500 outline-none
                  "
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                {/* TOGGLE ICON */}
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 cursor-pointer text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full py-2.5 rounded-lg text-white font-medium
                bg-gradient-to-r from-indigo-500 to-purple-600
                hover:opacity-90 transition
                shadow-md
              "
            >
              Sign In
            </button>

          </form>

          {/* FOOTER */}
          <p className="text-sm text-center text-slate-500 mt-5">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;