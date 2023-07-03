'use client'

import React from 'react'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import sketch from '@/components/home/circle_packing/sketch';

export default function Home () {
  return (
    <main>
      <section className='flex justify-center'>
        <NextReactP5Wrapper sketch={sketch} />
      </section>
    </main>
  )
}