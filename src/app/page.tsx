'use client'

import React from 'react'
import Image from 'next/image'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import sketch from '@/components/home/circle_packing/sketch'

export default function Home () {
  return (
    <main className='w-full h-full fixed bg-home bg-cover'>
      <div className='h-[120px] my-10'>
        <section className='flex justify-center lg:hidden scale-[.4]'>
          <NextReactP5Wrapper sketch={sketch} />
        </section>
        <section className='flex justify-center max-lg:hidden'>
          <NextReactP5Wrapper sketch={sketch} />
        </section>
      </div>

      <div className='flex justify-center opacity-50'>
        <Image
          src='/data/home/code_background.png'
          width={500}
          height={500}
          alt='dummy code'
        />
      </div>
    </main>
  )
}
