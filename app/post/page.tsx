'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Posts({ params }: { params: { id: string } }) {
  return (
    <>
      <Link href={`/recycles/${params.id}`} className="flex gap-5 p-5">
        <div className="rounded-md relative overflow-hidden">
          <Image
            src="https://m.segye.com/content/image/2023/06/19/20230619520118.jpg"
            height={300}
            width={200}
            alt="recycles"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 *:text-white">
          <span className="text-lg">타이틀</span>
          <span className="text-lg font-semibold">1,000원</span>
          <span className="text-sm text-neutral-500">2024.05.20</span>
          <span className="text-sm font-semibold">서울시 용산구 도원동 </span>
        </div>
      </Link>

      <Link href={`/recycles/${params.id}`} className="flex gap-5 p-5">
        <div className="rounded-md relative overflow-hidden">
          <Image
            src="https://m.segye.com/content/image/2023/06/19/20230619520118.jpg"
            height={300}
            width={200}
            alt="recycles"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 *:text-white">
          <span className="text-lg">타이틀</span>
          <span className="text-lg font-semibold">1,000원</span>
          <span className="text-sm text-neutral-500">2024.05.20</span>
          <span className="text-sm font-semibold">서울시 용산구 도원동 </span>
        </div>
      </Link>
    </>
  );
}
