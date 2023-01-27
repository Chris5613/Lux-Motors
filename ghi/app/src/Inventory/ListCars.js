import React, {useState, useEffect} from 'react';

const ListCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        async function getCars() {
            const url = "http://localhost:8100/api/automobiles/";
            const response = await fetch(url);
            if(response.ok) {
                const data = await response.json()
                setCars(data.automobiles)
            }
        }
        getCars()
    }, [])




    return (
        <div>ListCars</div>
    )
}

export default ListCars
