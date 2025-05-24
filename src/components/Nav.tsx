import { NavLink } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div className="nav">
      <ul className="table">
        <li className="nav-item nav-link">
          <NavLink to="/" className={({isActive}) => `nav-link${isActive ? 'active' : ''}`} end>
          Home
          </NavLink>
        </li>
        <li className="nav-item nav-link">
          <NavLink to="/SavedCandidates" className={({isActive}) => `nav-link${isActive ? 'active' : ''}`}>
          Potential Candidates
          </NavLink>
        </li>
      </ul>
    </div>
  )
};

export default Nav;