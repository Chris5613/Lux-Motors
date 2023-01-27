import React, {useState, useEffect} from 'react';

const CreateModel = () => {
    const [manufacturers, setManufacturers] = useState([]);
	const [manufacturer, setManufacturer] = useState("");
	const [name, setName] = useState("");
	const [pictureUrl, setPictureUrl] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const picture_url = pictureUrl;
		const manufacturer_id = manufacturer;
		const data = { name, picture_url, manufacturer_id };

		const modelUrl = "http://localhost:8100/api/models/";
		const fetchConfig = {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(modelUrl, fetchConfig);
		if (response.ok) {
			event.target.reset();
			setName("");
			setPictureUrl("");
			setManufacturer("");
		}
	};
    useEffect(() => {
		const getManufacturers = async () => {
			const url = "http://localhost:8100/api/manufacturers/";
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				setManufacturers(data.manufacturers);
			}
		};
		getManufacturers();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1 className="text-center">Create a New Model</h1>
					<form id="create-model-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input onChange={(e) => setName(e.target.value)} placeholder="Name" required type="text" className="form-control"/>
							<label htmlFor="name"> Name</label>
						</div>
						<div className="form-floating mb-3">
							<input onChange={(e) => setPictureUrl(e.target.value)} placeholder="pictureUrl" required type="text" className="form-control"/>
							<label htmlFor="pictureUrl">Picture URL</label>
						</div>
						<div className="mb-3">
							<select onChange={(e) => setManufacturer(e.target.value)} required className="form-select">
								<option value="">Select a Manufacturer</option>
								{manufacturers.map((manufacturer) =>
									<option key={manufacturer.id} value={manufacturer.id}>
										{manufacturer.name}
									</option>
								)}
							</select>
						</div>
						<div className="col text-center">
							<button className="btn btn-primary">Create</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};


export default CreateModel
