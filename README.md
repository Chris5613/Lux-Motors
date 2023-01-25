# CarCar

Team:

* Person 1 - Which microservice?
* Person 2 - Which microservice?

## How to Run this Application

1. Clone on to your computer

2. CD in to the folder

3. Open up your prefer code editor

4. Run these commands using docker
```
    docker volume create beta-data
    docker compose build
    docker compose up
```

## Applicaiton Diagram

Insert diagram of project here

## CRUD Routes, API Documentation
Appointment Service:
Localhost, Port 8080


GET request to /api/appointments/

Returns:
```
{
	"appointments": [
		{
			"id": 1,
			"vin": "1234567890",
			"vip": false,
			"technician": 21
		},
        ...
	]
}
```

POST request to /api/appointments/

Request body:
```
{
	"vin": "123498793443",
	"owner": "Carmen",
	"time": "2023-03-20",
	"reason": "Car JSON works",
	"technician": 21
}
```

Returns (status code 200):
```
{
	"id": 7,
	"vin": "123498793443",
	"owner": "Carmen",
	"time": "2023-03-20",
	"reason": "Car JSON works",
	"vip": false,
	"technician": {
		"id": 1,
		"name": "Caleb",
		"employee_number": 21
	}
}
```

## Design

CarCar is a full stack application created with django as the backend, React js as the front end, and postgres as the database. It has 3 microservices
Inventory, Sales, and Service. The sales and service microservices are used to send, store, list,and create information for a dealership. The inventory microservice is what sales and service rely on for data to be sent back and forth.

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The Sales microservice keeps tracks of customers , workers, and the sales history of the dealership.

Users are able to:
- Create a new Sales Person
- Create a Potential Customer
- Record a new sale
- List all Sales
- Filter Sales based on Sales Person

Sales Person:
- "GET" list of sales people: "http://localhost:8090/api/sales/person/"
- "GET" details on specific worker: "http://localhost:8090/api/sales/person/${id}"
- "GET" get a worker sales history: "http://localhost:8090/api/sales/records/${name}"
- "POST" create a worker: "http://localhost:8090/api/sales/person/"

Customers:
-"GET" List all customers: "http://localhost:8090/api/sales/customer/"
-"GET" Get a specific customer: "http://localhost:8090/api/sales/customer/id/"
-"POST" Create a customer: "http://localhost:8090/api/sales/customer/"


Sale History:
-"GET" List all sales: "http://localhost:8090/api/sales/records"
-"GET" Get a specific sales history: "http://localhost:8090/api/sales/id/"
-"POST" Create a new sale record: "http://localhost:8090/api/sales/records"
