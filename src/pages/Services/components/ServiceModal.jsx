import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceModal.css";

export default function ServiceModal({ service, onClose }) {
  const navigate = useNavigate();

  const handleSelectAppointment = (service) => {
    navigate("/seleccionar-turno", { state: { service } });
  };

  console.log(service)

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Sentirse Bien - SPA</h2>
        <h2 className="modal-title-service">SERVICIOS DE {service.name}</h2>
        <ol>
          {service.details.map((detail, index) => (
            <li key={index}>
              <h4>{detail.name}</h4>
              <p className="service-description">{detail.description}</p>
              <p className="service-price">Precio: ${detail.price}</p>
            </li>
          ))}
        </ol>
        <div className="modal-content-buttons">
          <button
            className="button-reservation"
            onClick={() => handleSelectAppointment(service)}
          >
            Agendá tu turno
          </button>
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
