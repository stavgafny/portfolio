import styles from '../Skills.module.css'
import skillBoxesList from './skill_boxes_list'
import SkillBox from './SkillBox'


export default function SkillBoxes () {
  return (
    <div
      className={styles.skill_boxes + ' w-full grid 2xl:w-4/5 lg:grid-cols-3'}
    >
      {
        skillBoxesList.map(skillBox => {
          return <SkillBox key={skillBox.title} {...skillBox} />
        })
      }
    </div>
  )
}
