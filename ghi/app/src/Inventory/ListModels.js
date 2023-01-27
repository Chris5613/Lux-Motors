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
        <div>ListModels</div>
    )
}

export default ListModels
