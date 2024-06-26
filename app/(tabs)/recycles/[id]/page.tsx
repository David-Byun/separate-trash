import LikeButton from '@/app/components/like-button';
import db from '@/app/db';
import getSession from '@/app/session';
import { UserIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

function getCachedLikeStatus(recycleId: number) {
  const cachedOperation = unstable_cache(
    getLikeStatus,
    ['recycle-like-status'],
    {
      tags: [`like-status-${recycleId}`],
    }
  );
}

const getCachedRecycle = unstable_cache(getRecycle, ['recycle-detail'], {
  tags: ['post-detail'],
  revalidate: 60,
});

async function getLikeStatus(recycleId: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        recycleId: recycleId,
        userId: session.id!,
      },
    },
  });

  const likeCount = await db.like.count({
    where: {
      recycleId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getRecycle(id: number) {
  /*
    db.recycle.update : database 안의 record를 수정하고 나서 수정된 record를 return 해줌
    한가지 주의해야 할 점 : update method는 업데이트할 post를 찾지 못하면 에러 발생시킴
    그래서 try catch 구문 사용
  */
  try {
    const recycle = await db.recycle.update({
      where: {
        id,
      },
      data: {
        // 현재 views 값을 모르더라도 더하기, 나누기, 빼기, 곱하기등을 할 수 있음
        views: {
          increment: 1,
        },
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
    return recycle;
  } catch (e) {}
}

export default async function RecyclesDetail({
  params,
}: {
  params: { id: string };
}) {
  //await new Promise((r) => setTimeout(r, 10000000));
  console.log(params.id);
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const recycle = await getCachedRecycle(id);
  if (!recycle) {
    return notFound();
  }
  console.log(recycle);
  const isOwner = await getIsOwner(recycle.userId);
  const { likeCount, isLiked } = await getLikeStatus(id);
  //server action 파일을 만들 때 마다 모든 server action을 별도의 파일에 옮겨 두는게 좋음
  const createChatRoom = async () => {
    'use server';
    const session = await getSession();
    const room = await db.chatRoom.create({
      data: {
        users: {
          //seller, buyer
          connect: [{ id: recycle.userId }, { id: session.id }],
        },
      },
      select: {
        id: true,
      },
    });
    redirect(`/chats/${room.id}`);
  };

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
              className="size-12 rounded-full"
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
      <div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} recycleId={id} />
        <span>조회 {recycle.views}</span>
      </div>
      <div className="w-full p-5 bottom-14 fixed left-0 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">가격 : {recycle!.price}원</span>
        <form action={createChatRoom}>
          <button className="bg-green-500 px-5 py-2.5 font-semibold">
            채팅하기
          </button>
        </form>
      </div>
    </div>
  );
}
