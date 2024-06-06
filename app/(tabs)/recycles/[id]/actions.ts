'use server';

import db from '@/app/db';
import getSession from '@/app/session';

export async function likePost(recycleId: number) {
  const session = await getSession();
  await db.like.create({
    data: {
      recycleId,
      userId: session.id!,
    },
  });
}

export async function dislikePost(recycleId: number) {
  const session = await getSession();
  await db.like.delete({
    where: {
      id: {
        recycleId,
        userId: session.id!,
      },
    },
  });
}
