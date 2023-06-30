import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { ReactNode } from 'react'

interface NavItemProps {
  href: Url
  title: string
  icon: ReactNode
}

export function NavItem ({ href, title, icon }: NavItemProps) {
  return (
    <Link
      href={href}
      title={title}
      className='flex items-center gap-4 nav_item_hover'
    >
      {icon}
      <span className='text-lg' style={{textShadow: "4px 4px 4px #000"}}>{title}</span>
    </Link>
  )
}
