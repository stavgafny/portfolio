import Home from '@/components/home/Home'
import About from '@/components/about/About'
import ContactFooter from '@/components/contact_footer/ContactFooter'
import Nav, { navHeight } from '@/components/nav/Nav'
import Skills from '@/components/skills/Skills'
import Projects from '@/components/projects/Projects'

export default function Main () {
  return (
    <div className='overflow-x-hidden'>
      <Nav />
      <_ScrollScreen id='home' screen={<Home />} />
      <_ScrollScreen id='about' screen={<About />} />
      <_ScrollScreen id='skills' screen={<Skills />} />
      <_ScrollScreen id='projects' screen={<Projects />} />
      <ContactFooter />
    </div>
  )
}

function _ScrollScreen ({ id, screen }: { id: string, screen: React.ReactElement }) {
  return (
    <section id={id}>
      <div className={navHeight} />
      {screen}
    </section>
  )
}
