'use client'

import styles from '../Projects.module.css'
import Project, { ProjectProps, ProjectTag } from './Project'
import ProjectsFilter from './ProjectsFilter'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const pList: ProjectProps[] = [
  { name: 'website', tags: ['web'] },
  { name: 'webgame', tags: ['web', 'game'] },
  { name: 'app', tags: ['app'] },
  { name: 'game', tags: ['game'] },
  { name: 'webweb', tags: ['web'] },
  { name: 'webapp', tags: ['web', 'app'] },
  { name: 'app2', tags: ['app'] }
]

export default function ProjectsList () {
  const [projectsFilter, setProjectsFilter] = useState<ProjectTag | null>(null)

  const filteredProjects =
    projectsFilter === null
      ? pList
      : pList.filter(p => p.tags.includes(projectsFilter))

  return (
    <div className={styles.projects_list}>
      <ProjectsFilter onFilterChange={setProjectsFilter} />
      <motion.div layout={true} className={styles.projects_grid}>
        <AnimatePresence>
          {filteredProjects.map(project => {
            return <Project key={project.name} project={project} />
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
