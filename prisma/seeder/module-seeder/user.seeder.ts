import { prismaClient } from '../prisma';
import bcrypt from 'bcrypt';
import * as process from 'node:process';

export const userSeeder = async () => {
  const password: string = await bcrypt.hash(
    process.env.USER_DEFAULT_PASSWORD || 'PASSWORD',
    12,
  );

  return prismaClient.user.create({
    data: {
      id_pegawai: 0,
      nama_user: 'Super Admin',
      email_user: 'superadmin@ummhospital.com',
      hp_user: '-',
      password_user: password,
      status: true,
    },
  });
};
