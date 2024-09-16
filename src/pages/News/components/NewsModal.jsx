import React from "react";
import "./NewsModal.css";

export default function NewsModal({ news, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Sentirse Bien - SPA</h2>
        <p className="modal-news-date">
          {new Date(news.date).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="modal-news-title">{news.name}</h3>
        <img src={`/assets/news-${news.imageId}.jpg`} alt={news.name} />

        {/* Dividir la descripción en párrafos basados en ". " */}
        {news.description.split(". ").map((paragraph, index) => (
          <p key={index} className="modal-news-description">
            {paragraph.trim()}
            {/* Añadir el punto al final si no está en la última oración */}
            {index < news.description.split(". ").length - 1 && "."}
          </p>
        ))}

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
