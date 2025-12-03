import { useContext, useState } from "react";
import "./Register.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        saveUser(user.email, user.accessToken);
        mostrarToastExito("Bienvenido! ", user.email);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        mostrarToastError(`${errorCode}: ${errorMessage}`);
      });
  };
  return (
    <div className="register">
      <div className="register-content">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          type="email"
          placeholder="Ingrese Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
          type="password"
          placeholder="Ingrese contrasena"
        />
        <button onClick={handleRegister} className="register-button">
          Registrar
        </button>
      </div>
    </div>
  );
}
