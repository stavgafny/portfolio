import './globals.css';
import { Tilt_Neon } from 'next/font/google';
import Nav from '@/components/nav/Nav';

const defaultFont = Tilt_Neon({ subsets: ['latin'], weight: "400" })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={defaultFont.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
