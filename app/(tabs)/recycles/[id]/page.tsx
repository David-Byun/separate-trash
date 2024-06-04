import db from '@/app/db';
import { UserIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function RecyclesDetail({
  params,
}: {
  params: { id: string };
}) {
  await new Promise((r) => setTimeout(r, 10000000));
  console.log(params.id);
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const recycle = await db.recycle.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  if (!recycle) {
    return notFound();
  }
  console.log(recycle);
  return (
    <div className="p-3">
      <div className="relative aspect-square">
        <Image
          src={recycle.photo}
          fill
          alt="recycles"
          className="object-cover"
        />
      </div>
      <div className="flex items-center gap-3 p-3 border-b border-neutral-700">
        <div className="rounded-full overflow-hidden">
          {recycle.user.avatar !== null ? (
            <Image
              width={28}
              height={28}
              src={recycle.user.avatar}
              alt="image"
              className="size-7 rounded-full"
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{recycle!.title}</h3>
        </div>
      </div>
      <div className="p-3">
        <h1 className="text-2xl font-semibold">{recycle!.description}</h1>
        <p>위치등의 정보</p>
      </div>
      <div>지도영역</div>
      <div className="w-full p-5 bottom-0 fixed left-0 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">가격 : {recycle!.price}원</span>
        <button className="bg-green-500 px-5 py-2.5 font-semibold">
          채팅하기
        </button>
      </div>
    </div>
  );
}
