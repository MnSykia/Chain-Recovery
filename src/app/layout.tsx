import '@/app/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChainRecovery - Lost & Found Dashboard',
  description: 'Decentralized lost and found system built on blockchain.',
  icons: {
    icon: '/favicon.ico',
  },
};

import { Web3Provider } from '@/context/Web3Context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-on-background min-h-screen font-body-md">
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
