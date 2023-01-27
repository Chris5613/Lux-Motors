import React, { useState, useEffect } from 'react';


const TechnicanForm = () => {
    const [name, setName] = useState('');
    const [employeeNumber, setEmployeeNumber] = useState('');

    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handleEmployeeNumberChange = event => {
        setEmployeeNumber(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = name
        data.employee_number = employeeNumber

        const url = 'http://localhost:8080/api/services/technician/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(url, fetchConfig)
        if(response.ok) {
            const newTechnician = await response.json()
            console.log(newTechnician)

            setName("")
            setEmployeeNumber("")
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a technician</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} placeholder="Name" required type="text" className="form-control" value={name} />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleEmployeeNumberChange} placeholder="Employee Number" required type="text" className="form-control" value={employeeNumber} />
                    <label htmlFor="employeeNumber">Employee Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>

            </div>
            </div>
        </div>
    )



}

export default TechnicanForm
