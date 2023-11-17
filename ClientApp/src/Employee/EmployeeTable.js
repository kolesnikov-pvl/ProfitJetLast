import React from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Project name</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Role</th>
                    <th>Rate</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.projectName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.roleStr}</td>
                        <td>{employee.rate}</td>
                        <td>
                            <button onClick={() => onEdit(employee)}>Edit</button>
                            <button onClick={() => onDelete(employee.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;