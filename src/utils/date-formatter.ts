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
    .add(process.env.JWT_TOKEN_EXPIRED_TIME, 'minutes');
  const finalDate = `${expiresDate.format('YYYY-MM-DDTHH:mm:ss')}Z`;
  return new Date(finalDate);
};
