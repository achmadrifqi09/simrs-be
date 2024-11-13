export const generateDateString = (dateParam?: Date) => {
  const date = dateParam ? new Date(dateParam) : new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const generateIsoDate = (dateParam?: Date) => {
  const date = dateParam ? new Date(dateParam) : new Date();
  return ((date.getDay() + 6) % 7) + 1;
};
