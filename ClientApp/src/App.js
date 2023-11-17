import React, { useState, useEffect } from 'react';
import EmployeeTable from './Employee/EmployeeTable';
import EmployeeForm from './Employee/EmployeeForm';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);
    var serverUrl = 'http://localhost:52286/empl/';

    const getEmployees = () => {     
            fetch(serverUrl + 'GetEmployeesQuery', {
                'content-type': 'application/json',
                method: 'GET',
                redirect: 'follow'
            })
                .then((response) => response.json())
                .then((data) => setEmployees(data))
                .catch((error) => console.error('Error fetching data:', error));      
    };  

    useEffect(() => {
        getEmployees();
    }, [])

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
    };

    const handleDelete = (id) => {
        fetch(serverUrl + `RemoveEmployeeById?id=${id}`, {
                            'content-type': 'application/json',
                            method: 'POST',                
                            redirect: 'follow'})          
            .then(() => getEmployees())
            .catch((error) => console.error('Error deleting employee:', error));
    };

    const handleFormSubmit = (data) => {
        if (data == null)
            return;
            fetch(serverUrl + 'AddOrEditEmployee', {
                            'content-type': 'application/json',
                            method: 'POST',
                            redirect: 'follow',
                            body: JSON.stringify(data)})                        
                .then(() => getEmployees())
                .catch((error) => console.error('Error adding employee:', error));         
    };

    const handleFormCancel = () => {
        setEditingEmployee(null);
    };

    return (
        <div>
            <h1>Employees</h1>
            <EmployeeTable
                employees={employees}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <button onClick={() => setEditingEmployee({})}>Add new employee</button>
            {editingEmployee && (
                <EmployeeForm
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    initialData={editingEmployee}/>
            )}
        </div>
    );
};

export default App;