import { useEffect, useState } from "react";


const ListManufacturers = () => {
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(() => {
        async function getManufacturers() {
            const url = "http://localhost:8100/api/manufacturers/";
            const response = await fetch(url);

            if(response.ok) {
                const data = await response.json()
                setManufacturers(data.manufacturers)
            }
        }

        getManufacturers()
    }, [])


    return (
        <div>
            <h1>Manufacturers</h1>
        </div>
    )
}

export default ListManufacturers
