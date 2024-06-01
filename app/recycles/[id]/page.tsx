import Image from 'next/image';

export default function RecyclesDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-3">
      <div className="relative aspect-square">
        <Image
          src="https://m.segye.com/content/image/2023/06/19/20230619520118.jpg"
          fill
          alt="recycles"
          className="object-cover"
        />
      </div>
      <div className="flex items-center gap-3 p-3 border-b border-neutral-700">
        <div className="rounded-full overflow-hidden">
          <Image
            width={28}
            height={28}
            src="https://i.pinimg.com/236x/2f/55/97/2f559707c3b04a1964b37856f00ad608.jpg"
            alt="image"
            className="size-7 rounded-full"
          />
        </div>
        <div>
          <h3>이름</h3>
        </div>
      </div>
      <div className="p-3">
        <h1 className="text-2xl font-semibold">분리수거</h1>
        <p>위치등의 정보</p>
      </div>
      <div>지도영역</div>
      <div className="w-full p-5 bottom-0 fixed left-0 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">가격 : 7,000원</span>
        <button className="bg-green-500 px-5 py-2.5 font-semibold">
          채팅하기
        </button>
      </div>
    </div>
  );
}
