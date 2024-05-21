import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto *:font-medium flex flex-col items-center gap-2">
        <span className="text-9xl">♻️</span>
        <h1 className="text-4xl">분리수거</h1>
        <h2 className="text-2xl">분리수거 대신 해줄게요</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link
          href="/create-account"
          className="primary-btn py-2.5 text-lg text-center"
        >
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline text-green-300">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
