import React from 'react';
import { EmployeeTable } from './EmployeeTable';

export const EmployeeManagement: React.FC = () => {
  return (
    <div className="p-6 h-full font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">Admin - Employee Management</h1>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow transition duration-200">
          + Add Employee
        </button>
      </div>
      <div className="mt-4">
        <EmployeeTable />
      </div>
    </div>
  );
};
