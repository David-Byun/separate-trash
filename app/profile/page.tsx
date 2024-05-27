import { redirect } from 'next/navigation';
import getSession from '../session';
import db from '../db';

async function Username() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({});
  }
}

export default function Profile() {
  const logOut = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };
  return (
    <div>
      <form action={logOut}>
        <button>log out</button>
      </form>
    </div>
  );
}
