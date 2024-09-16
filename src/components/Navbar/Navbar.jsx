import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Sentirse Bien</a>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={`navbar-menu ${isOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="navbar-links">
          <li>
            <a href="/" onClick={handleLinkClick}>
              Inicio
            </a>
          </li>
          <li>
            <a href="/sobre-nosotros" onClick={handleLinkClick}>
              Sobre nosotros
            </a>
          </li>
          <li>
            <a href="/servicios" onClick={handleLinkClick}>
              Servicios
            </a>
          </li>
          <li>
            <a href="/noticias" onClick={handleLinkClick}>
              Noticias
            </a>
          </li>
          <li>
            <a href="/empleo" onClick={handleLinkClick}>
              Empleo
            </a>
          </li>
        </ul>
        <div className="navbar-buttons">
          {auth.token ? (
            <>
              <a
                className="btn btn-panel"
                href={`/panel-personal/${encodeURIComponent(auth.email)}`}
                onClick={handleLinkClick}
              >
                Panel Personal
              </a>
              <button
                className="btn btn-logout"
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <a
                className="btn btn-login"
                href="/iniciar-sesion"
                onClick={handleLinkClick}
              >
                Iniciar Sesión
              </a>
              <a
                className="btn btn-register"
                href="/registrarse"
                onClick={handleLinkClick}
              >
                Registrarse
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
