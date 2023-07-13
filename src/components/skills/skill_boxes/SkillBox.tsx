import styles from '../Skills.module.css'
import AnimateOnScrollObserver from '@/components/shared/AnimateOnScrollObserver'
import { IconType } from 'react-icons'

export interface SkillBoxProps {
  title: string
  markerColor: string
  icons: [IconType, IconType]
  sections?: SkillSectionProps[]
}

export interface SkillSectionProps {
  tagId: string
  content: string[]
}

export default function SkillBox ({
  title,
  markerColor,
  icons,
  sections
}: SkillBoxProps) {
  const IconWrapper = ({ Icon }: { Icon: IconType }) => {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        {<Icon className='w-auto h-full' />}
      </div>
    )
  }
  return (
    <AnimateOnScrollObserver
      onScollViewdClassName={styles.slide_in}
      className={styles.skill_box + ' ' + styles.slideable}
    >
      <div className={styles.skill_box_header}>
        <IconWrapper Icon={icons[0]} />
        <div className={styles.skill_box_title}>
          <div
            className={`${styles.skill_box_title_marker} ${markerColor}`}
          ></div>
          <h1>{title}</h1>
        </div>
        <IconWrapper Icon={icons[1]} />
      </div>
      {sections?.map(section => (
        <SkillSection
          key={section.tagId}
          tagId={section.tagId}
          content={section.content}
        />
      ))}
    </AnimateOnScrollObserver>
  )
}

export function SkillSection ({ tagId, content }: SkillSectionProps) {
  return (
    <section className={styles.skill_section}>
      <div
        className={styles.section_content + ' text-lg max-lg:text-base'}
        content={`<p id="${tagId}">`}
      >
        {content.map((segment, index) =>
          segment.length > 0 ? <p key={segment + index}>{segment}</p> : <br />
        )}
      </div>
    </section>
  )
}
