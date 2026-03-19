export default function Navbar() {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold">
        Admin Panel
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-600">Welcome, Admin</span>

        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          A
        </div>
      </div>

    </div>
  );
}