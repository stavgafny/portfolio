'use client'

import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'

type ScrollLinkProps = {
  children?: React.ReactNode
  href: Url
  onClick?: () => void
  title?: string
  className?: string
}

const ScrollLink = ({ children, ...props }: ScrollLinkProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    props.onClick && props.onClick()
    e.preventDefault()
    const targetId = e.currentTarget.href.replace(/.*\#/, '')
    const element = document.getElementById(targetId)

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <Link
      href={props.href}
      title={props.title}
      onClick={handleScroll}
      className={props.className}
    >
      {children}
    </Link>
  )
}
export default ScrollLink
