import styles from './About.module.css'
import AnimateOnScrollObserver from '../shared/AnimateOnScrollObserver'
import ContentSection from './ContentSection'
import GithubActivityPanel from './github_activity_panel/GithubActivityPanel'

export default function About () {
  return (
    <main className='w-screen min-h-screen flex flex-col max-lg:items-center'>
      <div className='px-14 py-12 flex gap-6 lg:gap-10 max-lg:items-center max-lg:flex-col'>
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

      <AnimateOnScrollObserver
        className={
          styles.github_activity_panel_wrapper +
          ' lg:px-14 max-lg:justify-center'
        }
        onScollViewdClassName={styles.on_scoll_fade_in}
      >
        <GithubActivityPanel />
      </AnimateOnScrollObserver>
    </main>
  )
}