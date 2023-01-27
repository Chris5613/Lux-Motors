import { useState, useEffect } from 'react';

const AppointmentList = () => {
    const [appointments, setAppointment] = useState([]);

    useEffect(() => {
        async function getAppointments() {
            const url = "http://localhost:8080/api/appointments/";
            const response = await fetch(url);
            if(response.ok) {
                const data = await response.json()
                //check this line below and what to put in data
                setAppointment(data.appointments)
            }
        }
        getAppointments();
    }, [])

    const canceledAppointment = async (id) => {
        const url = `http://localhost:8080/api/appointments/detail/${id}/`;
        const fetchConfig = {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(url, fetchConfig);
            if(response.ok) {
                window.location.reload();
            }
    }

    const finishedAppointment = async (id) => {
        const url = `http://localhost:8080/api/appointments/detail/${id}/`;
        const fetchConfig = {
            method: "put",
			body: JSON.stringify({ finished: true }),
			headers: {
				'Content-Type': 'application/json',
			}
        };

        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            window.location.reload();
        }
    }
    return (
        <div>
            <h1>List of Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Owner</th>
                        <th>Date</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP</th>
                    </tr>
                </thead>
                <tbody>
                {appointments.map((appointment) => {
                    if(appointment.completed == False) {
                        return (
                            <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.owner}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.technician.name}</td>
                            <td>{appointment.reason}</td>
                            <td>
                                <button onClick={canceledAppointment(appointment.id)} className="btn btn-primary">Cancel</button>
                            </td>
                            <td>
                                <button onClick={finishedAppointment(appointment.id)} className="btn btn-primary">Finish</button>
                            </td>
                        </tr>
                        )
                    }
                }
                )}
                </tbody>
            </table>
        </div>
    )
}

export default AppointmentList
