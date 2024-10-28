import React from 'react';
import toast from 'react-hot-toast';
import './CancelAppointmentModal.css';
import { API } from '../../utils/constants/api';

const CancelAppointmentModal = ({ show, onClose, appointmentDetails }) => {
  if (!show) return null;

  const handleConfirm = async () => {
    try {
      const response = await fetch(`${API}/api/Reservation/Delete/${appointmentDetails.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }
      toast.success('Turno cancelado con éxito.');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error('Error al cancelar el turno.');
    }

    onClose();
  };

  // Función para formatear la fecha y hora
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `Para el ${formattedDate} a las ${formattedTime}hs`;
  };

  return (
    <div className='cancel-modal-overlay'>
      <div className='modal-content'>
        <h3>¿Desea cancelar su turno?</h3>
        {appointmentDetails && (
          <>
            <h4>{appointmentDetails.serviceName}</h4>
            <p>{formatDateTime(appointmentDetails.dateTime)}</p>
          </>
        )}
        <div className='modal-buttons'>
          <button className='btn-confirm' onClick={handleConfirm}>
            Confirmar
          </button>
          <button className='btn-cancel' onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
