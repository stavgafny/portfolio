import React from 'react'
import { GoHome, GoPerson } from 'react-icons/go'
import { BsCode } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'
import { LiaCubesSolid } from 'react-icons/lia'
import {NavItem} from './NavItem';
import { HamburgerMenu } from './HamburgerMenu';

export default function Nav () {
  return (
    <nav className='flex items-center justify-end flex-wrap p-3 shadow-md'>
      <div className='lg:hidden'>
        <HamburgerMenu />
      </div>
      <div className='w-full flex justify-center gap-x-16 max-lg:hidden'>
        <NavItem
          href='/'
          title='Home'
          icon={<GoHome className='scale-150 text-red-300' />}
        />
        <NavItem
          href='/'
          title='About'
          icon={<GoPerson className='scale-150 text-emerald-400' />}
        />
        <NavItem
          href='/'
          title='Skills'
          icon={<LiaCubesSolid className='scale-150 text-orange-300' />}
        />
        <NavItem
          href='/'
          title='Projects'
          icon={<BsCode className='scale-150 text-yellow-300' />}
        />
        <NavItem
          href='/'
          title='Resume'
          icon={<HiOutlineDocumentText className='scale-150 text-blue-300' />}
        />
        <NavItem
          href='/'
          title='Github'
          icon={<FiGithub className='scale-150 text-purple-400' />}
        />
      </div>
    </nav>
  )
}
