export default function Dashboard(){

const logout = ()=>{
localStorage.removeItem("token")
window.location.href="/"
}

return(

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

<h1 className="text-3xl font-bold mb-6">
Welcome to Dashboard
</h1>

<button
onClick={logout}
className="bg-red-500 text-white px-6 py-3 rounded">

Logout

</button>

</div>

)

}