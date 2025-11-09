import CartWidget from "../CartWidget/CartWidget";
import CategoryListMenu from "../CategoryListMenu/CategoryListMenu";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand text-center" href="#">
            DE TODO
            <br />Y ALGO MÁS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/contactos"}>
                  Contacto
                </NavLink>
              </li>
              <li className="nav-item">
                <CategoryListMenu />
              </li>
            </ul>
          </div>
          <CartWidget />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
