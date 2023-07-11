import styles from './Home.module.css'
import Link from 'next/link'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { FiGithub } from 'react-icons/fi'
import ScrollLink from '../shared/ScrollLink'

export default function Home () {
  return (
    <main className='w-screen min-h-screen flex flex-col justify-center items-center pb-40'>
      <div className='flex flex-col'>
        <div
          className={
            'lg:text-[130px] md:text-[80px] max-md:text-[50px] ' +
            styles.home_titles
          }
        >
          <div className={styles.title_wrapper}>
            <h1>Hello.</h1>
          </div>
          <div className={styles.title_wrapper}>
            <h1>I'm</h1>
            <h1 className={styles.name}>Stav Gafny</h1>
          </div>
        </div>
        <div className='flex lg:justify-end max-lg:justify-center py-8 px-6 gap-x-6'>
          <div className={styles.github_link}>
            <a
              href='https://github.com/stavgafny'
              title='Explore my repositories'
              target='_blank'
              className='flex w-full h-full justify-center items-center'
            >
              <FiGithub className='scale-150' />
            </a>
          </div>
          <div className='overflow-hidden'>
            <Link
              href='/resume'
              title='My journey so far'
              className={styles.resume_link + ' flex items-center gap-x-2'}
            >
              <HiOutlineDocumentText className='scale-150' />
              <span className='text-xl'>Resume</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.scroller} title='Down we go'>
        <ScrollLink href='#about'>
          <span></span>
        </ScrollLink>
      </div>
    </main>
  )
}
