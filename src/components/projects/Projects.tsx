import styles from './Projects.module.css'
import AnimateOnScrollObserver from '../shared/AnimateOnScrollObserver'
import ProjectsList from './projects_list/ProjectsList'

export default function About () {
  return (
    <main className='w-screen min-h-screen flex flex-col max-lg:items-center'>
      <div className='flex flex-col justify-center items-center'>
        <div className={styles.title}>
          <AnimateOnScrollObserver
            onScollViewdClassName={styles.slide_title_in}
          >
            <h1 className='text-6xl max-lg:text-4xl'>My Projects</h1>
          </AnimateOnScrollObserver>
        </div>
      </div>
      <div className='w-full py-10 flex justify-center items-center'>
        <ProjectsList />
      </div>
    </main>
  )
}
