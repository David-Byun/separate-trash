import Button from '@/app/button';
import Input from '@/app/input';

export default function AddPost() {
  return (
    <div>
      <form>
        <Input required placeholder="제목" type="text" name="title" />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}
