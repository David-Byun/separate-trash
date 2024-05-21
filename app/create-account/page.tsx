import Button from '../button';
import Input from '../input';
import SocialLogin from '../social-login';

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">고객님의 정보를 작성해주세요</h2>
      </div>
      <form className="flex flex-col gap-3">
        <Input name="username" placeholder="이름" type="text" />
        <Input name="email" placeholder="이메일" type="email" />
        <Input name="password" placeholder="비밀번호" type="password" />
        <Input
          name="confirm_password"
          placeholder="비밀번호 재확인"
          type="password"
        />
      </form>
      <Button text="회원가입" />
      <SocialLogin />
    </div>
  );
}
