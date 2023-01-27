import React, { useState, useEffect } from 'react';

const AppointmentForm = () => {
    const [vin, setVin] = useState("")
    const [owner, setOwner] = useState("")
    const [date, setDate] = useState("")
    const [technicians, setTechnicians] = useState([]);
	const [technician, setTechnician] = useState("");
	const [reason, setReason] = useState("");


    const handleVinChange = event => {
        setVin(event.target.value)
    }

    const handleOwnerChange = event => {
        setOwner(event.target.value)
    }

    const handleDateChange = event => {
        setDate(event.target.value)
    }

    const handleTechnicianChange = event => {
        setTechnician(event.target.value)
    }

    const handleReasonChange = event => {
        setReason(event.target.value)
    }

    useEffect(() => {
        async function getTechs() {
            const url = "http://localhost:8080/api/services/technicians/";
            const response = await fetch(url)
            if(response.ok) {
                const data = await response.json()
                setTechnicians(data.technicians)
            }
        }
        getTechs();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {}
        data.vin = vin
        data.owner = owner
        data.date = date
        data.technician = technician
        data.reason = reason

        const url = "http://localhost:8080/api/services/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(url, fetchConfig)
        if(response.ok) {
            const newAppointment = await response.json()
            console.log("this is the new app", newAppointment)


            setVin("")
            setOwner("")
            setDate("")
            setTechnician("")
            setReason("")
        }

    }
    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create an appointment</h1>
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input onChange={handleVinChange} placeholder="Vin" required type="text" className="form-control" value={vin} />
                    <label htmlFor="vin">Vin</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleOwnerChange} placeholder="Owner" required type="text" className="form-control" value={owner} />
                    <label htmlFor="owner">Owner</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleDateChange} placeholder="Date" required type="datetime-local" className="form-control" value={date} />
                    <label htmlFor="date">Date</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="reason">Reason</label>
                    <textarea onChange={handleReasonChange} rows={1} cols={40} name="reason" className="form-control" value={reason} />
				</div>

                <div className="mb-3">
                    <select onChange={handleTechnicianChange} required value={technician} className="form-select" >
                    <option>Choose a Technician</option>
                    {technicians.map(technician => {
                                    return (
                                        <option key={technician.id} value={technician.id}>
                                            {technician.name}
                                        </option>
                                    )
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>

            </div>
            </div>
        </div>
    )


}

export default AppointmentForm
