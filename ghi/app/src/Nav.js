import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >Sales</button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/customer/new">Add a customer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/person/new">Add a sales person</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/new">Record a New Sale</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/list">List of Sales </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales/history">Sales History</NavLink>
                </li>
              </ul>
            </div>
          <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >Inventory</button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/manufacturers/list">List of manufacturers</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/vehicle/list">List of vehicle models</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/automobile/list">List of automobiles</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/manufacturers/create">Create a manufacturer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/vehicle/create">Create a vehicle model</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/automobile/create">Create an automobile</NavLink>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
