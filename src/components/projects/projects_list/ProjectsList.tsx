'use client'

import styles from '../Projects.module.css'
import Project, { ProjectProps, ProjectTag } from './Project'
import ProjectsFilter from './ProjectsFilter'
import { useState } from 'react'

const pList: ProjectProps[] = [
  { name: 'website', tags: ['web'] },
  { name: 'webgame', tags: ['web', 'game'] },
  { name: 'app', tags: ['app'] }
]

export default function ProjectsList () {
  const [projectsFilter, setProjectsFilter] = useState<ProjectTag | null>(null)

  return (
    <div className={styles.projects_list}>
      <ProjectsFilter onFilterChange={setProjectsFilter} />
      <div className='w-full flex justify-center items-center'>
        <div className='grid gap-10 w-3/5 max-md:w-full lg:grid-cols-2 xl:grid-cols-3'>
          {pList
            .filter(
              project => projectsFilter ? project.tags.includes(projectsFilter) : true
            )
            .map(project => {
              return (
                <Project
                  key={project.name}
                  name={project.name}
                  tags={project.tags}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
