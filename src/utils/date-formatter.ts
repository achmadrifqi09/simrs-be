import moment from 'moment-timezone';

export const generateCurrentDate = (): Date => {
  const createdAt = moment.tz('Asia/Jakarta');
  const finalDate = `${createdAt.format('YYYY-MM-DDTHH:mm:ss')}Z`;
  return new Date(finalDate);
};

export const generateExpiresDate = () => {
  const now = moment.tz('Asia/Jakarta');
  const expiresDate = now
    .clone()
    .add(process.env.JWT_TOKEN_EXPIRED_TIME, 'hours');
  const finalDate = `${expiresDate.format('YYYY-MM-DDTHH:mm:ss')}Z`;
  return new Date(finalDate);
};

export const convertToTimeString = (date: Date): string => {
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const generateCurrentDateWithCustomHour = (customTime: string) => {
  const dateWithCustomTime = moment.tz('Asia/Jakarta').set({
    hour: parseInt(customTime.split(':')[0]),
    minute: parseInt(customTime.split(':')[1]),
    second: parseInt(customTime.split(':')[2]),
    millisecond: 0,
  });

  const isoString = dateWithCustomTime.toISOString();
  const localDate = new Date(isoString);

  localDate.setMinutes(localDate.getMinutes() + dateWithCustomTime.utcOffset());
  return localDate;
};

export const timeFormatter = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  const date = new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));
  return date.toISOString();
};
