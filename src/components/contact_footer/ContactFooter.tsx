'use client'

import { ReactNode, useState } from 'react'
import { AiFillLinkedin } from 'react-icons/ai'
import { VscGithub } from 'react-icons/vsc'
import { MdEmail } from 'react-icons/md'
import styles from './ContactFooter.module.css'

export default function ContactFooter () {
  return (
    <footer className='py-8 flex flex-col gap-8 text-center bg-[#222126]'>
      <h1>Find me on</h1>
      <div className='flex justify-center gap-16 lg:gap-24'>
        <ContactLinks
          href='https://www.linkedin.com/in/stav-gafny/'
          icon={<AiFillLinkedin className='scale-[3]' />}
          title='My Linkedin'
        />
        <ContactLinks
          href='https://github.com/stavgafny'
          icon={<VscGithub className='scale-[3]' />}
          title='My Github'
        />
      </div>
      <Email />
    </footer>
  )
}

function ContactLinks ({
  href,
  icon,
  title
}: {
  href: string
  icon: ReactNode
  title: string
}) {
  return (
    <a title={title} href={href} target='_blank'>
      {icon}
    </a>
  )
}

function Email () {
  const [showSnackbar, setShowSnackbar] = useState(false)
  let snackbarTimer: NodeJS.Timeout

  const copyToClipboard = () => {
    navigator.clipboard.writeText('stavgafny@gmail.com')
    setShowSnackbar(true)
    clearTimeout(snackbarTimer)
    snackbarTimer = setTimeout(() => {
      setShowSnackbar(false)
    }, 3000)
  }

  return (
    <div className={styles.email_tooltip}>
      <div
        onClick={copyToClipboard}
        className={
          'flex justify-center items-center gap-2 ' +
          (showSnackbar ? '' : 'hover:cursor-pointer')
        }
      >
        <span
          className={styles.tooltip_text + ' ' + (showSnackbar ? 'hidden' : '')}
        >
          Copy my email
        </span>
        <MdEmail className='scale-125' />
        <span>stavgafny@gmail.com</span>
        <div
          className={
            styles.snackbar + ' ' + (showSnackbar ? styles.show_snackbar : '')
          }
        >
          <p>Email copied</p>
        </div>
      </div>
    </div>
  )
}
