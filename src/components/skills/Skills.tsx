import styles from './Skills.module.css'
import AnimateOnScrollObserver from '../shared/AnimateOnScrollObserver'

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

        <div className={styles.skill_boxes + ' flex max-lg:flex-col'}>
          <SkillBox title='Software Development' markerColor='bg-pink-400' />
          <SkillBox title='Frontend Dev' markerColor='bg-blue-400' />
          <SkillBox title='Backend Dev' markerColor='bg-orange-400' />
        </div>
      </div>
    </main>
  )
}

interface ISkillBox {
  title: string
  markerColor: string
}

function SkillBox ({ title, markerColor }: ISkillBox) {
  return (
    <div className={styles.skill_box}>
      <div className={styles.skill_box_title}>
        <div
          className={`${styles.skill_box_title_marker} ${markerColor}`}
        ></div>
        <h1>{title}</h1>
      </div>
    </div>
  )
}
