import {
  ChatBubbleOvalLeftEllipsisIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function SocialLogin() {
  return (
    <div className="w-full h-px bg-neutral-500">
      <div className="flex flex-col gap-3">
        <Link
          href="/github/start"
          className="primary-btn flex h-10 items-center justify-center gap-3"
        >
          <MagnifyingGlassIcon className="size-6" />
          <span>깃헙 로그인</span>
        </Link>
        <Link
          href="/sms"
          className="primary-btn flex h-10 items-center justify-center gap-3"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-6" />
          </span>
          <span>SMS 로그인</span>
        </Link>
      </div>
    </div>
  );
}
