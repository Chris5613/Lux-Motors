import React, {useState} from 'react';


const SalesPersonForm = () => {

    const [name,setName] = useState('')
    const [id,setId] = useState('')

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleIdChange = (event) => {
        const value = event.target.value
        setId(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = name
        data.employee_number = id

        const SalesUrl = 'http://localhost:8090/api/sales/person/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(SalesUrl, fetchConfig)
        if(response.ok) {
            const newSalesPerson = await response.json()

            setName('')
            setId('')
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>New Sales Person</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange}required type="text" className="form-control" value={name} />
                    <label htmlFor="style_name">Sales Person Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleIdChange}  required type="text" className="form-control" value={id} />
                    <label htmlFor="fabric">Employee ID?</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>

            </div>
            </div>
        </div>
    )
}

export default SalesPersonForm
