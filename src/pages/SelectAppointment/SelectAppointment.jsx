import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { API, reservationPost } from '../../utils/constants/api';
import { generateAvailableHours } from '../../utils/functions/generateAvailableHours';
import './SelectAppointment.css';

const SelectAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service } = location.state || {};
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    const dayOfWeek = date.getUTCDay();

    if (dayOfWeek === 0) {
      setError('Los domingos no están disponibles para citas.');
      setSelectedDate('');
      setAvailableHours([]);
      setSelectedHour('');
      return;
    }

    setError('');
    setSelectedDate(event.target.value);
    setAvailableHours(generateAvailableHours(date));
    setSelectedHour('');
  };

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const combineDateTime = (date, time) => {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    const localDateTime = new Date(year, month - 1, day, hours, minutes);
    const offsetMinutes = localDateTime.getTimezoneOffset();
    const utcDateTime = new Date(
      localDateTime.getTime() - offsetMinutes * 60 * 1000
    );
    return utcDateTime.toISOString();
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedHour || !selectedDetail) {
      toast.error('Por favor, complete todos los campos.');
      return;
    }

    const startDate = combineDateTime(selectedDate, selectedHour);
    const serviceDetailId = service.details.find(
      (detail) => detail.name === selectedDetail
    )?.id;

    if (!serviceDetailId) {
      toast.error('Servicio no encontrado.');
      return;
    }

    const requestBody = {
      startDate,
      userEmail: name,
      serviceDetailId,
      serviceId: service.id,
    };

    try {
      const response = await fetch(`${API}/api/Reservation/Post3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      toast.success('Turno confirmado exitosamente.');
      setSuccessMessage(true);
    } catch (error) {
      console.error('Error confirming appointment:', error);
      toast.error('Error al confirmar el turno.');
    }
  };

  useEffect(() => {
    setName(localStorage.getItem('email'));
  }, []);

  return (
    <div className='appointment-container'>
      <h2>
        Agendá tu turno para:{' '}
        {service ? service.name : 'Servicio no especificado'}
      </h2>

      {!successMessage ? (
        <>
          <div className='form-group'>
            <label htmlFor='serviceDetail'>Seleccionar servicio:</label>
            <select
              id='serviceDetail'
              value={selectedDetail}
              onChange={(e) => setSelectedDetail(e.target.value)}
            >
              <option value=''>Selecciona una opción</option>
              {service &&
                service.details.map((detail, index) => (
                  <option key={index} value={detail.name}>
                    {detail.name}
                  </option>
                ))}
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='date'>Seleccionar fecha:</label>
            <input
              type='date'
              id='date'
              value={selectedDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {error && (
            <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>
          )}

          <div className='form-group'>
            <label htmlFor='hours'>Seleccionar hora:</label>
            <select
              id='hours'
              value={selectedHour}
              onChange={handleHourChange}
              disabled={!availableHours.length}
            >
              <option value=''>Selecciona una hora</option>
              {availableHours.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleSubmit}>Confirmar turno</button>
        </>
      ) : (
        <div className='success-message'>
          <p>
            Turno agendado exitosamente. Diríjase a su panel personal para ver
            sus turnos.
          </p>
          <p>
            ¿Desea agendar otro turno? <Link to='/servicios'>Click aquí</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectAppointment;
