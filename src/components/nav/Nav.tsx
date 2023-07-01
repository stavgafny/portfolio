'use client'

import React, { useState } from 'react'
import { GoHome, GoPerson } from 'react-icons/go'
import { BsCode } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'
import { LiaCubesSolid } from 'react-icons/lia'
import { NavItem } from './NavItem'
import { HamburgerMenu } from './HamburgerMenu'

export default function Nav () {
  const [opened, setOpened] = useState(false)

  const handleClick = () => setOpened(!opened)

  return (
    <nav className='flex w-full items-center flex-wrap p-3 shadow-md'>
      <div className='w-full flex justify-end lg:hidden'>
        <HamburgerMenu opened={opened} onTap={handleClick} />
      </div>
      <div
        className={`nav_content justify-around items-center ${
          opened ? 'nav_opened' : ''
        } w-full lg:hidden`}
      >
        <_NavItems />
      </div>
      <div className='w-full flex justify-center gap-x-16 max-lg:hidden'>
        <_NavItems />
      </div>
    </nav>
  )
}

const _NavItems = () => {
  return (
    <>
      <NavItem
        href='/'
        name='Home'
        hoverTitle="Houston, We're Landing"
        icon={<GoHome className='scale-150 text-red-300' />}
      />
      <NavItem
        href='/'
        name='About'
        hoverTitle='The Ego on Me'
        icon={<GoPerson className='scale-150 text-emerald-400' />}
      />
      <NavItem
        href='/'
        name='Skills'
        hoverTitle='Skills Unleashed!'
        icon={<LiaCubesSolid className='scale-150 text-orange-300' />}
      />
      <NavItem
        href='/'
        name='Projects'
        hoverTitle='Projects Galore!'
        icon={<BsCode className='scale-150 text-yellow-300' />}
      />
      <NavItem
        href='/'
        name='Resume'
        hoverTitle='The Journey So Far'
        icon={<HiOutlineDocumentText className='scale-150 text-blue-300' />}
      />
      <NavItem
        href='/'
        name='Github'
        hoverTitle='Explore my repositories'
        icon={<FiGithub className='scale-150 text-purple-400' />}
      />
    </>
  )
}
