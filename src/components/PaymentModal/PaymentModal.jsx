import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './PaymentModal.css';
import { API } from '../../utils/constants/api';

export default function PaymentModal({ show, onClose, reservationId }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isCredit, setIsCredit] = useState(true);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (cardNumber.length < 13 || cardNumber.length > 19) {
      newErrors.cardNumber =
        'El número de tarjeta debe tener entre 13 y 19 dígitos.';
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'El CVV debe tener 3 dígitos.';
    }

    const expiryParts = expiryDate.split('/');
    const [month, year] = expiryParts.map((part) => parseInt(part, 10));
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (
      expiryParts.length !== 2 ||
      month < 1 ||
      month > 12 ||
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      newErrors.expiryDate =
        'La fecha de expiración es inválida o la tarjeta ha expirado.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatExpiryDate = (date) => {
    if (!date.includes('/')) {
      return date.slice(0, 2) + '/' + date.slice(2);
    }
    return date;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedExpiryDate = formatExpiryDate(expiryDate);
    setExpiryDate(formattedExpiryDate);

    if (validateFields()) {
      const paymentData = {
        paymentMethod: isCredit ? 'Crédito' : 'Débito',
        cardNumber,
        cardOwnerName: cardholderName,
        cvv,
        cardExpirationDate: formattedExpiryDate,
        reservationId,
      };

      try {
        const response = await fetch(`${API}/api/Invoices/Post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        if (!response.ok) {
          throw new Error('Error en el pago');
        }

        toast.success('¡Pago enviado con éxito!');
        onClose();
      } catch (error) {
        console.error('Error en el pago:', error);
        toast.error('Hubo un error al procesar el pago.');
      }
    }
  };

  if (!show) return null;

  return (
    <div className='payment-modal-overlay'>
      <div className='payment-modal'>
        <h2>Ingresar detalles de pago</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Número de Tarjeta</label>
            <input
              type='text'
              maxLength='19'
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/, ''))}
              placeholder='1234 5678 9123 4567'
            />
            {errors.cardNumber && (
              <p className='error-text'>{errors.cardNumber}</p>
            )}
          </div>
          <div className='form-group'>
            <label>Nombre del Titular</label>
            <input
              type='text'
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder='Juan Pérez'
            />
          </div>
          <div className='form-group-inline'>
            <div className='form-group'>
              <label>Fecha de Expiración (MM/AA)</label>
              <input
                type='text'
                maxLength='5'
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(e.target.value.replace(/[^0-9/]/g, ''))
                }
                placeholder='MM/AA'
              />
              {errors.expiryDate && (
                <p className='error-text'>{errors.expiryDate}</p>
              )}
            </div>
            <div className='form-group'>
              <label>CVV</label>
              <input
                type='text'
                maxLength='3'
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/, ''))}
                placeholder='123'
              />
              {errors.cvv && <p className='error-text'>{errors.cvv}</p>}
            </div>
          </div>
          <div className='form-group'>
            <label>Tipo de Pago</label>
            <div>
              <label>
                <input
                  type='radio'
                  checked={isCredit}
                  onChange={() => setIsCredit(true)}
                />{' '}
                Crédito
              </label>
              <label>
                <input
                  type='radio'
                  checked={!isCredit}
                  onChange={() => setIsCredit(false)}
                />{' '}
                Débito
              </label>
            </div>
          </div>
          <button type='submit' className='payment-btn'>
            Enviar Pago
          </button>
          <button type='button' className='close-btn' onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
