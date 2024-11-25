import React from "react";
import "./DownloadApp.css"; // Importa los estilos

export const DownloadApp = () => {
  return (
    <div className="download-app-container">
      <h1 className="download-app-title">Descarga Nuestra Aplicación</h1>
      <p className="download-app-text">
        Lleva toda la experiencia a tu bolsillo. Descarga nuestra aplicación y
        disfruta de todas las funcionalidades desde tu teléfono móvil.
      </p>
      <div className="download-app-images">
        <img
          src="./assets/Mockup-1.png" // Reemplaza con el path de tu imagen
          alt="Mockup de teléfono 1"
          className="mockup-image"
        />
        <img
          src="./assets/Mockup-2.png" // Reemplaza con el path de tu imagen
          alt="Mockup de teléfono 2"
          className="mockup-image"
        />
      </div>
      <a href="/apk/sentirsebien-mobileapp.apk" download className="download-app-button">
        Descargar Aplicación
      </a>
    </div>
  );
};
