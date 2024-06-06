'use client';

import { useEffect, useRef, useState } from 'react';
import { initialChatMessages } from '../chats/[id]/page';
import Image from 'next/image';
import { formatToTimeAgo } from '../utils';
import { ArrowUpCircleIcon } from '@heroicons/react/16/solid';
import { RealtimeChannel, createClient } from '@supabase/supabase-js';
import { saveMessage } from '../chats/actions';

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username: 'string',
          avatar: 'xx',
        },
      },
    ]);
    channel.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: {
        id: Date.now(),
        payload: message,
        userId,
        created_at: new Date(),
        user: {
          username,
          avatar,
        },
      },
    });
    saveMessage(message, chatRoomId);
    setMessage('');
  };
  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    //room에 들어감, channel - ref 활용
    channel.current = client.channel(`room-${chatRoomId}`);
    //broadcast는 다른 참가자로부터 실시간 chatroom에서 받는 글로벌 evnet, 아래 함수는 subscribe
    channel.current
      .on('broadcast', { event: 'message' }, (payload) => {
        console.log(payload);
        setMessages((prevMsgs) => [...prevMsgs, payload.payload]);
      })
      .subscribe();
    return () => {
      //user가 채팅방을 나가면 user의 subscribe를 유지
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);
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
            <span>{formatToTimeAgo(message.created_at.toString())} </span>
          </div>
        </div>
      ))}
      <form className="relative flex" onSubmit={onSubmit}>
        <input
          required
          value={message}
          onChange={onChange}
          className="px-5 w-full h-10 ring-2 ring-neutral-200 bg-transparent placeholder:text-neutral-400 transition focus:ring-4 focus:outline-none focus:ring-neutral-50 rounded-full"
          type="text"
          name="message"
          placeholder="메시지를 작성해주세요"
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-green-500 transition-colors hover:text-green-300" />
        </button>
      </form>
    </div>
  );
}
