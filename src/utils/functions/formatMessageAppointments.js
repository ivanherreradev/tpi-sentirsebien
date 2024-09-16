export const formatMessageAppointments = (message) => {
  const dateRegex = /\d{1,2} de [a-z]+ de \d{4} a las \d{1,2}:\d{2}/i;

  const messageWithStrongDate = message.replace(
    dateRegex,
    (date) => `<strong>${date}</strong>`
  );

  const formattedMessage = messageWithStrongDate.split(". ").join(".<br />");

  return { __html: formattedMessage };
};
