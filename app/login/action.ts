'use server';

import { z } from 'zod';
import db from '../db';
import bcrypt from 'bcrypt';
import getSession from '../session';
import { redirect } from 'next/navigation';

const checkEmailExists = (email: string) => {
  const user = db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, '등록되지 않은 이메일입니다'),
  password: z.string({
    required_error: '패스워드를 꼭 입력해주세요',
  }),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? '');
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['Wrong Password'],
          email: [],
        },
      };
    }
  }
}
