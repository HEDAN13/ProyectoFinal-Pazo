import CartWidget from "../CartWidget/CartWidget";
import CategoryListMenu from "../CategoryListMenu/CategoryListMenu";
import { NavLink, useNavigate } from "react-router";
import "./NavBar.css";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { mostrarToastError } from "../notificaciones";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";

function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { deleteUser } = useContext(UserContext);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        deleteUser();
        navigate("/login");
      })
      .catch((error) => {
        mostrarToastError(error);
      });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-center" to={"/"}>
            DE TODO
            <br />Y ALGO MÁS
          </NavLink>
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
          <ButtonPrimary className="nav-logout" onClick={handleLogout}>
            SALIR
          </ButtonPrimary>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
