import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { ReactNode } from 'react'

interface NavItemProps {
  href: Url
  name: string,
  hoverTitle: string
  icon: ReactNode
}

export function NavItem ({ href, name, hoverTitle, icon }: NavItemProps) {
  return (
    <Link
      href={href}
      title={hoverTitle}
      className='flex items-center gap-4 nav_item_hover'
    >
      {icon}
      <span className='text-lg' style={{textShadow: "4px 4px 4px #000"}}>{name}</span>
    </Link>
  )
}
