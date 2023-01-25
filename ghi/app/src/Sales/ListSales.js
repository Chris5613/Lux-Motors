import { useState, useEffect } from 'react';


const ListSales = () => {

    const [sales, setSales] = useState([]);
    useEffect(() => {
        async function getRecords() {
            const url = "http://localhost:8090/api/sales/records/";
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setSales(data);
            }
        }
        getRecords();
    }, []);
    return (
        <div>
            <h1 className="display-9 fw-bold">List of Sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Sales Person Name</th>
                        <th>Employee number</th>
                        <th>Customer Name</th>
                        <th>VIN</th>
                        <th>Price </th>
                    </tr>
                </thead>
                <tbody>
                {sales &&  sales.map(sale =>
                    <tr key={sale.id}>
                        <td>{sale.sales_person.name}</td>
                        <td>{sale.sales_person.employee_number}</td>
                        <td>{sale.customer.name}</td>
                        <td>{sale.automobile}</td>
                        <td>${sale.price}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ListSales
