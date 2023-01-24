import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonForm from './Sales/SalesPersonForm';
import NewCustomer from './Sales/NewCustomer';
import NewSaleForm from './Sales/NewSaleForm';
import ListSales from './Sales/ListSales';
import SalesHistory from './Sales/SalesHistory';


function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="person/">
              < Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="customer/">
              < Route path="new" element={<NewCustomer />} />
          </Route>
          <Route path="sales/">
              < Route path="new" element={<NewSaleForm />} />
          </Route>
          <Route path="sales/">
              < Route path="list" element={<ListSales />} />
          </Route>
          <Route path="sales/">
              <Route path="history" element={<SalesHistory/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
