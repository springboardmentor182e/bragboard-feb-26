import React from 'react';

export interface Employee {
    id: number;
    name: string;
    role: string;
    email: string;
    department: string;
    dateJoined: string;
}

interface Props {
    employee: Employee;
}

export const EmployeeRow: React.FC<Props> = ({ employee }) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors duration-150 group">
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
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
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
                <button className="text-indigo-600 hover:text-indigo-900 mr-4 opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                <button className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
            </td>
        </tr>
    );
};
