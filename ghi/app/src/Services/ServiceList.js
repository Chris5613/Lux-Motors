import { useState, useEffect } from 'react';

const ServiceList = () => {
    const [appointments, setAppointments] = useState([]);
    const [stateVin, setStateVin] = useState("")
    const [results, setResults] = useState([])

    const handleVinChange = (event) => {
        setStateVin(event.target.value)
    }


        async function getAppointments() {
            const url = "http://localhost:8080/api/services/appointments/";
            const response = await fetch(url);
            if(response.ok) {
                const data = await response.json()
                //check this line below and what to put in data
                setAppointments(data.appointments)
            };
        }
        useEffect(() => {
            getAppointments()
        }, [])

    const searchVin = async (event) => {
        const data = appointments.filter(appointment => {
            // console.log(appointment.vin)
            // console.log("this is statevin,", stateVin)
            return appointment.vin.includes(stateVin)
        });
        setResults(data)
        console.log("this is the set results data -----", data)
    }


    return (
        <>
            <h1>Service History</h1>
            <div className="mb-3">
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleVinChange} placeholder="Vin" required type="text" className="form-control" value={stateVin} />
                <label htmlFor="stateVin">Vin</label>
            </div>
            <button onClick={searchVin} className="btn btn-primary">Search</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Technician</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(result =>
                        <tr key={result.id}>
                            <td>{result.vin}</td>
                            <td>{result.owner}</td>
                            <td>{new Date(result.date).toLocaleDateString()}</td>
                            <td>{result.technician.name}</td>
                            <td>{result.reason}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}


export default ServiceList
