import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userGet } from "../../utils/constants/api";
import { formatMessageAppointments } from "../../utils/functions/formatMessageAppointments";
import "./Dashboard.css";

export default function Dashboard() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [turno, setTurno] = useState({
    title: "Lifting de Pestañas",
    turnoFor: "Iván",
    message:
      "¡Gracias por elegirnos para tu tratamiento! Te confirmamos que tu turno para el lifting de pestañas está reservado para el 10 de septiembre de 2024 a las 17:00. Durante este tratamiento, realzaremos la curvatura natural de tus pestañas, otorgándoles un aspecto más largo y definido, sin necesidad de extensiones ni maquillaje. Te recomendamos llegar unos minutos antes de tu turno para que puedas relajarte y disfrutar al máximo de la experiencia.",
  });
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    if (email) {
      fetchPersonalInfo(email);
    }
  }, [email]);

  const fetchPersonalInfo = async (email) => {
    try {
      const response = await fetch(`${userGet}${email}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setPersonalInfo(data);
      setUser(data.name);
    } catch (error) {
      console.error("Error fetching personal information:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <>
          <h2>BIENVENIDO, {user}! 👋</h2>

          <h4>Datos personales</h4>
          <div className="personal-information">
            {personalInfo ? (
              <>
                <p>
                  <strong>Nombre y apellido:</strong> {personalInfo.name}{" "}
                  {personalInfo.lastName}
                </p>
                <p>
                  <strong>Ubicación:</strong> {personalInfo.province},{" "}
                  {personalInfo.city}
                </p>
                <p>
                  <strong>Dirección:</strong> {personalInfo.address}
                </p>
                <p>
                  <strong>Correo electrónico:</strong>{" "}
                  {personalInfo.emailAddress}
                </p>
              </>
            ) : (
              <div className="loading-dashboard">
                <p>Cargando panel personal...</p>
              </div>
            )}
          </div>

          <h4>Turnos próximos</h4>
          <div className="turno">
            {turno ? (
              <>
                <p>
                  <strong>{turno.title}</strong>
                </p>
                <p>Hola, {turno.turnoFor}!</p>
                <p dangerouslySetInnerHTML={formatMessageAppointments(turno.message)}></p>
                <p>¡Te esperamos!</p>
                <p>
                  <strong>Saludos cordiales, Sentirse bien SPA!</strong>
                </p>
              </>
            ) : (
              <>
                <p>Actualmente no posee ningún turno próximo.</p>
                <p>
                  Si desea consultar nuestros servicios
                  <a href="/servicios">click aquí</a>
                </p>
                <p>
                  <strong>Saludos cordiales, Sentirse bien SPA!</strong>
                </p>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="loading-dashboard">
          <p>Cargando panel personal...</p>
        </div>
      )}
    </div>
  );
}
