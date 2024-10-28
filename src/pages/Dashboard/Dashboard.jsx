import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API, appointmentsGet, userGet } from '../../utils/constants/api';
import { formatMessageAppointments } from '../../utils/functions/formatMessageAppointments';
import toast from 'react-hot-toast';
import './Dashboard.css';
import PaymentModal from '../../components/PaymentModal/PaymentModal';
import CancelAppointmentModal from '../../components/CancelAppointmentModal/CancelAppointmentModal';

export default function Dashboard() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [turnos, setTurnos] = useState([]);
  const [filter, setFilter] = useState('Activo'); // Filter state with default to show active appointments
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelDetails, setCancelDetails] = useState(null);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const openPaymentModal = (reservationId) => {
    setSelectedReservationId(reservationId);
    setShowPaymentModal(true);
  };
  const closePaymentModal = () => setShowPaymentModal(false);

  const openCancelModal = (appointment) => {
    setCancelDetails({
      serviceName: appointment.serviceDetailName,
      dateTime: appointment.startDate,
      id: appointment.reservationId,
    });
    setShowCancelModal(true);
  };

  const closeCancelModal = () => setShowCancelModal(false);

  const fetchPersonalInfo = async (email) => {
    try {
      const response = await fetch(`${userGet}${email}`);
      if (!response.ok) {
        throw new Error('Error de red');
      }
      const data = await response.json();

      setPersonalInfo(data);
      setUser(data.name);
    } catch (error) {
      console.error('Error al obtener información personal:', error);
    }
  };

  const fetchTurnos = async (email) => {
    try {
      const response = await fetch(`${API}/api/Reservation/Get/${email}`);
      if (!response.ok) {
        throw new Error('Error de red');
      }
      const data = await response.json();

      const sortedTurnos = data.$values.sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });

      setTurnos(sortedTurnos);
    } catch (error) {
      console.error('Error al obtener turnos:', error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchPersonalInfo(email);
      fetchTurnos(email);
    }
  }, [email]);

  // Filtered turnos based on the selected filter
  const filteredTurnos = turnos.filter((turno) => {
    if (filter === 'Activo') {
      return !turno.paid && !turno.isDeleted;
    } else if (filter === 'Cancelado') {
      return turno.isDeleted;
    } else if (filter === 'Pagado') {
      return turno.paid;
    }
    return true;
  });

  return (
    <div className='dashboard-container'>
      {user ? (
        <>
          <h2>HOLA, {user}! 👋</h2>

          <h4>Datos personales</h4>
          <div className='personal-information'>
            {personalInfo ? (
              <>
                <p>
                  <strong>Nombre y apellido:</strong> {personalInfo.name}{' '}
                  {personalInfo.lastName}
                </p>
                <p>
                  <strong>Ubicación:</strong> {personalInfo.province},{' '}
                  {personalInfo.city}
                </p>
                <p>
                  <strong>Dirección:</strong> {personalInfo.address}
                </p>
                <p>
                  <strong>Correo electrónico:</strong>{' '}
                  {personalInfo.emailAddress}
                </p>
              </>
            ) : (
              <div className='loading-dashboard'>
                <p>Cargando panel personal...</p>
              </div>
            )}
          </div>

          <h4>Tus turnos:</h4>
          <div className='input-group'>
            <label>Estado del turno</label>
            <select
              name='filter'
              value={filter}
              onChange={(e) => setFilter(e.target.value)} // Update filter state on change
            >
              <option value='Activo'>Activo</option>
              <option value='Cancelado'>Cancelado</option>
              <option value='Pagado'>Pagado</option>
            </select>
          </div>

          <div className='turnos'>
            {filteredTurnos.length > 0 ? (
              filteredTurnos.map((turno, index) => (
                <div key={index} className='turno'>
                  <p>
                    <strong>
                      {turno.serviceDetailName}{' '}
                      {turno.isDeleted ? '- (CANCELADO)' : ''}{' '}
                      {turno.paid ? '- (PAGADO)' : ''}
                    </strong>
                  </p>
                  <p>Hola, {turno.name}!</p>
                  <p
                    dangerouslySetInnerHTML={formatMessageAppointments(
                      turno.messageBody
                    )}
                  ></p>
                  <p>¡Te esperamos!</p>
                  <p>
                    <strong>Saludos cordiales, Sentirse bien SPA!</strong>
                  </p>

                  {!turno.isDeleted && !turno.paid && (
                    <div style={{ margin: '10px 0' }}>
                      <button
                        className='turno-btn-danger'
                        style={{ margin: '5px' }}
                        onClick={() => openCancelModal(turno)}
                      >
                        Cancelar turno
                      </button>
                      <button
                        className='turno-btn-success'
                        style={{ margin: '5px' }}
                        onClick={() => openPaymentModal(turno.reservationId)}
                      >
                        Pagar servicio
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={{ marginLeft: 20, marginTop: 10, height: '100vh' }}>
                <p>Actualmente no posee ningún turno en esta categoría.</p>
                <p>
                  Si desea consultar nuestros servicios,{' '}
                  <Link to='/servicios'>click aquí</Link>
                </p>
                <p>
                  <strong>Saludos cordiales, Sentirse bien SPA!</strong>
                </p>
              </div>
            )}
          </div>

          <PaymentModal
            show={showPaymentModal}
            onClose={closePaymentModal}
            reservationId={selectedReservationId}
          />
          <CancelAppointmentModal
            show={showCancelModal}
            onClose={closeCancelModal}
            appointmentDetails={cancelDetails}
          />
        </>
      ) : (
        <div className='loading-dashboard'>
          <p>Cargando panel personal...</p>
        </div>
      )}
    </div>
  );
}
