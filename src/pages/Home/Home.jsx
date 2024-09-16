import React, { useState } from "react";
import toast from "react-hot-toast";
import Box from "../../components/Box/Box";
import GoogleMaps from "./components/GoogleMaps/GoogleMaps";
import Input from "../../components/Input/Input";
import { homePost } from "../../utils/constants/api";
import "./Home.css";

import homeImage1 from "/assets/home-2.jpg";
import homeImage2 from "/assets/home-3.jpg";
import homeImage3 from "/assets/home-4.jpg";
import avatar1 from "/assets/avatar-1.png";
import avatar2 from "/assets/avatar-2.png";
import avatar3 from "/assets/avatar-3.png";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: null,
    emailAddress: null,
    message: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(homePost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Error: ${
            errorData.errors.EmailAddress
              ? errorData.errors.EmailAddress.join(" ")
              : "An unexpected error occurred."
          }`
        );
      } else {
        toast.success("Consulta enviada con éxito!");
        setFormData({ fullName: "", emailAddress: "", message: "" });
      }
    } catch (error) {
      toast.error(
        "Error al enviar la consulta. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="home-container">
      <section className="hero-container">
        <div className="hero-content">
          <Box
            title="SPA & MASAJE"
            description="Toma un poco de tiempo para ti mismo."
          />
        </div>
      </section>

      <section className="section-2">
        <div className="section-2-container">
          <h3>Amplia gama de selección de servicios</h3>
          <p>
            Amplia variedad de servicios para satisfacer todas tus necesidades.
          </p>
          <a href="/servicios">Conocé nuestros servicios</a>
          <div>
            <img src={homeImage1} alt="Spa image from pexels" />
            <img src={homeImage2} alt="Spa image from pexels" />
            <img src={homeImage3} alt="Spa image from pexels" />
          </div>
        </div>
      </section>

      <section className="section-3">
        <h3>PERSONALIZAMOS EL CUIDADO DE LA PIEL</h3>
        <p>Tu piel, tu mejor versión.</p>

        <div className="section-3-services">
          <div>
            <h4>Punta de Diamante</h4>
            <p>
              La Punta de Diamante ofrece una <strong>microexfoliación</strong>{" "}
              profunda que renueva tu piel, dejándola suave, luminosa y libre de
              impurezas.
            </p>
            <a href="/servicios">Ver servicio</a>
          </div>

          <div>
            <h4>Limpieza profunda</h4>
            <p>
              La Limpieza Profunda con Hidratación{" "}
              <strong>elimina impurezas y nutre tu piel</strong>, dejándola
              fresca, radiante y revitalizada.
            </p>
            <a href="/servicios">Ver servicio</a>
          </div>

          <div>
            <h4>Crio frecuencia facial</h4>
            <p>
              La Criofrecuencia Facial genera un{" "}
              <strong>"shock térmico"</strong>
              que logra un efecto lifting instantáneo, rejuveneciendo y
              tonificando tu piel al instante.
            </p>
            <a href="/servicios">Ver servicio</a>
          </div>
        </div>
      </section>

      <section className="section-5">
        <div>
          <h3>NUESTROS CLIENTES</h3>
          <p>
            La satisfacción de nuestros clientes es nuestra mayor prioridad.
            Ellos confían en nosotros para su bienestar y belleza.
          </p>

          <div className="section-5-personal">
            <div>
              <img src={avatar1} alt="" />
              <p>
                "El ambiente es tan relajante que no quiero irme nunca. ¡Un
                verdadero oasis!."
              </p>
              <h4>Juan Pérez</h4>
            </div>

            <div>
              <img src={avatar2} alt="" />
              <p>
                "Los tratamientos son increíbles y el personal es muy
                profesional. Siempre salgo sintiéndome renovada."
              </p>
              <h4>María Sánchez</h4>
            </div>

            <div>
              <img src={avatar3} alt="" />
              <p>
                "He probado varios spas, pero este es mi favorito. El servicio
                es insuperable."
              </p>
              <h4>Ana López</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="hero2-container">
        <div className="hero2-content">
          <Box
            title="TRATAMIENTOS CORPORALES"
            description="Diseñados para esculpir, tonificar y rejuvenecer tu cuerpo,
              brindándote resultados visibles y duraderos."
          />
        </div>
      </section>

      <section className="section-6">
        <div style={{ width: "100%", height: "400px" }}>
          <GoogleMaps />
        </div>

        <form onSubmit={handleSubmit}>
          <h4>Realizá tu consulta</h4>

          <Input
            name="fullName"
            type="text"
            label="NOMBRE Y APELLIDO"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            name="emailAddress"
            type="email"
            label="EMAIL DE CONTACTO"
            value={formData.emailAddress}
            onChange={handleChange}
          />

          <label htmlFor="message">BREVE DESCRIPCIÓN DEL SERVICIO</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Enviar</button>
        </form>
      </section>
    </div>
  );
}
