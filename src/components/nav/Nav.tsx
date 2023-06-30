import React from 'react'
import { GoHome, GoPerson } from 'react-icons/go'
import { BsCode } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'
import {NavItem} from './NavItem';
import { HamburgerMenu } from './HamburgerMenu';

export default function Nav () {
  return (
    <nav className='flex items-center justify-end flex-wrap p-3 shadow-md shadow-neutral-800'>
      <div className='md:hidden'>
        <HamburgerMenu />
      </div>
      <div className='w-full flex justify-center gap-x-16 max-md:hidden'>
        <NavItem
          href='/'
          title='Home'
          icon={<GoHome className='scale-150 text-pink-300' />}
        />
        <NavItem
          href='/'
          title='About'
          icon={<GoPerson className='scale-150 text-emerald-400' />}
        />
        <NavItem
          href='/'
          title='Projects'
          icon={<BsCode className='scale-150 text-yellow-500' />}
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
