import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link" activeClassName="active" end>
        Home
      </NavLink>
      <NavLink to="/battle" className="nav-link" activeClassName="active">
        Battle
      </NavLink>
      <NavLink to="/history" className="nav-link" activeClassName="active">
        History
      </NavLink>
      <NavLink to="/about" className="nav-link" activeClassName="active">
        About
      </NavLink>
    </nav>
  );
}

export default Navbar;
