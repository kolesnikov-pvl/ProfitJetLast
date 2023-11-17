import React, { useState } from 'react';

const EmployeeForm = ({ onSubmit, onCancel, initialData }) => {
    initialData = initialData ? initialData :
        {
            ProjectName: '',
            FirstName: '',
            LastName: '',
            Rate: '',
            Role: '',
        };

    console.log(initialData);
    const [employeeData, setEmployeeData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });            
    };

    const handleSubmit = (e) => {      
        e.preventDefault();
        if (employeeData.projectName == undefined ||
            employeeData.firstName == undefined ||
            employeeData.lastName == undefined)
            return;
        else {
            onSubmit(employeeData);
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Project Name:
                <input
                    type="text"
                    name="projectName"
                    value={employeeData.projectName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Employee first name:
                <input
                    type="text"
                    name="firstName"
                    value={employeeData.firstName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Last name:
                <input
                    type="text"
                    name="lastName"
                    value={employeeData.lastName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Rate:
                <input
                    type="text"
                    name="rate"
                    value={employeeData.rate}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Role:
                <select
                    name="role"
                    value={employeeData.role}                      
                    onChange={handleChange}>
                    <option value=""></option>
                    <option value="Architect">Architect</option>
                    <option value="SchematicDesigner">SchematicDesigner</option>
                    <option value="TechWriter">TechWriter</option>
                    <option value="ElectricalEngineer">ElectricalEngineer</option>
                </select>
            </label>
            <br />

            <button type="submit">Add or edit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EmployeeForm;