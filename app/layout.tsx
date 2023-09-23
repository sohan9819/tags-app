import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TagsContextProvider } from '@/context/TagsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tags App',
  description: 'A multi-column sortable list of tags using React',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TagsContextProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </TagsContextProvider>
  );
}
