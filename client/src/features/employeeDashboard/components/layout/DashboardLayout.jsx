import { LayoutDashboard, Trophy, User, Settings } from "lucide-react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">

      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col bg-white border-r border-slate-200">

        {/* Logo */}
        <div className="p-6 text-2xl font-bold border-b border-slate-200 
                        bg-gradient-to-r from-indigo-600 to-purple-600 
                        bg-clip-text text-transparent">
          BragBoard
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">

          <NavItem icon={<LayoutDashboard size={18} />} active>
            Dashboard
          </NavItem>

          <NavItem icon={<Trophy size={18} />}>
            Achievements
          </NavItem>

          <NavItem icon={<User size={18} />}>
            Profile
          </NavItem>

          <NavItem icon={<Settings size={18} />}>
            Settings
          </NavItem>

        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Employee Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track your achievements and performance
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-indigo-700 
                            rounded-full flex items-center justify-center 
                            text-white font-semibold text-sm shadow-md">
              SD
            </div>
          </div>

        </header>

        {/* Content */}
        <main className="flex-1 px-10 py-10">
          <div className="space-y-12">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

const NavItem = ({ icon, children, active }) => {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl 
      text-sm font-medium transition-all duration-200
      ${
        active
          ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {icon}
      {children}
    </button>
  );
};

export default DashboardLayout;