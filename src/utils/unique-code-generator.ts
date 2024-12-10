import moment from 'moment-timezone';

export const generateUniqueCodeWithDate = (): string => {
  const currentDate = moment.tz('Asia/Jakarta');
  return `${currentDate.date()}${currentDate.month() + 1}${currentDate.year()}${currentDate.hours()}${currentDate.minutes()}${currentDate.seconds()}`;
};

export const generateBookingCode = (): string => {
  const currentDate = moment.tz('Asia/Jakarta');
  return `${currentDate.date() < 10 ? `0${currentDate.date()}` : currentDate.date()}${currentDate.month() + 1}${currentDate.year()}${currentDate.hours()}${currentDate.minutes()}${currentDate.seconds()}${currentDate.millisecond().toString().charAt(0)}`;
};
