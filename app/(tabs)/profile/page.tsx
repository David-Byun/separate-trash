import { notFound, redirect } from 'next/navigation';

import { Suspense } from 'react';
import Image from 'next/image';
import getSession from '@/app/session';
import db from '@/app/db';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { UserIcon } from '@heroicons/react/16/solid';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  console.log(user);
  const logOut = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };
  return (
    <div className="p-3">
      <div className="relative aspect-square ">
        {user.avatar ? (
          <Image
            src={user.avatar}
            fill
            alt={user.username}
            className="object-cover rounded-full"
          />
        ) : (
          <UserIcon />
        )}
      </div>
      <div className="p-3">
        <h1 className="text-2xl font-semibold">{user.username}</h1>
        <p>{user.email}</p>
        <form action={logOut}>
          <button className="font-semibold text-xl">로그아웃</button>
        </form>
        <form>
          <button className="font-semibold text-xl">프로필 수정</button>
        </form>
      </div>
    </div>
  );
}
