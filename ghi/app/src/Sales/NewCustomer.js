import React, {useState} from 'react';

const NewCustomer = () => {

    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [phone,setPhone] = useState('')

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleAddressChange = (event) => {
        const value = event.target.value
        setAddress(value)
    }

    const handlePhoneChange = (event) => {
        const value = event.target.value
        setPhone(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = name
        data.address = address
        data.phone_number = phone


        const CustomerUrl = 'http://localhost:8090/api/sales/customers/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(CustomerUrl, fetchConfig)
        if(response.ok) {
            const newCustomer = await response.json()

            setName('')
            setAddress('')
            setPhone('')
        }
    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Interested in being a customer?</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={handleNameChange} required type="text" className="form-control" value={name} />
                    <label htmlFor="style_name">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleAddressChange}  required type="text" className="form-control" value={address} />
                    <label htmlFor="fabric">Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handlePhoneChange} required type="text" className="form-control" value={phone} />
                    <label htmlFor="color">Phone #</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>

            </div>
            </div>
        </div>
    )
}

export default NewCustomer
