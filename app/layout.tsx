import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | 분리수거마켓',
    default: '분리수거마켓',
  },
  description: '나의 시간을 아껴주는 분리수거마켓',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-neutral-900 text-white max-w-screen-sm m-auto`}>
        {children}
      </body>
    </html>
  );
}
