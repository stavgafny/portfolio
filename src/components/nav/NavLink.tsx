import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { ReactNode } from 'react'
import ScrollLink from '../shared/ScrollLink'

export enum LinkType {
  SCROLL,
  ROUTE,
  EXTERNAL
}

export interface NavLinkProps {
  href: Url
  name: string
  hoverTitle: string
  icon: ReactNode
  onClick: Function
  linkType: LinkType
}

export function NavLink ({
  href,
  name,
  hoverTitle,
  icon,
  onClick,
  linkType
}: NavLinkProps) {
  const commonProps = {
    title: hoverTitle,
    className: 'flex items-center gap-4 nav_item_hover'
  }
  const content = (
    <>
      {icon}
      <span className='text-lg' style={{ textShadow: '4px 4px 4px #000' }}>
        {name}
      </span>
    </>
  )

  switch (linkType) {
    case LinkType.SCROLL:
      return (
        <ScrollLink href={href} onClick={() => onClick()} {...commonProps}>
          {content}
        </ScrollLink>
      )

    case LinkType.ROUTE:
      return (
        <Link href={href} onClick={() => onClick()} {...commonProps}>
          {content}
        </Link>
      )

    case LinkType.EXTERNAL:
      return (
        <a href={href.toString()} onClick={() => onClick()} {...commonProps}>
          {content}
        </a>
      )
  }
}
