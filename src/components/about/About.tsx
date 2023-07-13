import styles from './About.module.css'
import AnimateOnScrollObserver from '../shared/AnimateOnScrollObserver'
import ContentSection from './ContentSection'
import GithubActivityPanel from './github_activity_panel/GithubActivityPanel'

export default function About () {
  return (
    <main className='w-screen min-h-screen flex flex-col max-lg:items-center'>
      <div className='px-20 py-20 flex gap-6 lg:gap-14 max-lg:items-center max-lg:flex-col'>
        <AnimateOnScrollObserver
          onScollViewdClassName={styles.on_scoll_fade_in}
          className={styles.profile_blob + ' bg-about_profile_blob bg-cover'}
        />
        <AnimateOnScrollObserver
          onScollViewdClassName={styles.on_scoll_fade_in}
          className={styles.about_content}
        >
          <ContentSection />
        </AnimateOnScrollObserver>
      </div>
      <div className='h-[8vh]'></div>

      <AnimateOnScrollObserver
        onScollViewdClassName={styles.on_scoll_fade_in}
        className={
          styles.github_activity_panel_wrapper +
          ' lg:px-20 max-lg:justify-center'
        }
      >
        <GithubActivityPanel />
      </AnimateOnScrollObserver>
    </main>
  )
}
