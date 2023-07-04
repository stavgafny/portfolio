'use client'

import React, {useState, useEffect} from 'react'
import { Shizuru } from 'next/font/google';
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import sketch from '@/components/home/circle_packing/sketch'

const titlesFont = Shizuru({ subsets: ['latin'], weight: "400" })

export default function Home () {
  
  const [shownTitles, setShownTitles] = useState(false);
  const [shownCodeBg, setShownCodeBg] = useState(false);

  useEffect(() => {
    setShownTitles(true);
    setShownCodeBg(true);
  }, []);
  
  return (
    <main className='w-full h-full fixed bg-home_bg bg-cover overflow-auto flex flex-col justify-start pt-24 gap-8 lg:gap-24'>
      <div className='h-[120px]'>
        <section className='flex justify-center max-lg:scale-[.4]'>
          <NextReactP5Wrapper sketch={sketch} />
        </section>
      </div>

      <div className={`home_titles flex flex-col gap-5 ${titlesFont.className}`}>
      <_Title text='SOFTWARE ENGINEER' hidden={shownTitles} />
      <_Title text='FRONT END DEVELOPER' hidden={shownTitles} />
      <_Title text='APP DEVELOPER' hidden={shownTitles} />
      </div>
    </main>
  )
}

function _Title({text, hidden}: {text: string, hidden: boolean}) {
  return (
    <h1 className={`hidden_title ${hidden && 'show_title'} flex justify-center text-2xl lg:text-4xl`}>{text}</h1>
  );
}
