import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link className="header__home-link">
        <div className="header__logo">
          <h1 className="header__title">SCIENCE WITH MR.FLUFF</h1>
        </div>
      </Link>

      <div className="header__login">
        <h1 className="header__name">Welcome User</h1>
      </div>
    </header>
  );
}

export default Header;
