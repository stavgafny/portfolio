'use client'

import styles from '../Projects.module.css'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectTag } from './project_props'
import Project from './Project'
import ProjectsFilter from './ProjectsFilter'
import projectsList from './projects_list'

export default function ProjectsList () {
  const [projectsFilter, setProjectsFilter] = useState<ProjectTag | null>(null)

  const filteredProjects =
    projectsFilter === null
      ? projectsList
      : projectsList.filter(p => p.tags.includes(projectsFilter))

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
