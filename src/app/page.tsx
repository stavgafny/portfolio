'use client'

import React from 'react'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import sketch from '@/components/home/circle_packing/sketch';

export default function Home () {
  return (
    <main>
      <div className='pb-16'></div>
      <section className='flex justify-center lg:hidden scale-[.4]'>
        <NextReactP5Wrapper sketch={sketch} />
      </section>
      <section className='flex justify-center max-lg:hidden'>
        <NextReactP5Wrapper sketch={sketch} />
      </section>
    </main>
  )
}