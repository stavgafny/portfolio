import styles from './Skills.module.css'
import AnimateOnScrollObserver from '../shared/AnimateOnScrollObserver'
import SkillBoxes from './skill_boxes/SkillBoxes'


export default function Skills () {
  return (
    <main className='w-full min-h-screen'>
      <div className='flex flex-col justify-center items-center'>
        <div className={styles.title}>
          <AnimateOnScrollObserver
            onScollViewdClassName={styles.slide_title_in}
          >
            <h1 className='text-6xl max-lg:text-4xl'>My Expertise</h1>
          </AnimateOnScrollObserver>
        </div>
        <SkillBoxes />
      </div>
    </main>
  )
}