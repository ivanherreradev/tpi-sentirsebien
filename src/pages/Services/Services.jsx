import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceModal from './components/ServiceModal';
import { servicesDetailsGet, servicesGet } from '../../utils/constants/api';
import './Services.css';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const handleViewDetails = async (service) => {
    try {
      const response = await axios.get(`${servicesDetailsGet}${service.id}`);
      const detailedService = { ...service, details: response.data };
      setSelectedService(detailedService);
    } catch (error) {
      console.error('Error fetching service details:', error);
    }
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(servicesGet);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchServices();
  }, []);

  return (
    <section className='services-container'>
      {loading ? (
        <div className='loading'>
          <p>Cargando servicios...</p>
        </div>
      ) : services.length === 0 ? (
        <div className='no-services'>
          <p>No hay servicios disponibles</p>
          <p>¡Disculpe las molestias!</p>
        </div>
      ) : (
        services.map((service, index) => (
          <div key={service.id} className='service-item'>
            <div className='service-image'>
              <img
                src={`/assets/services-${index + 1}.jpg`}
                alt={service.name}
              />
            </div>
            <div className='service-content'>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <button onClick={() => handleViewDetails(service)}>
                Ver servicios
              </button>
            </div>
          </div>
        ))
      )}

      {selectedService && (
        <ServiceModal service={selectedService} onClose={closeModal} />
      )}
    </section>
  );
}
