import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router";
import { UserContext } from "../../context/UserContext";
import {
  mostrarToastError,
  mostrarToastExito,
} from "../../components/notificaciones";

export default function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        saveUser(user.email, user.accessToken);
        mostrarToastExito(`Bienvenido! ${email.split("@")[0]}`);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        mostrarToastError(`${errorCode}: ${errorMessage}`);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="login">
      <div className="login-content">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          type="email"
          placeholder="Ingrese Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          type="password"
          placeholder="Ingrese contrasena"
        />
        <button onClick={handleLogin} className="login-button">
          Ingresar
        </button>

        <p>
          ¿Aún no estás registrado?{" "}
          <NavLink to={"/register"}>Registrate</NavLink>{" "}
        </p>
      </div>
    </div>
  );
}
