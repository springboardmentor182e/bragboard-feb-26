import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try{
      const res = await loginUser({email,password});
      localStorage.setItem("token",res.data.access_token);
      window.location.href="/dashboard";
      console.log(res.data);
      alert("Login Success");
    }
    catch(err){
      alert("Login Failed")
    }
  }

  return(

<div className="flex items-center justify-center min-h-screen bg-gray-100">

<form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96">

<h2 className="text-2xl font-bold mb-6 text-center">
Login
</h2>

<input
type="email"
placeholder="Email"
className="w-full p-3 border rounded mb-4"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full p-3 border rounded mb-4"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">

Login

</button>

</form>

</div>

  );
}