'use client';

import { useFormState } from 'react-dom';
import Button from '../button';
import Input from '../input';
import SocialLogin from '../social-login';
import { createAccount } from './actions';
import { PASSWORD_MIN_LENGTH } from '../constants';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  console.log(state);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">고객님의 정보를 작성해주세요</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input required name="username" placeholder="이름" type="text" />
        <Input required name="email" placeholder="이메일" type="email" />
        <Input
          required
          name="password"
          placeholder="비밀번호"
          type="password"
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Input
          required
          name="confirm_password"
          placeholder="비밀번호 재확인"
          type="password"
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
