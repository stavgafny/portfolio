'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import ProfileBlob from '@/components/about/profile_blob'
import ContentSection from '@/components/about/content_section'
import ContributionsChart from '@/components/about/contributions_chart'
import ContactFooter from '@/components/about/contact_footer'

export default function About () {
  const [showProfileBlob, setShowProfileBlob] = useState(false)

  useEffect(() => {
    setShowProfileBlob(true)
  }, [])

  return (
    <main>
      <div className='w-full h-full fixed bg-about_bg bg-cover opacity-5 z-[-1]'></div>
      <div className='min-h-screen'>
        <div className='flex p-12 gap-6 lg:gap-10 max-lg:items-center max-lg:flex-col'>
          <ProfileBlob shown={showProfileBlob} />
          <ContentSection />
        </div>
        <div className='flex lg:px-10 max-lg:justify-center'>
          <ContributionsChart />
        </div>
      </div>
      <ContactFooter />
    </main>
  )
}

