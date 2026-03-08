import { useState } from "react";
import API from "../api";

function Register(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const register = async () => {

await API.post("/register",{email,password})

alert("User Registered")

}

return(

<div className="flex justify-center items-center h-screen bg-gray-100">

<div className="bg-white p-8 shadow-lg w-80">

<h2 className="text-xl mb-4">Register</h2>

<input
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

<button
onClick={register}
className="bg-green-500 text-white w-full p-2"
>
Register
</button>

</div>

</div>

)

}

export default Register