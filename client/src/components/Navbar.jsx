import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
     
      <NavLink to="/Home" className={({ isActive }) => (isActive ? "active" : "")}></NavLink>
      {/* <NavLink to="/abt" className={({ isActive }) => (isActive ? "active" : "")}></NavLink> */}
    
      <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}></NavLink>
    
    </nav>
  );
}

export default Navbar;
