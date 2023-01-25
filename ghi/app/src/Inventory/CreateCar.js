import { useEffect, useState } from "react";

const CreateCar = () => {
	const [models, setModels] = useState([])
	const [model, setModel] = useState("")
    const [year, setYear] = useState("")
	const [vin, setVin] = useState("")
    const [color, setColor] = useState("")

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = { color, year, vin, model };
		data.year = parseInt(data.year);
		data.model_id = parseInt(data.model);
		delete data.model;


		const carUrl = "http://localhost:8100/api/automobiles/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(carUrl, fetchConfig);
		if (response.ok) {
			const newCar = await response.json()
            console.log(newCar)
			setVin("")
			setModel("")
            setColor("")
			setYear("")
		}
	};

    useEffect(() => {
		async function getModels() {
			const url = "http://localhost:8100/api/models/"
			const response = await fetch(url)

			if (response.ok) {
				const data = await response.json()
				setModels(data.models)
			}
		}
		getModels();
	}, [])
	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create new automobile</h1>
					<form id="add-automobile-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input onChange={(event) => setColor(event.target.value)} required type="text" className="form-control" value={color} />
							<label>Color</label>
						</div>
						<div className="form-floating mb-3">
							<input onChange={(event) => setYear(event.target.value)} required type="number" className="form-control" value={year}/>
							<label>Year</label>
						</div>
						<div className="form-floating mb-3">
							<input onChange={(event) => setVin(event.target.value)} required type="text" className="form-control" value={vin}/>
							<label>VIN</label>
						</div>
						<div className="mb-3">
							<select onChange={(event) => setModel(event.target.value)} required className="form-select" value={model}>
                            <option value="">Select an Model</option>
								{models.map((model) =>
									<option key={model.id} value={model.id}>
										{model.name}
									</option>
								)}
							</select>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	)
}
export default CreateCar;
