import React from 'react';
import { EmployeeRow } from './EmployeeRow';

const mockEmployees = [
    { id: 1, name: 'John Doe', role: 'admin', email: 'john@bragboard.com', department: 'Engineering', dateJoined: '2025-01-01' },
    { id: 2, name: 'Jane Smith', role: 'employee', email: 'jane@bragboard.com', department: 'Sales', dateJoined: '2025-02-15' },
    { id: 3, name: 'Mike Johnson', role: 'employee', email: 'mike@bragboard.com', department: 'Marketing', dateJoined: '2025-03-01' },
];

export const EmployeeTable = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Joined</th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockEmployees.map((emp) => (
                            <EmployeeRow key={emp.id} employee={emp} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
