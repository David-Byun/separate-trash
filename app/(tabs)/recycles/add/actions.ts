'use server';

import db from '@/app/db';
import getSession from '@/app/session';
import { File } from 'buffer';
import { redirect, useRouter } from 'next/navigation';
import { z } from 'zod';
import fs from 'fs/promises';

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

export async function uploadRecycle(prevState: any, formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
  };
  console.log(data);

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = formSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const recycle = await db.recycle.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          price: Number(result.data.price),
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/recycles/${recycle.id}`);
    }
  }
}
