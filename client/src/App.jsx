import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeManagement from './pages/Admin/EmployeeManagement';
import Login from './pages/Login/Login';

function App() {
    const isAuthenticated = () => {
        return localStorage.getItem('access_token') !== null;
    };

    const ProtectedRoute = ({ children }) => {
        return isAuthenticated() ? children : <Navigate to="/login" replace />;
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Navigate to="/admin/employees" replace />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/employees"
                        element={
                            <ProtectedRoute>
                                <div className="flex flex-col min-h-screen">
                                    <nav className="bg-white shadow">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                            <div className="flex justify-between h-16">
                                                <div className="flex items-center">
                                                    <span className="text-xl font-bold text-indigo-600">BragBoard</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => {
                                                            localStorage.removeItem('access_token');
                                                            localStorage.removeItem('user');
                                                            window.location.href = '/login';
                                                        }}
                                                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                                    >
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </nav>
                                    <main className="flex-1">
                                        <EmployeeManagement />
                                    </main>
                                </div>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
