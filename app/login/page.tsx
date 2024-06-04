'use client';

import { useFormState } from 'react-dom';
import login from './action';
import Input from '../input';
import Button from '../button';
import SocialLogin from '../social-login';

export default function Login() {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">이메일과 패스워드를 입력하세요</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input required name="email" placeholder="이메일" type="email" />
        <Input
          required
          name="password"
          placeholder="패스워드"
          type="password"
        />
        <Button text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
