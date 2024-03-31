import "./Header.scss";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logos/paw-print.svg";

function Header() {
  return (
    <header className="header">
      <NavLink className="header__home-link" to="/selections">
        <div className="header__logo-container">
          <img src={logo} alt="paw print" className="header__logo" />
          <h1 className="header__title">SCIENCE WITH MR.FLUFF</h1>
        </div>
      </NavLink>

      <div className="header__login">
        <h1 className="header__name">Welcome user</h1>
      </div>
    </header>
  );
}

export default Header;
