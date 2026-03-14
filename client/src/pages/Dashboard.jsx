import React from "react";

export default function Dashboard(){

  const token = localStorage.getItem("token");

  if(!token){
    window.location.href="/";
  }

  const logout = () =>{
    localStorage.removeItem("token");
    window.location.href="/";
  }

  return(

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg text-center">

        <h2 className="text-2xl font-bold mb-6">
          Welcome to Dashboard
        </h2>

        <button
        onClick={logout}
        className="bg-red-500 text-white p-3 rounded hover:bg-red-600">

        Logout

        </button>

      </div>

    </div>

  )
}