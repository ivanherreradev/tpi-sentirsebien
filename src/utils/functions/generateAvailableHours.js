export const generateAvailableHours = (selectedDate) => {
  const hours = [];
  const dayOfWeek = selectedDate.getUTCDay();
  let startHour, endHour;

  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    startHour = 9;
    endHour = 20;
  } else if (dayOfWeek === 6) {
    startHour = 9;
    endHour = 13;
  } else {
    return [];
  }

  for (let hour = startHour; hour <= endHour; hour++) {
    hours.push(`${hour}:00`);
  }

  return hours;
};
