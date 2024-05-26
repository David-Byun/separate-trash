'use server';

import { z } from 'zod';

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: '이름은 문자로 입력해주세요',
      required_error: '이름을 입력해주세요',
    })
    .toLowerCase()
    .trim(),
  email: z.string().email().toLowerCase(),
});

export default function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };
  return null;
}
