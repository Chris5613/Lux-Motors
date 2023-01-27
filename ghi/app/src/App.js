import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './Sales/SalesPersonForm';
import NewCustomer from './Sales/NewCustomer';
import NewSaleForm from './Sales/NewSaleForm';
import ListSales from './Sales/ListSales';
import SalesHistory from './Sales/SalesHistory';
import ListCars from './Inventory/ListCars';
import ListManufacturers from './Inventory/ListManufacturers';
import ListModels from './Inventory/ListModels';
import CreateModel from './Inventory/CreateModel';
import CreateCar from './Inventory/CreateCar';
import CreateManufacturer from './Inventory/CreateManufacturer';
import TechnicanForm from './Services/TechnicianForm';
import AppointmentForm from './Services/AppointmentForm';
import AppointmentList from './Services/AppointmentList';
import ServiceList from './Services/ServiceList';


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="person/new" element={<SalesPersonForm />} />
          <Route path="customer/new" element={<NewCustomer />} />
          <Route path="sales/new" element={<NewSaleForm />} />
          <Route path="sales/list" element={<ListSales />} />
          <Route path="sales/history" element={<SalesHistory/>} />
          <Route path="manufacturers/list" element={<ListManufacturers/>} />
          <Route path="vehicle/list" element={<ListModels/>} />
          <Route path="automobile/list" element={<ListCars/>} />
          <Route path="manufacturers/create" element={<CreateManufacturer/>} />
          <Route path="vehicle/create" element={<CreateModel/>} />
          <Route path="automobile/create" element={<CreateCar/>} />
          <Route path="technicians/new" element={<TechnicanForm  />}  />
          <Route path="appointments/new" element={<AppointmentForm  />} />
          <Route path="appointments/" element={<AppointmentList />} />
          <Route path="appointments/history" element={<ServiceList  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
