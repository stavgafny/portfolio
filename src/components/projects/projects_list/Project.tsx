import styles from '../Projects.module.css'
import { motion } from 'framer-motion'

export type ProjectTag = 'web' | 'app' | 'game'

export interface ProjectProps {
  name: string
  tags: ProjectTag[]
}

export default function Project ({ project }: { project: ProjectProps }) {
  const { name, tags } = project
  return (
    <motion.div
      layout={true}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className={styles.project}
    >
      <div className={styles.project_image}>
        <h1>IMAGE</h1>
      </div>
      <div className={styles.project_info}>
        <h1 className='text-xl inline'>{name}</h1>
        <p className='inline px-2 text-sm'>{tags.join('|')}</p>
      </div>
    </motion.div>
  )
}
