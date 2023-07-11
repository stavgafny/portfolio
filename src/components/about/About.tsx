import styles from './About.module.css'
import AnimateOnScrollObserver from '../shared/AnimateOnScrollObserver'
import { navHeight } from '@/components/nav/Nav'
import ContentSection from './ContentSection'

export default function About () {
  return (
    <main
      id='about'
      className='w-screen min-h-screen flex flex-col max-lg:items-center'
    >
      <div className={navHeight}></div>
      <div className='px-20 py-12 flex gap-6 lg:gap-10 max-lg:items-center max-lg:flex-col'>
        <AnimateOnScrollObserver
          className={styles.profile_blob + ' bg-about_profile_blob bg-cover'}
          onScollViewdClassName={styles.on_scoll_fade_in}
        />
        <AnimateOnScrollObserver
          className={styles.about_content}
          onScollViewdClassName={styles.on_scoll_fade_in}
        >
          <ContentSection />
        </AnimateOnScrollObserver>
      </div>
    </main>
  )
}
