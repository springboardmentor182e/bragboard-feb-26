import { Star } from "lucide-react";
import { Link } from "react-router-dom";

function SignupForm() {
  return (
    <div className="w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-400 relative flex">

    <div className="hidden md:flex w-1/2 text-white flex-col items-center justify-center px-10 py-16 text-center">

        <div className="w-24 h-24 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-5xl mb-6 shadow-md">
          BB
        </div>

      <h1 className="text-3xl font-bold mb-8">
          BragBoard
        </h1>

        <h2 className="text-2xl font-semibold flex items-center justify-center gap-3 mb-4">
          Celebrate Wins
          <Star className="text-yellow-300 fill-yellow-300" size={24} />
        </h2>

        <p className="text-sm opacity-90 leading-relaxed max-w-xs">
          Recognize excellence. Appreciate your team.
          Build a culture of appreciation with BragBoard.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-12 py-16 relative">

      
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 z-10">

          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Create Account
          </h2>

          <p className="text-gray-500 mb-6 text-sm text-center">
            Join the BragBoard community
          </p>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600">
              <option>Select Department</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>HR</option>
            </select>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>

          </form>

          <p className="text-xs text-gray-500 mt-5 text-center">
            Already have an account?
               <Link
    to="/login"
    className="text-indigo-600 font-semibold ml-1 cursor-pointer"
  >
    Login
  </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default SignupForm;