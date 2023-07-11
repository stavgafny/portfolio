'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import GithubActivityPanel from '@/components/about/github_activity_panel'

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
        </div>
        <div className='flex lg:px-10 max-lg:justify-center flex-wrap'>
          <GithubActivityPanel shown={transitionIn} />
        </div>
      </div>
    </main>
  )
}

