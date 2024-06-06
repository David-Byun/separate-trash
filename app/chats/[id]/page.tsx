import ChatMessagesList from '@/app/components/chat-messages-list';
import db from '@/app/db';
import getSession from '@/app/session';
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation';

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: { id: true },
      },
    },
  });
  console.log(room);
  if (room) {
    const session = await getSession();
    const canSee = Boolean(room.users.find((user) => user.id === session.id));
    if (!canSee) {
      return null;
    }
  }
  return room;
}

async function getUserProfile() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
}

async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

//type을 보내기 위한 작업 : chat-messages-list 에서 import 할 수 있음
export type initialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function ChatRoom({ params }: { params: { id: string } }) {
  console.log(params.id);
  //id가 String 이기 때문에 number로 바꿔줄 필요 없음
  const room = await getRoom(params.id);
  if (!room) {
    return notFound();
  }
  const initialMessages = await getMessages(params.id);
  const session = await getSession();
  const user = await getUserProfile();
  if (!user) {
    return notFound();
  }
  console.log(initialMessages);
  //바로 아래 렌더링 하지 않은 이유는 채팅 메세지가 상호작용되지 않게 하고 새로고침해주고 싶기 때문임
  return (
    <ChatMessagesList
      chatRoomId={params.id}
      userId={session.id!}
      username={user.username}
      avatar={user.avatar!}
      initialMessages={initialMessages}
    />
  );
}
