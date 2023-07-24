import styles from '../Projects.module.css'

export type ProjectTag = "web" | "app" | "game";

export interface ProjectProps {
    name: string
    tags: ProjectTag[],
}

export default function Project ({name, tags}: ProjectProps) {
  return (
    <div className={styles.project}>
      <div className={styles.project_image}><h1>IMAGE</h1></div>
      <div className={styles.project_info}>
        <h1 className='text-xl'>{name}</h1>
      </div>
    </div>
  )
}
