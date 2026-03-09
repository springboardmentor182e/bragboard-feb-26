import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeManagement } from './pages/Admin/EmployeeManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Simple Navigation Bar */}
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-indigo-600">BragBoard</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/employees" replace />} />
            <Route path="/admin/employees" element={<EmployeeManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
