import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { ReactNode } from 'react'

interface NavItemProps {
  href: Url
  name: string,
  hoverTitle: string
  icon: ReactNode
  onClick: Function
  externalLink?: boolean
}

export function NavItem ({ href, name, hoverTitle, icon, onClick, externalLink=false }: NavItemProps) {
  const commonProps = {
    title: hoverTitle,
    className: 'flex items-center gap-4 nav_item_hover'
  };
  const content = (
    <>
    {icon}
      <span className='text-lg' style={{textShadow: "4px 4px 4px #000"}}>{name}</span>
    </>
  );

  return (
    <>
    {
      externalLink ?
      <a href={href.toString()} onClick={() => onClick()} {...commonProps}>{content}</a> :
      <Link href={href} onClick={() => onClick()} {...commonProps}>{content}</Link>
    }
    </>
  )
}
