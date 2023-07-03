'use client'

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import sketch from '@/components/home/circle_packing/sketch'

export default function Home () {
  
  const [shownTitles, setShownTitles] = useState(false)
  const [shownCodeBg, setShownCodeBg] = useState(false)

  useEffect(() => {
    setShownTitles(true);
    setShownCodeBg(true);
  }, []);
  
  return (
    <main className='w-full h-full fixed bg-home bg-cover overflow-auto'>
      <div className='h-[120px] mt-10 lg:mb-10'>
        <section className='flex justify-center lg:hidden scale-[.4]'>
          <NextReactP5Wrapper sketch={sketch} />
        </section>
        <section className='flex justify-center max-lg:hidden'>
          <NextReactP5Wrapper sketch={sketch} />
        </section>
      </div>

      <div className='home_titles flex flex-col gap-4'>
      <_Title text='SOFTWARE ENGINEER' hidden={shownTitles} />
      <_Title text='FRONT END DEVELOPER' hidden={shownTitles} />
      <_Title text='APP DEVELOPER' hidden={shownTitles} />
      </div>


      <div className={`flex justify-center hidden_code_bg ${shownCodeBg && 'show_code_bg'}`}>
        <Image
          src='/assets/home/code_background.png'
          width={650}
          height={500}
          alt='dummy code'
        />
      </div>
    </main>
  )
}

function _Title({text, hidden}: {text: string, hidden: boolean}) {
  return (
    <h1 className={`hidden_title ${hidden && 'show_title'} flex justify-center text-sm lg:text-2xl`}>{text}</h1>
  );
}
