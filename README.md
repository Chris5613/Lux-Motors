# CarCar

Team:

* Christian Wu - Sales
* Jake Thompson - Service

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

In our service backend you will find models, RESTful APIs and urls. In the frontend you will find forms and lists that will represent this to the user. Our service backend allows technicians and appointments to be created. They also allow you to see a list of appointments. Lastly you can see the service appointment history by entering the VIN number. You can also find a poller file with helps get data from the inventory backend. This is necessary because our inventory backend is its own microservice. The poller file helps get VIN data from the inventory microservice and helps create an AutoMobileVO object.

### Models
The service microservice has 3 models:

* Appointment Model - A model that represents the VIN number, customer name, reason for visiting, the date and time of appointment, and the technician assigned to the appointment.
* Technician Model - A model that represents the techician's name and their employee numbers.
* AutoMobileVO Model - A value object related to the automobile model in the inventory backend.

### Port

* The microservice opens and runs on port 8080.


### CRUD

* Listed below are api endpoints found in the backend:

* List Technicians - **GET** - "http://localhost:8080/api/services/technicians/"
**Returns:**
```
{
	"technicians": [
		{
			"name": "eric robbins",
			"employee_number": 221,
			"id": 1
		},
		{
			"name": "asdf",
			"employee_number": 45,
			"id": 2
		},
	]
}
```
* Get a specific Technician - **GET** - "http://localhost:8080/api/services/technicians/<int:pk>/"
**Returns:**
```
{
	"name": "eric robbins",
	"employee_number": 221,
	"id": 1
}
```
* Create Technician - **POST** - "http://localhost:8080/api/services/technicians/"
**SAMPLE DATA**
```
{
	"name": "Eric Robbins",
	"employee_number": 221
}
```
**Returns:**
```
{
	"name": "Eric Robbins",
	"employee_number": 221,
	"id": 1
}
```
* Delete a specific Technician - **DELETE** - "http://localhost:8080/api/services/technicians/<int:pk>/"
**Returns:**
```
{
	"message": "Technician has been successfully deleted"
}
```

* List Appointments - **GET** - "http://localhost:8080/api/services/appointments/"
**Returns:**
```
{
	"appointments": [
		{
			"href": "/api/services/appointments/1/",
			"vin": "adfdadsf56",
			"owner": "Test owner",
			"date": "2023-01-28T16:10:00+00:00",
			"technician": {
				"name": "eric robbins",
				"employee_number": 221,
				"id": 2
			},
			"reason": "Oil Change 1",
			"completed": true,
			"vip": false,
			"id": 1
		},
		{
			"href": "/api/services/appointments/3/",
			"vin": "testvin",
			"owner": "Eugene Takita ",
			"date": "2023-01-28T16:13:00+00:00",
			"technician": {
				"name": "eric robbins",
				"employee_number": 221,
				"id": 2
			},
			"reason": "Oil Change",
			"completed": true,
			"vip": false,
			"id": 3
		},
	]
}
```
* Get a specific appointment - **GET** - "http://localhost:8080/api/services/technicians/<int:pk>/"
**Returns:**
```
{
	"href": "/api/services/appointments/8/",
	"vin": "123",
	"owner": "owner",
	"date": "2023-02-08T15:10:00+00:00",
	"technician": {
		"name": "eric robbins",
		"employee_number": 221,
		"id": 2
	},
	"reason": "yws",
	"completed": false,
	"vip": false,
	"id": 8
}
```
* Get a appoint by vin - **GET** - "http://localhost:8080/api/appointments/history/<str:vin>/"
**Returns:**
```
{
	"href": "/api/services/appointments/8/",
	"vin": "123",
	"owner": "owner",
	"date": "2023-02-08T15:10:00+00:00",
	"technician": {
		"name": "eric robbins",
		"employee_number": 221,
		"id": 2
	},
	"reason": "yws",
	"completed": false,
	"vip": false,
	"id": 8
}
```
* Create Appointment - **POST** - "http://localhost:8080/api/services/appointments/"
**SAMPLE DATA**
```
{
	"vin": "123",
	"owner": "owner",
	"date": "2023-02-08T15:10:00+00:00",
	"technician": {
		"name": "eric robbins",
		"employee_number": 221,
	},
	"reason": "yws",
	"completed": false,
	"vip": false,
}
```
* Delete an Appointment - **DELETE** - "http://localhost:8080/api/services/appointments/<int:pk>/"
**Returns:**
```
{
	"deleted": true
}
```

### Sample Data
Create Technician - ``` {
	"name": "Eric Robbins",
	"employee_number": 221
} ```

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
- "GET" details on specific worker: "http://localhost:8090/api/sales/person/<int:pk>"
- "GET" get a worker sales history: "http://localhost:8090/api/sales/records/"
- "POST" create a worker: "http://localhost:8090/api/sales/person/"

Customers:
- "GET" List all customers: "http://localhost:8090/api/sales/customer/"
- "GET" Get a specific customer: "http://localhost:8090/api/sales/customer/<int:pk>/"
- "POST" Create a customer: "http://localhost:8090/api/sales/customer/"


Sale History:
- "GET" List all sales: "http://localhost:8090/api/sales/records"
- "GET" Get a specific sales history: "http://localhost:8090/api/sales/<int:pk>/"
- "POST" Create a new sale record: "http://localhost:8090/api/sales/records"
