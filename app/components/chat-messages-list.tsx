'use client';

import { useRef, useState } from 'react';
import { initialChatMessages } from '../chats/[id]/page';
import Image from 'next/image';
import { formatToTimeAgo } from '../utils';
import { ArrowUpCircleIcon } from '@heroicons/react/16/solid';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';

// https://supabase.com/docs/guides/realtime
const SUPABASE_PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eXBwdWt2bWpzaWNsanR6d3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3MzE5ODAsImV4cCI6MjAzMTMwNzk4MH0.zkz9Dlkm8Ojf3VGDBdRjmt5g9S2zlwg_KRkXE2N0CoE';
const SUPABASE_URL = 'https://rxyppukvmjsicljtzwtf.supabase.co';

interface ChatMessagesListProps {
  initialMessages: initialChatMessages;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string;
}

const onChange = () => {};

export default function ChatMessagesList({
  initialMessages,
  userId,
  chatRoomId,
  username,
  avatar,
}: ChatMessagesListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');
  const channel = useRef<RealtimeChannel>();

  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start ${
            message.userId === userId ? 'justify-end' : ''
          }`}
        >
          {message.userId === userId ? null : (
            <Image
              src={message.user.avatar!}
              alt={message.user.username}
              width={50}
              height={50}
              className="size-12 rounded-full mr-3"
            />
          )}
          <div className="flex flex-col gap-1">
            <span
              className={`${
                message.userId === userId ? 'bg-neutral-500' : 'bg-green-500'
              } p-2.5 rounded-md`}
            >
              {message.payload}
            </span>
            <span>{formatToTimeAgo(message.created_at.toString())}</span>
          </div>
        </div>
      ))}
      <form className="relative flex" onSubmit={onSubmit}>
        <input
          onChange={onChange}
          className="px-5 w-full h-10 ring-2 ring-neutral-200 bg-transparent placeholder:text-neutral-400 transition focus:ring-4 focus:outline-none focus:ring-neutral-50 rounded-full"
          value="채팅"
          type="text"
          name="message"
          placeholder="내용"
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-green-500 transition-colors hover:text-green-300" />
        </button>
      </form>
    </div>
  );
}
