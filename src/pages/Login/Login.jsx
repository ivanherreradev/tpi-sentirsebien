import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/Input/Input";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (!result.success) {
      if (result.errors && result.errors.$values) {
        // Acceder directamente a los mensajes dentro de $values si existen
        result.errors.$values.forEach((message) => {
          toast.error(message);
        });
      } else {
        toast.error("Inicio de sesión fallido. Intente nuevamente!");
      }
    } else {
      toast.success("Ha iniciado sesión correctamente");

      setTimeout(() => {
        navigate(`/panel-personal/${encodeURIComponent(email)}`);
      }, 1500);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="INGRESE SU EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          label="INGRESE SU CONTRASEÑA"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}{" "}
        <div>
          <button type="submit">Ingresar</button>
          <Link to="/">Volver al inicio</Link>
        </div>
      </form>
    </div>
  );
}
