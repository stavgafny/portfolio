'use client'
import './globals.css'
import { useState, useEffect, ReactNode } from 'react'
import ProfileBlob from '@/components/about/profile_blob'
import { VscGithub } from 'react-icons/vsc'
import { AiFillLinkedin } from 'react-icons/ai'

export default function About () {
  const [showProfileBlob, setShowProfileBlob] = useState(false)

  useEffect(() => {
    setShowProfileBlob(true)
  }, [])

  return (
    <main>
      <div className='w-full h-full fixed bg-about_bg bg-cover opacity-5 z-[-1]'></div>
      <div className='h-screen flex p-8 gap-6 lg:gap-10 max-lg:items-center max-lg:flex-col'>
        <ProfileBlob shown={showProfileBlob} />
        <div className='about_content flex flex-col gap-2 text-1xl'>
          <h1 className='lg:pt-10 lg:text-5xl max-lg:text-4xl max-lg:text-center'>
            About Me
          </h1>

          <div>
            <span>My name is </span>
            <span className='text-red-300'>Stav Gafny </span>
            <span>and I am from Ramat Hasharon, Israel.</span>
          </div>

          <div>
            <span>I am a </span>
            <span className='text-red-300'>Full Stack </span>
            <span>
              developer with a strong passion for building modern websites and
              applications.
            </span>
          </div>

          <span>
            Programming is not just a profession for me; it&apos;s a way of
            expressing my creativity and problem-solving skills.
          </span>

          <span>
            When I&apos;m not programming, you&apos;ll find me playing the
            drums, watching Friends, and playing video games, chilling with some
            music.
          </span>

          <div className='text-sm text-gray-400 flex flex-col'>
            <p>
              Explore my portfolio and get in touch if you have any questions or
              if you&apos;d like to discuss potential collaborations.
            </p>
            <p>Let&apos;s create something amazing together!</p>
          </div>
        </div>
      </div>
      <footer className='py-8 flex flex-col gap-8'>
        <h1>Find me on</h1>
        <div className='flex justify-center gap-16 lg:gap-24'>
        <ContactLinks href='https://www.linkedin.com/in/stav-gafny/' icon={<AiFillLinkedin className='scale-[3]' />} />
        <ContactLinks href='https://github.com/stavgafny' icon={<VscGithub className='scale-[3]' />} />
        </div>
      </footer>
    </main>
  )
}

function ContactLinks({href, icon}: {href: string, icon: ReactNode}) {
  return (
    <a href={href}>{icon}</a>
  );
}