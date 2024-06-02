import { z } from 'zod';

const formSchema = z.object({
  photo: z.string({
    required_error: '이미지를 업로드해주세요',
  }),
  title: z.string({
    required_error: '제목을 입력해주세요',
  }),
  description: z.string({
    required_error: '내용을 입력해주세요',
  }),
  price: z.string({
    required_error: '가격을 입력해주세요',
  }),
});

export default function uploadRecycle(prevState: any, formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
  };
  const result = formSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
  }
}
