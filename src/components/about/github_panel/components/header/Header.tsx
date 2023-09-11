import React from 'react'
import styles from './Header.module.css'
import { AiOutlineStar } from 'react-icons/ai'
import { VscGithub } from 'react-icons/vsc'

export interface HeaderProps {
  readonly title: string
  readonly stars?: {
    readonly collapsed?: string
    readonly expanded: {
      readonly label: string
      readonly count: number
      readonly link?: string
    }[]
  }
}

export default function Header ({ title, stars }: HeaderProps) {
  return (
    <div className={styles.header}>
      <span className='text-xl'>{title}</span>
      <div className='flex gap-x-4'>
        <div className={styles.stars + ' px-2 ' + (!stars && 'py-1')}>
          {stars && stars.expanded.length > 0 && (
            <div className={styles.stars_dropdown}>
              <div className={styles.expanded_stars}>
                {stars.expanded.map(star => (
                  <React.Fragment key={star.label}>
                    <a
                      href={star.link}
                      target='_blank'
                      className={
                        (star.link?.length ?? 0) > 0
                          ? styles.star_label_link
                          : ''
                      }
                    >
                      {star.label}
                    </a>
                    <AiOutlineStar />
                    <span>{star.count}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          <div className='flex items-center gap-2'>
            <AiOutlineStar className='scale-125' />
            {stars?.collapsed && <span>{stars.collapsed}</span>}
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <a
            href='https://github.com/stavgafny'
            target='_blank'
            title='Check out my Github'
            className='scale-150'
          >
            <VscGithub />
          </a>
        </div>
      </div>
    </div>
  )
}
