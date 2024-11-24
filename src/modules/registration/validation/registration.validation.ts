import z from 'zod';

export const registrationValidation = z.object({
  nomor_registrasi: z
    .string()
    .max(50, { message: 'Nomor registrasi maksimak 50 karakter' }),
});
