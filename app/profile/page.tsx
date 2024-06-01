import { notFound, redirect } from 'next/navigation';
import getSession from '../session';
import db from '../db';
import { Suspense } from 'react';
import Image from 'next/image';

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

async function Username() {
  const user = await getUser();
  return <h1>환영해요! {user.username} !</h1>;
}

export default function Profile() {
  const logOut = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };
  return (
    <div className="p-3">
      <div className="relative aspect-square ">
        <Image
          src="https://m.segye.com/content/image/2023/06/19/20230619520118.jpg"
          fill
          alt="recycles"
          className="object-cover rounded-full"
        />
      </div>
      <div className="p-3">
        <h1 className="text-2xl font-semibold">분리수거</h1>
        <p>위치등의 정보</p>
      </div>
      <div>지도영역</div>
      <div className="w-full p-5 bottom-0 fixed left-0 pb-10 bg-neutral-800 flex justify-between items-center">
        <span>가격 : 7,000원</span>
        <form action={logOut}>
          <button className="font-semibold text-xl">로그아웃</button>
        </form>
      </div>
    </div>
  );
}
