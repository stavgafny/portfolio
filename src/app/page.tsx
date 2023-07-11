import Home from '@/components/home/Home'
import About from '@/components/about/About'
import ContactFooter from '@/components/contact_footer/ContactFooter'

export default function Main () {
  return (
    <div className='overflow-x-hidden'>
      <Home />
      <About />
      <ContactFooter />
    </div>
  )
}
