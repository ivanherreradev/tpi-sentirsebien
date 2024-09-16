import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import News from "./pages/News/News";
import Employment from "./pages/Employment/Employment";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import SelectAppointment from "./pages/SelectAppointment/SelectAppointment";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/empleo" element={<Employment />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route
            path="/panel-personal/:email"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/seleccionar-turno"
            element={<PrivateRoute element={<SelectAppointment />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
