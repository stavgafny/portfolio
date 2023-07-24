'use client'

import styles from '../Projects.module.css'
import { useState } from 'react'
import { ProjectTag } from './Project'

export default function ProjectsFilter ({onFilterChange}: {onFilterChange: (tag: ProjectTag | null) => void}) {
  const [filterHighlightPosition, setFilterHighlightPosition] = useState(
    styles.pos1
  )

  const changeFilter = (tag: ProjectTag | null, position: string) => {
    setFilterHighlightPosition(position);
    onFilterChange(tag);
  }

  return (
    <div className='w-full flex justify-center'>
        <div className={styles.projects_filter}>
            <div className={styles.filter_highlighter + ' ' + filterHighlightPosition}></div>
            <button onClick={() => changeFilter(null, styles.pos1)}>All</button>
            <button onClick={() => changeFilter('web', styles.pos2)}>Web</button>
            <button onClick={() => changeFilter('app', styles.pos3)}>Apps</button>
            <button onClick={() => changeFilter('game', styles.pos4)}>Games</button>
        </div>
    </div>
  )
}
