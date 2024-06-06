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

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
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
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '해당 이름은 이미 사용하고 있습니다',
        path: ['username'],
        fatal: true,
      });
      // fatal issue 를 만들고 never를 return 하면 다른 refine이 있어도 실행되지 않음(superRefine을 제일 위로 배치)
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 사용중인 이메일입니다',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  // 사용자 경험을 개선하고 오류의 원인을 더 쉽게 파악하기 위해 'path'를 사용하는 것이 좋다
  .refine(checkPasswords, {
    message: '패스워드가 일치해야 합니다',
    path: ['confirm_password'],
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
