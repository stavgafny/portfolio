import styles from '../Projects.module.css'
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'

export type ProjectTag = 'web' | 'app' | 'game'

export interface ProjectProps {
  name: string
  tags: ProjectTag[]
  image: StaticImageData
}

export default function Project ({ project }: { project: ProjectProps }) {
  const { name, tags, image } = project
  return (
    <motion.div
      layout={true}
      animate={{ opacity: 1.0, scale: 1.0 }}
      initial={{ opacity: 0, scale: 0.0 }}
      exit={{ opacity: 0, scale: 0.0 }}
      transition={{
        opacity: { ease: 'linear' },
        layout: { duration: 0.3 }
      }}
      className={styles.project}
    >
      <Image
        alt='image'
        src={image}
        quality={100}
        className={styles.project_image}
      />
      <_Tags tags={tags} />
      <_Info name={name} />
    </motion.div>
  )
}

function _Tags ({ tags }: { tags: ProjectProps['tags'] }) {
  return (
    <div className={styles.project_tags}>
      {tags.map(tag => {
        return (
          <div key={tag} className={styles.project_tag}>
            <p className='text-sm'>{tag}</p>
          </div>
        )
      })}
    </div>
  )
}

function _Info ({ name }: { name: ProjectProps['name'] }) {
  return (
    <div className={styles.project_info}>
      <div>
        <h1 className='text-xl pb-1'>{name}</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, facilis quisquam quasi asperiores impedit deleniti voluptatem? Suscipit unde neque illo ut voluptas impedit saepe at doloribus non quasi, magni cupiditate?</p>
      </div>
    </div>
  )
}
