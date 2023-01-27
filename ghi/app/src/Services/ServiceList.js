import { useState, useEffect } from 'react';

const AppointmentList = () => {
    const [appointments, setAppointment] = useState([]);
    const [stateVin, setStateVin] = useState("")
    const [results, setResults] = useState([])

    const handleVinChange = (event) => {
        setVin(event.target.value)
    }

    const getAppointments = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url)
        if(response.ok) {
            const data = await response.json()
            setAppointment(data.appointments)
        }
    }

    const searchVin = async (event) => {
        const data = appointments.filter((appointment) => {
            appointment.vin.includes(stateVin)
        });
        setResults(data)
    }

    useEffect(() => {
        getAppointments();
        // teset if you need to add search vin to the useEffect
        searchVin();
    })

    return (
        <>
            <h1>Service History</h1>
            <div className="mb-3">
            </div>
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
                </tbody>
            </table>
        </>
    )








}
