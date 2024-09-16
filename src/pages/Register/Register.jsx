import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input/Input";
import { registerPost } from "../../utils/constants/api";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    province: "",
    city: "",
    adress: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      name: formData.firstname,
      lastName: formData.lastname,
      emailAddress: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      address: formData.adress,
      city: formData.city,
      province: formData.province,
    };

    try {
      const response = await fetch(registerPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success("Registro exitoso");

        setTimeout(() => {
          navigate("/iniciar-sesion");
        }, 2000);
      } else {
        const errorData = await response.json();

        if (errorData.errors && errorData.errors.length > 0) {
          errorData.errors.forEach((error) => {
            toast.error(error);
          });
        } else {
          toast.error("El registro falló");
        }
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="INGRESE SU EMAIL"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="firstname"
          type="text"
          label="INGRESE SU NOMBRE"
          value={formData.firstname}
          onChange={handleChange}
        />
        <Input
          name="lastname"
          type="text"
          label="INGRESE SU APELLIDO"
          value={formData.lastname}
          onChange={handleChange}
        />
        <Input
          name="adress"
          type="text"
          label="INGRESE SU DIRECCIÓN"
          value={formData.adress}
          onChange={handleChange}
        />
        <Input
          name="province"
          type="text"
          label="PROVINCIA"
          value={formData.province}
          onChange={handleChange}
        />
        <Input
          name="city"
          type="text"
          label="CIUDAD"
          value={formData.city}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          label="INGRESE UNA CONTRASEÑA"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          name="confirmPassword"
          type="password"
          label="CONFIRME LA CONTRASEÑA"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div>
          <button type="submit">Registrarse</button>
          <a href="/">Volver al inicio</a>
        </div>
      </form>
    </div>
  );
}
