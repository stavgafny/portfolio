'use client'

import { useEffect, useRef } from 'react'

interface IAnimateOnScrollObserver {
  children?: React.ReactNode
  className?: string
  onScollViewdClassName: string
}

export default function AnimateOnScrollObserver ({
    children,
    className,
    onScollViewdClassName
}: IAnimateOnScrollObserver) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = _createObserver(onScollViewdClassName)

    const element = ref.current

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

const _createObserver = (onScollViewdClassName: string) => {
  return new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.classList.toggle(
        onScollViewdClassName,
        entry.isIntersecting
      )
      console.log(entry.target.classList)
    }
  })
}
