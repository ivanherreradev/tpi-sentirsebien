import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../../components/Input/Input";
import {
  employeeRequestPost,
  openPositionsGet,
} from "../../utils/constants/api";
import "./Employment.css";

export default function Employment() {
  const initialFormState = {
    name: "",
    email: "",
    profession: "",
    cvFile: null,
  };

  const [fileName, setFileName] = useState("");
  const [employments, setEmployments] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    const fetchEmployments = async () => {
      try {
        const response = await axios.get(openPositionsGet);
        const data = response.data;

        const formattedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          requirements: item.requirements
            .split("\r\n")
            .map((req) => req.replace(/^- /, ""))
            .map((req, index) => ({
              id: index + 1,
              title: req,
            })),
          mailTo: item.emailAddress,
          tag: item.phrase,
        }));

        setEmployments(formattedData);
      } catch (error) {
        console.error("Error fetching employments:", error);
        toast.error("Error al cargar los empleos.");
      }
    };

    fetchEmployments();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFileName = `Archivo seleccionado: ${file.name}`;
      setFileName(newFileName);
      setFormData((prevData) => ({
        ...prevData,
        cvFile: file,
      }));
    } else {
      setFileName("No se ha seleccionado archivo");
      setFormData((prevData) => ({
        ...prevData,
        cvFile: null,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.profession) {
      toast.error("Por favor, rellene todos los campos obligatorios.");
      return;
    }

    const data = new FormData();
    data.append("FullName", formData.name);
    data.append("EmailAddress", formData.email);
    data.append("JobDescription", formData.profession);

    if (formData.cvFile) {
      data.append("cvFile", formData.cvFile);
    }

    try {
      const response = await axios.post(employeeRequestPost, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Solicitud enviada exitosamente.");

      setFormData(initialFormState);
      setFileName("");
    } catch (error) {
      console.error(
        "Error al enviar la solicitud:",
        error.response?.data || error.message
      );
      toast.error("Error al enviar la solicitud.");
    }
  };

  return (
    <section className="employment-container">
      <h2>Empleos disponibles</h2>
      {employments.length === 0 ? (
        <p>Cargando empleos...</p>
      ) : (
        employments.map((employment) => (
          <div key={employment.id} className="employment-item">
            <h4>{employment.title}</h4>
            <p>{employment.description}</p>

            <h5>Requisitos</h5>
            <ul>
              {employment.requirements.map((requirement) => (
                <li key={requirement.id}>
                  <p>{requirement.title}</p>
                </li>
              ))}
            </ul>

            <p>{employment.mailTo}</p>
            <p>{employment.tag}</p>
          </div>
        ))
      )}

      <h2>Envíanos tu CV</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="EMAIL DE CONTACTO"
          onChange={handleInputChange}
          value={formData.email}
        />
        <Input
          name="name"
          type="text"
          label="NOMBRE Y APELLIDO"
          onChange={handleInputChange}
          value={formData.name}
        />
        <Input
          name="profession"
          type="text"
          label="PROFESIÓN"
          onChange={handleInputChange}
          value={formData.profession}
        />

        <div className="file-upload-container">
          <label htmlFor="cv" className="custom-file-label">
            ADJUNTAR CV
          </label>
          <input
            type="file"
            id="cv"
            className="custom-file-input"
            onChange={handleFileChange}
          />
          {fileName && <p className="file-name">{fileName}</p>}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}
