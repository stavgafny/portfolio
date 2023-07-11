'use client'

import React, { useState } from 'react'
import { GoHome, GoPerson } from 'react-icons/go'
import { BsCode } from 'react-icons/bs'
import { LiaCubesSolid } from 'react-icons/lia'
import { LinkType, NavLink } from './NavLink'
import { HamburgerMenu } from './HamburgerMenu'

import './Nav.css'

export const navHeight = 'h-16 py-5'

export default function Nav () {
  const [opened, setOpened] = useState(false)

  const handleClick = () => setOpened(!opened)

  return (
    <>
      <nav className='fixed top-0 z-50 w-full flex items-center flex-wrap shadow-md'>
        <div className={`w-full ${navHeight} flex justify-end lg:hidden`}>
          <HamburgerMenu opened={opened} onTap={handleClick} />
        </div>
        <div
          className={`nav_content justify-around items-center ${
            opened ? 'nav_opened' : ''
          } w-full lg:hidden`}
        >
          <_NavItems onItemClick={() => setOpened(false)} />
        </div>
        <div
          className={`w-full ${navHeight} flex justify-center gap-x-16 max-lg:hidden`}
        >
          <_NavItems onItemClick={() => {}} />
        </div>
      </nav>
      <div
        className={
          'fixed w-screen h-screen lg:hidden transition-all ease-in duration-200 ' +
          (opened ? 'z-40 bg-black/70' : '')
        }
      />
    </>
  )
}

const _NavItems = ({ onItemClick }: { onItemClick: Function }) => {
  const commonProps = {
    onClick: onItemClick,
    linkType: LinkType.SCROLL
  }
  return (
    <>
      <NavLink
        href='#home'
        name='Home'
        hoverTitle="Houston, We're Landing"
        icon={<GoHome className='scale-150 text-red-300' />}
        {...commonProps}
      />
      <NavLink
        href='#about'
        name='About'
        hoverTitle='The Ego on Me'
        icon={<GoPerson className='scale-150 text-emerald-400' />}
        {...commonProps}
      />
      <NavLink
        href='#skills'
        name='Skills'
        hoverTitle='Skills Unleashed!'
        icon={<LiaCubesSolid className='scale-150 text-orange-300' />}
        {...commonProps}
      />
      <NavLink
        href='#projects'
        name='Projects'
        hoverTitle='Projects Galore!'
        icon={<BsCode className='scale-150 text-yellow-300' />}
        {...commonProps}
      />
    </>
  )
}
