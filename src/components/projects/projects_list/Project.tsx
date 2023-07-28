import styles from '../Projects.module.css'
import ProjectProps from './project_props'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { HiOutlineCodeBracketSquare } from 'react-icons/hi2'
import { TbExternalLink, TbExternalLinkOff } from 'react-icons/tb'

export default function Project ({ project }: { project: ProjectProps }) {
  const { name, tags, image, description, links, tools } = project
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
        priority
        alt='image'
        src={image}
        quality={100}
        className={styles.project_image}
      />
      <_Tags tags={tags} />
      <_Info
        name={name}
        description={description}
        links={links}
        tools={tools}
      />
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

function _Info ({
  name,
  description,
  links,
  tools
}: {
  name: ProjectProps['name']
  description: ProjectProps['description']
  links: ProjectProps['links']
  tools: ProjectProps['tools']
}) {
  return (
    <div className={styles.project_info}>
      <div className='w-full flex justify-between items-center pb-2'>
        <h1 className='text-xl'>{name}</h1>
        <_InfoLinks name={name} links={links} />
      </div>
      <div className='w-full h-full flex flex-col justify-between items-center'>
        <p className='text-neutral-200'>{description}</p>
        <_InfoTools tools={tools} />
      </div>
    </div>
  )
}

function _InfoLinks ({
  name,
  links
}: {
  name: ProjectProps['name']
  links: ProjectProps['links']
}) {
  return (
    <div className={styles.project_links}>
      <a
        href={links.code}
        title={`${name} code`}
        target='_blank'
        className={styles.project_link}
      >
        <HiOutlineCodeBracketSquare className='w-full h-full' />
      </a>

      <a
        href={links.deployed ?? undefined}
        title={`${!links.deployed ? 'No ' : ''}${name} deployment`}
        target='_blank'
        className={
          styles.project_link +
          ' ' +
          (!links.deployed ? styles.disabled_link : '')
        }
      >
        {links.deployed ? (
          <TbExternalLink className='w-full h-full' />
        ) : (
          <TbExternalLinkOff className='w-full h-full' />
        )}
      </a>
    </div>
  )
}

function _InfoTools ({ tools }: { tools: ProjectProps['tools'] }) {
  return (
    <div className={styles.project_tools}>
      {tools.map(tool => {
        return (
          <div key={tool.name} className={styles.project_tool}>
            <tool.icon className='w-full h-full' />
            <p>{tool.name}</p>
          </div>
        )
      })}
    </div>
  )
}
