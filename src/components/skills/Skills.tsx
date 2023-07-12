import styles from './Skills.module.css'
import AnimateOnScrollObserver from '../shared/AnimateOnScrollObserver'
import { IconType } from 'react-icons/lib'
import { LuMonitor } from 'react-icons/lu'
import { VscTools } from 'react-icons/vsc'
import { GrReactjs } from 'react-icons/gr'
import { TbBrandFlutter } from 'react-icons/tb'
import { BsDatabase } from 'react-icons/bs'
import { HiOutlineServer } from 'react-icons/hi'

export default function Skills () {
  return (
    <main className='w-full min-h-screen'>
      <div className='flex flex-col justify-center items-center'>
        <div className={styles.title}>
          <AnimateOnScrollObserver
            onScollViewdClassName={styles.slide_title_in}
          >
            <h1 className='text-6xl max-lg:text-4xl'>My Expertise</h1>
          </AnimateOnScrollObserver>
        </div>

        <div
          className={
            styles.skill_boxes + ' w-full grid 2xl:w-4/5 lg:grid-cols-3'
          }
        >
          <SkillBox
            title='Software Dev'
            markerColor='bg-pink-400'
            icons={[LuMonitor, VscTools]}
            sections={[
              {
                tagId: 'Languages',
                content: [
                  'Experienced in both functional and OOP in: Dart, Python, JavaScript, and TypeScript.'
                ]
              },
              {
                tagId: 'Methodologies',
                content: ['Utilize CI/CD and TDD in my development.']
              },
              {
                tagId: 'Tools',
                content: ['Git, Github, VS Code, Vim, Docker, Bash.']
              }
            ]}
          />
          <SkillBox
            title='Frontend Dev'
            markerColor='bg-blue-400'
            icons={[GrReactjs, TbBrandFlutter]}
            sections={[
              {
                tagId: 'React',
                content: [
                  'With more than 2 years of development experience in: HTML, CSS, JS, React and NextJS frameworks.',
                  '',
                  'Technologies: NodeJs, React Hooks, Redux, Tailwind, Sass, JestJs.'
                ]
              },
              {
                tagId: 'Flutter',
                content: [
                  'Bringing over 2 years of development experience in Flutter framework to develop mobile apps and cross-platform solutions.',
                  '',
                  'Technologies: Riverpod, Dio, SQLite, Mockito.'
                ]
              }
            ]}
          />
          <SkillBox
            title='Backend Dev'
            markerColor='bg-orange-400'
            icons={[BsDatabase, HiOutlineServer]}
            sections={[
              {
                tagId: 'Know-how',
                content: [
                  'Extensive hands-on experience with Firebase, including authentication, real-time database integration, cloud functions, and other related features.'
                ]
              },
              {
                tagId: 'Knowledge',
                content: [
                  '• Networking concepts: HTTP, Sockets, OSI model.',
                  '• Cryptography and security fundamentals.',
                  '• RESTful API design principles.'
                ]
              },
              {
                tagId: 'Tools2',
                content: [
                  'Well-versed in OAuth, SQL, GraphQL, Express.js, Firebase, AWS.'
                ]
              }
            ]}
          />
        </div>
      </div>
    </main>
  )
}

interface SkillBoxProps {
  title: string
  markerColor: string
  icons: [IconType, IconType]
  sections?: SkillSectionProps[]
}

function SkillBox ({ title, markerColor, icons, sections }: SkillBoxProps) {
  const IconWrapper = ({ Icon }: { Icon: IconType }) => {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        {<Icon className='w-auto h-full' />}
      </div>
    )
  }
  return (
    <div className={styles.skill_box}>
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
    </div>
  )
}

interface SkillSectionProps {
  tagId: string
  content: string[]
}

function SkillSection ({ tagId, content }: SkillSectionProps) {
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
