import { ReactNode } from "react";
import { AiFillLinkedin } from "react-icons/ai";
import { VscGithub } from "react-icons/vsc";

export default function ContactFooter () {
  return (
    <footer className='py-8 flex flex-col gap-8 text-center bg-[#1c1b1f]'>
      <h1>Find me on</h1>
      <div className='flex justify-center gap-16 lg:gap-24'>
        <ContactLinks
          href='https://www.linkedin.com/in/stav-gafny/'
          icon={<AiFillLinkedin className='scale-[3]' />}
        />
        <ContactLinks
          href='https://github.com/stavgafny'
          icon={<VscGithub className='scale-[3]' />}
        />
      </div>
    </footer>
  )
}


function ContactLinks ({ href, icon }: { href: string; icon: ReactNode }) {
    return <a href={href}>{icon}</a>
  }

  