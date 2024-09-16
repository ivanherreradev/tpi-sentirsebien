import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./About.css";

import aboutImage1 from "/assets/about-1.jpg";
import aboutImage2 from "/assets/about-2.jpg";
import aboutImage3 from "/assets/about-3.jpg";
import carrouselImage1 from "/assets/carrousel-1.jpg";
import carrouselImage2 from "/assets/carrousel-2.jpg";
import carrouselImage3 from "/assets/carrousel-3.jpg";
import carrouselImage4 from "/assets/carrousel-4.jpg";
import carrouselImage5 from "/assets/carrousel-5.jpg";

export default function About() {
  return (
    <div className="about-container">
      <div className="carousel">
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={4000}
          dynamicHeight={true}
        >
          <div>
            <img src={carrouselImage1} alt="Imagen del carrousel 1" />
          </div>
          <div>
            <img src={carrouselImage2} alt="Imagen del carrousel 2" />
          </div>
          <div>
            <img src={carrouselImage3} alt="Imagen del carrousel 3" />
          </div>
          <div>
            <img src={carrouselImage4} alt="Imagen del carrousel 4" />
          </div>
          <div>
            <img src={carrouselImage5} alt="Imagen del carrousel 5" />
          </div>
        </Carousel>
      </div>

      <section className="about-section-1">
        <h3>NUESTRA HISTORIA</h3>
        <div>
          <p>
            Sentirse Bien nació del sueño de Valeria y Esteban, dos amigos de la
            infancia que notaron la necesidad de un espacio para el bienestar en
            su comunidad. <br />
            Comenzaron ofreciendo masajes terapéuticos y meditación en un
            pequeño local. Gracias a su enfoque en la calidad y el cuidado
            personalizado, el spa creció y amplió sus servicios a tratamientos
            de belleza, terapias alternativas y un centro de fitness. <br />
            Hoy, más de una década después, sigue siendo un santuario de
            equilibrio y renovación, manteniendo la visión original de sus
            fundadores.
          </p>
          <img src={aboutImage1} alt="" />
        </div>
      </section>

      <section className="about-section-2">
        <h3>MISION Y VALORES</h3>
        <div className="about-section-2-container">
          <img src={aboutImage2} alt="" />

          <div className="about-section-2-content">
            <ul>
              <ol>
                <li>
                  <strong>Calidad y Excelencia:</strong> Nos dedicamos a ofrecer
                  servicios de la más alta calidad, con un enfoque en la
                  excelencia en cada detalle.
                </li>
                <li>
                  <strong>Cuidado Personalizado:</strong> Creemos en la
                  importancia de atender las necesidades únicas de cada cliente,
                  brindando tratamientos adaptados a sus preferencias y
                  objetivos de bienestar.
                </li>
                <li>
                  <strong>Integridad y Respeto:</strong> Operamos con los más
                  altos estándares de ética e integridad, respetando la
                  privacidad y la dignidad de cada persona que confía en
                  nosotros.
                </li>
                <li>
                  <strong>Innovación Continua:</strong> Nos mantenemos a la
                  vanguardia en técnicas y tratamientos de bienestar, buscando
                  siempre innovar para ofrecer lo mejor a nuestros clientes.
                </li>
                <li>
                  <strong>Compromiso con el Bienestar Integral:</strong>{" "}
                  Promovemos un enfoque holístico del bienestar que abarca el
                  cuerpo, la mente y el espíritu, fomentando un estilo de vida
                  equilibrado y saludable.
                </li>
              </ol>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-section-1">
        <h3>ACERCA DE NUESTROS PROFESIONALES</h3>
        <div>
          <p>
            El equipo de Sentirse Bien está formado por profesionales
            apasionados y expertos en bienestar y salud integral. <br />
            Con años de experiencia, se dedican a ofrecer un cuidado
            personalizado que va más allá de lo convencional, adaptándose a las
            necesidades de cada cliente. <br />
            Además de dominar técnicas avanzadas, crean un ambiente acogedor y
            relajante, enfocándose en la innovación y mejora continua para
            promover un equilibrio duradero entre cuerpo, mente y espíritu.
          </p>
          <img src={aboutImage3} alt="" />
        </div>
      </section>
    </div>
  );
}
