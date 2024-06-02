'use client';

import Button from '@/app/button';
import Input from '@/app/input';
import { PhotoIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { useFormState } from 'react-dom';

// use client 사용하므로, react hook form으로 파라미터 넘겨줌

export default function AddRecycle() {
  const [preview, setPreview] = useState('');
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    //이미지 사이즈 체크
    //이미지 용량 체크
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const [state, dispatch] = useFormState(uploadRecycle, null);
  return (
    <div>
      <form className="flex flex-col gap-3" action={dispatch}>
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === '' ? (
            <div className="flex flex-col items-center gap-1">
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
              </div>
            </div>
          ) : null}
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
        />
        <Input required name="title" placeholder="제목" type="text" />
        <Input required name="description" placeholder="설명" type="text" />
        <Input required name="price" placeholder="가격" type="text" />
        <Button text="작성완료" />
      </form>
    </div>
  );
}
