import React from 'react';

export const EmployeeRow = ({ employee }) => {
    return (
        <tr className="hover:bg-gray-50/60 transition-colors duration-100 group">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-sm">
                            {employee.name.charAt(0)}
                        </div>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-0.5 inline-flex text-xs font-medium rounded-full ${
                    employee.role === 'admin'
                        ? 'bg-purple-50 text-purple-700'
                        : 'bg-green-50 text-green-700'
                    }`}>
                    {employee.role}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.department}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(employee.dateJoined).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-500 hover:text-blue-700 mr-3 text-sm font-medium bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                <button className="text-red-400 hover:text-red-600 text-sm font-medium bg-transparent border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
            </td>
        </tr>
    );
};
