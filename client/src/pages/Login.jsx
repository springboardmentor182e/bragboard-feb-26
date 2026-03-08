import { useState } from "react";
import API from "../api";

function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const login = async () => {

const res = await API.post("/login",{email,password})

localStorage.setItem("access",res.data.access_token)
localStorage.setItem("refresh",res.data.refresh_token)

alert("Login Success")

}

return(

<div className="flex justify-center items-center h-screen bg-gray-100">

<div className="bg-white p-8 shadow-lg w-80">

<h2 className="text-xl mb-4">Login</h2>

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
onClick={login}
className="bg-blue-500 text-white w-full p-2"
>
Login
</button>

</div>

</div>

)

}

export default Login