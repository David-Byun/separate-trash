'use client';

import { useFormState } from 'react-dom';
import Button from '../button';
import Input from '../input';
import { smsLogin } from './actions';

const initialState = {
  token: false,
  error: undefined,
};

/* 
null이 아닌 undefined 한 이유는 무엇일까 ? 
: null은 개발자가 명시적으로 "여기에 값이 없음을 설정한다"는 의미를 가지고 있지만, undefined는 "이 값은 아직 설정되지 않았다"는 의미를 가지고 있습니다. 
*/

/*
    인증번호를 입력하는 부분에서 다시 발송할 수 있는 기능 필요
*/

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">휴대폰 번호를 확인해주세요</h2>
      </div>
      <form className="flex flex-col gap-3" action={dispatch}>
        {state.token ? (
          <Input
            required
            type="number"
            placeholder="인증번호"
            name="token"
            min={100000}
            max={999999}
          />
        ) : (
          <Input required type="text" placeholder="휴대폰번호" name="phone" />
        )}
        <Button text={state.token ? '인증번호 확인' : '인증번호 보내기'} />
      </form>
    </div>
  );
}
