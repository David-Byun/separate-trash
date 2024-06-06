'use client';

import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from '@heroicons/react/24/outline';
import { useOptimistic } from 'react';
import { dislikePost, likePost } from '../(tabs)/recycles/[id]/actions';

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  recycleId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  recycleId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (prevState) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );
  const onClick = async () => {
    //default state를 이미 알기 때문에 값 안넣어줘도 됨
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(recycleId);
    } else {
      await likePost(recycleId);
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full p-2 transition-colors ${
        state.isLiked
          ? 'bg-green-500 text-white border-green-500'
          : 'hover:bg-neutral-800'
      }`}
    >
      {state.isLiked ? (
        <HandThumbUpIcon className="size-5" />
      ) : (
        <OutlineHandThumbUpIcon className="size-5" />
      )}
      {state.isLiked ? (
        <span>{state.likeCount}</span>
      ) : (
        <span>공감하기 {state.likeCount}</span>
      )}
    </button>
  );
}
