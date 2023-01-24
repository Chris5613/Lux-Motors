import React, {useState, useEffect} from 'react';

const NewSaleForm = () => {

    const [automobile, setAutomobile] = useState("");
    const [automobiles, setAutomobiles] = useState([]);
    const [salesPerson, setSalesPerson] = useState("");
    const [salesPeople, setSalesPeople] = useState([]);
    const [customer, setCustomer] = useState("");
    const [customers, setCustomers] = useState([]);
    const [price, setPrice] = useState("");


    async function getAutomobiles() {
        const url = "http://localhost:8090/api/sales/automobiles/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data);
        };
    }
    useEffect(() => {
        getAutomobiles();
    }, []);


    useEffect(() => {
        async function getSalesPeople() {
            const url = "http://localhost:8090/api/sales/person";
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setSalesPeople(data);
            }
        }
        getSalesPeople();
    }, []);


    useEffect(() => {
        async function getCustomers() {
            const url = "http://localhost:8090/api/sales/customers/";
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
            }
        }
        getCustomers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.automobile = automobile;
        data.sales_person = salesPerson;
        data.customer = customer;
        data.price = price;

        const salesHistoryUrl = "http://localhost:8090/api/sales/records/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(salesHistoryUrl, fetchConfig);
        if (response.ok) {
            const newSalesRecord = await response.json();
            console.log(newSalesRecord)
            setAutomobile("");
            setSalesPerson("");
            setCustomer("");
            setPrice("");
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Report a new sale</h1>
                    <form id="create-newsales-form" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <select onChange={(event) => setAutomobile(event.target.value)} required className="form-select" value={automobile} >
                                <option value="">Choose an automobile</option>
                                {automobiles.map((automobile,index) =>
                                    <option key={automobile.import_href} value={automobile.import_href}>
                                        {automobile.vin}
                                    </option>
                                    )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={(e) => setSalesPerson(e.target.value)} required name="Sales Person" id="sales_people" className="form-select" value={salesPerson}>
                                <option value="">Choose a sales person</option>
                                {salesPeople.map((salesPerson) => {
                                    return (
                                        <option key={salesPerson.id} value={salesPerson.name}>
                                            {salesPerson.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <select onChange={(e) => setCustomer(e.target.value)} required name="Customer" id="customer" className="form-select" value={customer}>
                                <option value="">Choose a customer</option>
                                {customers.map((customer) => {
                                    return (
                                        <option key={customer.id} value={customer.name}>
                                            {customer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setPrice(e.target.value)} placeholder="Price" required type="text" name="price" id="price" className="form-control" value={price} />
                            <label htmlFor="price">Sale price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default NewSaleForm
