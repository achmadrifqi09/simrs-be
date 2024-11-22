import moment from 'moment-timezone';

export const generateUniqueCodeWithDate = (): string => {
  const currentDate = moment.tz('Asia/Jakarta');
  return `${currentDate.date()}${currentDate.month() + 1}${currentDate.year()}${currentDate.hours()}${currentDate.minutes()}${currentDate.seconds()}`;
};
