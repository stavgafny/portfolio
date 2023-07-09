'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import ProfileBlob from '@/components/about/profile_blob'
import ContentSection from '@/components/about/content_section'
import GithubActivityPanel from '@/components/about/github_activity_panel'
import ContactFooter from '@/components/about/contact_footer'

export default function About () {
  const [transitionIn, setTransitionIn] = useState(false);

  useEffect(() => {
    setTransitionIn(true)
  }, [])

  return (
    <main>
      <div className='w-full h-full fixed bg-about_bg bg-cover opacity-5 z-[-1]'></div>
      <div className='min-h-screen overflow-hidden'>
        <div className='flex px-16 py-12 gap-6 lg:gap-10 max-lg:items-center max-lg:flex-col'>
          <ProfileBlob shown={transitionIn} />
          <ContentSection shown={transitionIn} />
        </div>
        <div className='flex lg:px-10 max-lg:justify-center flex-wrap'>
          <GithubActivityPanel shown={transitionIn} />
        </div>
      </div>
      <ContactFooter />
    </main>
  )
}

