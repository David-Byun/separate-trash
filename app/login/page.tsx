import Button from '../button';
import Input from '../input';
import SocialLogin from '../social-login';

export default function Login() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">아이디와 패스워드를 입력해주세요</h2>
      </div>
      <form className="flex flex-col gap-3">
        <Input type="email" placeholder="이메일" name="email" />
        <Input type="password" placeholder="패스워드" name="password" />
        <Button text="login" />
      </form>
      <SocialLogin />
    </div>
  );
}
