import styles from './Skills.module.css'
import AnimateOnScrollObserver from '../shared/AnimateOnScrollObserver'

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
          className={styles.skill_boxes + ' w-full 2xl:w-4/5 lg:grid-cols-3'}
        >
          <SkillBox
            title='Software Development'
            markerColor='bg-pink-400'
            sections={[
              {
                title: '',
                tagId: 'Languages',
                content: [
                  'Experienced in both functional and OOP in: Dart, Python, JavaScript, and TypeScript.'
                ]
              },
              {
                title: '',
                tagId: 'Tools',
                content: ['Git, Github, VS Code, Vim, Docker, Bash.']
              },
              {
                title: '',
                tagId: 'Methodologies',
                content: ['Utilize CI/CD and TDD in my development.']
              }
            ]}
          />
          <SkillBox
            title='Frontend Dev'
            markerColor='bg-blue-400'
            sections={[
              {
                title: '',
                tagId: 'React',
                content: [
                  'With more than 2 years of development experience in: HTML, CSS, JS, React and NextJS frameworks.',
                  '',
                  'Technologies: NodeJs, React Hooks, Redux, Tailwind, Sass, JestJs.'
                ]
              },
              {
                title: '',
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
            sections={[
              {
                title: '',
                tagId: 'Know-how',
                content: [
                  'Strong Knowledge in networking concepts such as:',
                  'HTTP, Sockets, OSI model cryptography and security'
                ]
              },
              {
                title: '',
                tagId: 'Knowledge',
                content: [
                  '• Networking concepts: HTTP, Sockets, OSI model.',
                  '• Cryptography and security fundamentals.',
                  '• RESTful API design principles.'
                ]
              },
              {
                title: '',
                tagId: 'Tools2',
                content: [
                  'Proficient in: SQL, GraphQL, Express.js, Firebase, AWS'
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
  sections?: SkillSectionProps[]
}

function SkillBox ({ title, markerColor, sections }: SkillBoxProps) {
  return (
    <div className={styles.skill_box}>
      <div className={styles.skill_box_title}>
        <div
          className={`${styles.skill_box_title_marker} ${markerColor}`}
        ></div>
        <h1>{title}</h1>
      </div>
      {sections?.map(section => (
        <SkillSection
          key={section.tagId}
          title={section.title}
          tagId={section.tagId}
          content={section.content}
        />
      ))}
    </div>
  )
}

interface SkillSectionProps {
  title: string
  tagId: string
  content: string[]
}

function SkillSection ({ title, tagId, content }: SkillSectionProps) {
  return (
    <section className={styles.skill_section}>
      <div className={styles.section_title}>
        <h1>{title}</h1>
      </div>

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
