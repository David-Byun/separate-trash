'use server';

import { z } from 'zod';
import db from '../db';
import { PASSWORD_MIN_LENGTH } from '../constants';
import bcrypt from 'bcrypt';
import getSession from '../session';
import { redirect } from 'next/navigation';

const checkUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: '이름은 문자로 입력해주세요',
      required_error: '이름을 입력해주세요',
    })
    .toLowerCase()
    .trim()
    .refine(checkUsername, '사용하고 있는 이름입니다.'),
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmail, '사용하고 있는 이메일입니다'),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  const result = await formSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect('/profile');
  }
}
