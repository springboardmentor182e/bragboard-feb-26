const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">
          BragBoard
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            My Achievements
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Employee Dashboard</h1>
          <span className="text-gray-600 text-sm">Welcome, Satyam</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;