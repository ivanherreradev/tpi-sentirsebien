import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element, ...rest }) {
  const { auth } = useContext(AuthContext);

  return auth.token ? element : <Navigate to="/iniciar-sesion" />;
}
