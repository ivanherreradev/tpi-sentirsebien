export const generateAvailableHours = (selectedDate) => {
  const availableHours = [];

  // Horas de 9 a 13
  for (let hour = 9; hour <= 13; hour++) {
    availableHours.push(`${hour}:00`);
  }

  // Horas de 16 a 20
  for (let hour = 16; hour <= 20; hour++) {
    availableHours.push(`${hour}:00`);
  }

  return availableHours;
};
