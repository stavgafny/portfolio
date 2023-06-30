import React, { ReactNode } from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { Url } from 'next/dist/shared/lib/router/router'
import { GoHome, GoPerson } from 'react-icons/go'
import { BsCode } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'

export default function Nav () {
  return (
    <nav className='flex items-center justify-items-end flex-wrap p-3'>
      <div className='w-full flex justify-center gap-x-16'>
          <NavItem href='/' title='Home' icon={<GoHome className='scale-150' />} />
          <NavItem href='/' title='About' icon={<GoPerson className='scale-150' />} />
          <NavItem href='/' title='Projects' icon={<BsCode className='scale-150' />} />
          <div className='flex gap-8'>
          <NavShortcut href='/' title='Resume' icon={<HiOutlineDocumentText className='scale-150' style={{color: "#8af"}} />} />
          <NavShortcut href='/' title='Github' icon={<FiGithub className='scale-150' style={{color: "#a7f"}} />} />
          </div>

          <div className='sm:hidden'>
            <button>ham</button>
          </div>
      </div>
    </nav>
  )
}

interface NavItemProps {
    href: Url
    title: string
    icon: ReactNode
}

  
function NavItem ({ href, title, icon }: NavItemProps) {
  return (
    <Link href={href} title={title} className='flex items-center gap-4'>
      {icon}
      <span className='text-xl'>{title}</span>
    </Link>
  )
}

function NavShortcut ({ href, title, icon }: NavItemProps) {
    return (
      <Link href={href} title={title} className='flex items-center gap-4'>
        {icon}
      </Link>
    )
  }