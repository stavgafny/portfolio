import './globals.css'
import { Tilt_Neon } from 'next/font/google'

const defaultFont = Tilt_Neon({ subsets: ['latin'], weight: '400' })

export const metadata = {
  title: 'Stav Gafny',
  description: 'My portfolio'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={defaultFont.className}>{children}</body>
    </html>
  )
}
