import { useEffect } from "react"

function Dashboard(){

useEffect(()=>{

const token = localStorage.getItem("access")

if(!token){
window.location="/login"
}

},[])

return(

<div className="flex justify-center items-center h-screen">

<h1 className="text-3xl font-bold">
Welcome to Dashboard
</h1>

</div>

)

}

export default Dashboard