import React, {useState, useEffect} from 'react';

const ListCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        async function getCars() {
            const url = "http://localhost:8100/api/automobiles/";
            const response = await fetch(url);
            if(response.ok) {
                const data = await response.json()
                console.log(data.autos.manufacturer)
                setCars(data.autos)
            }
        }
        getCars()
    }, [])




    return (
        <div>
            <h1>List Cars</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                </thead>
                <tbody>
                {cars.map(car =>
                    <tr key={car.id}>
                        <td>{car.vin}</td>
                        <td>{car.color}</td>
                        <td>{car.year}</td>
                        <td>{car.model.name}</td>
                        <td>{car.model.manufacturer.name}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ListCars
