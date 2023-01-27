import React, {useState, useEffect} from 'react';

const ListModels = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        async function getModels() {
            const url = "http://localhost:8100/api/models/";
            const response = await fetch(url);
            if(response.ok) {
                const data = await response.json()
                setModels(data.models)
            }
        }
        getModels()
    }, [])


    return (
        <div>
            <h1>List models</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                {models.map(model =>
                    <tr key={model.id}>
                        <td>{model.name}</td>
                        <td>{model.manufacturer.name}</td>
                        <img src={model.picture_url} alt="model" width={500} height={300} />
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ListModels
