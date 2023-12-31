import AnimateOnScrollObserver from '@/components/shared/AnimateOnScrollObserver'
import { IconType } from 'react-icons'
import styles from '../Skills.module.css'
import SkillBoxProps, { SkillSectionProps } from './skill_box_props'

export default function SkillBox ({
  title,
  markerColor,
  icons,
  sections
}: SkillBoxProps) {
  const IconWrapper = ({ Icon }: { Icon: IconType }) => {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        {<Icon className={styles.skill_box_icon} />}
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
        {content.map((segment, index) => (
          <div key={segment + index}>
            {segment.length > 0 ? <p>{segment}</p> : <br />}
          </div>
        ))}
      </div>
    </section>
  )
}
