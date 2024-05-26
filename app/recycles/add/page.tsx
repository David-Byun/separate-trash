import Button from '@/app/button';
import Input from '@/app/input';

export default function AddRecycles() {
  return (
    <div>
      <form>
        <Input required placeholder="제목" type="text" />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
