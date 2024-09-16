import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { userGet } from "../../utils/constants/api";
import { formatMessageAppointments } from "../../utils/functions/formatMessageAppointments";
import "./Dashboard.css";

export default function Dashboard() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    if (email) {
      fetchPersonalInfo(email);
      fetchTurnos(email);
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

  const fetchTurnos = async (userName) => {
    try {
      const response = await fetch(
        `http://localhost:7010/api/Reservation/Get/${userName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error("Error fetching turnos:", error);
    }
  };

  console.log(turnos);

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
          <div className="turnos">
            {turnos.length > 0 ? (
              turnos.map((turno, index) => (
                <div key={index} className="turno">
                  <p>
                    <strong>{turno.serviceDetailName}</strong>
                  </p>
                  <p>Hola, {turno.name}!</p>
                  <p
                    dangerouslySetInnerHTML={formatMessageAppointments(
                      turno.messageBody
                    )}
                  ></p>
                  <p>¡Te esperamos!</p>
                  <p>
                    <strong>Saludos cordiales, Sentirse bien SPA!</strong>
                  </p>
                </div>
              ))
            ) : (
              <>
                <p>Actualmente no posee ningún turno próximo.</p>
                <p>
                  Si desea consultar nuestros servicios,{" "}
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
