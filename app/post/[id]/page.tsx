import { EyeIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          src="https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
          alt="image"
          className="size-7 rounded-full"
        />
        <div>
          <span className="text-sm font-semibold">이름</span>
          <div className="text-xs">
            <span>2024.05.20</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">제목</h2>
      <p className="mb-5">설명</p>
      <div className="flex flex-col gap-6 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 0회</span>
        </div>
        <button>좋아요</button>
      </div>
    </div>
  );
}
