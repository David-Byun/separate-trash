'use client';

import {
  ChatBubbleLeftIcon,
  HomeIcon,
  NewspaperIcon,
  UserIcon,
  VideoCameraIcon,
} from '@heroicons/react/16/solid';
import { HomeModernIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="bottom-0 fixed grid grid-cols-5 w-full mx-auto max-w-screen-md border-neutral-600 border-t px-5 py-3 bg-neutral-800 *:text-white">
      <Link href="/post" className="flex flex-col items-center gap-px">
        {pathname === '/post' ? (
          <HomeIcon className="size-7" />
        ) : (
          <HomeModernIcon className="size-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/community" className="flex flex-col items-center gap-px">
        <NewspaperIcon className="size-7" />
        <span>동네생활</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center gap-px">
        <ChatBubbleLeftIcon className="size-7" />
        <span>채팅</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        <VideoCameraIcon className="size-7" />
        <span>쇼핑</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        <UserIcon className="size-7" />
        <span>프로필</span>
      </Link>
    </div>
  );
}
