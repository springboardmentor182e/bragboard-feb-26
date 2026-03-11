import { useState } from "react";
import { registerUser } from "../services/api";

function Register(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();

try{
await registerUser({email,password});
alert("User Registered");
}
catch(err){
alert("Error");
}
};

return(

<div className="flex items-center justify-center h-screen bg-gray-100">

<form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-96">

<h2 className="text-2xl font-bold mb-4">Register</h2>

<input
type="email"
placeholder="Email"
className="border p-2 w-full mb-3"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="border p-2 w-full mb-3"
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="bg-green-500 text-white p-2 w-full">
Register
</button>

</form>

</div>

);
}

export default Register;