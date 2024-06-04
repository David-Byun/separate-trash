'use server';

import { z } from 'zod';
import validator from 'validator';
import db from '../db';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

interface ActionState {
  token: boolean;
}

const tokenSchema = z.coerce.number().min(100000).max(999999);

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, 'ko-KR'),
    '잘못된 휴대폰 번호 형식입니다'
  );

async function createToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return createToken();
  } else {
    return token;
  }
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');
  //token이 false(default 값)이면, 전화번호를 받아야 한다.
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      console.log(result.error.flatten());
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      // [phone 번호가 잘 맞았을 때]유저마다 새로운 토큰을 가져야 하므로 이전 토큰 삭제하기
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data,
          },
        },
      });
      //새로운 토큰 생성하기
      //twilio 사용해서 토큰 보내기
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect('/');
    }
  }
}
