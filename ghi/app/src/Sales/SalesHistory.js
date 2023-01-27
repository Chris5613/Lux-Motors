import React, {useState, useEffect} from 'react'


function SalesHistory() {

    const [persons, setPerson] = useState([]);
    const [sales, setSales] = useState([]);
    const [name, setName] = useState('');

    const getSalesperson = async () => {
        const url = 'http://localhost:8090/api/sales/person/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setPerson(data)
            }
        }

    const getSales = async () => {
        const url = 'http://localhost:8090/api/sales/records/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data)
            }
        }

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }


    useEffect(() => {
        getSalesperson();
        getSales()
        }, []);


    return (
    <>
        <h1>Sales Person History</h1>
        <div className="mb-3">
            <select value={name} onChange={handleNameChange} required id="location" name="location" className="form-select">
            <option value="">Choose a Sales Person</option>
            {persons.map(person => {
                    return (
                        <option key={person.id} value={person.name}>
                        {person.name}
                        </option>
                    );
                })}
            </select>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Sales Person</th>
                    <th>Employee Number</th>
                    <th>Purchaser</th>
                    <th>VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {sales.filter(sale => sale.sales_person.name === name)
                .map(sale => {
                return (
                    <tr key={sale.id}>
                        <td>{sale.sales_person.name}</td>
                        <td>{sale.sales_person.employee_number}</td>
                        <td>{sale.customer.name}</td>
                        <td>{sale.automobile}</td>
                        <td>${sale.price}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </>
)
}

export default SalesHistory
