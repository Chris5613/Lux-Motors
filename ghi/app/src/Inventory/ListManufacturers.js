import { useEffect, useState } from "react";


const ListManufacturers = () => {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        async function getManufacturers() {
            const url = "http://localhost:8100/api/manufacturers/";
            const response = await fetch(url);

            if(response.ok) {
                const data = await response.json()
                console.log("this it the data", data.manufacturers)
                setManufacturers(data.manufacturers)
            }
        }

        getManufacturers()
    }, [])


    return (
        <div>
            <h1>Manufacturers</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {manufacturers.map(manufacturer =>
                    <tr key={manufacturer.id}>
                        <td>{manufacturer.name}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ListManufacturers
