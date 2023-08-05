'use client'

import { useEffect, useRef } from 'react'

export interface AnimateOnScrollObserverProps {
  children?: React.ReactNode
  className?: string
  onScollViewdClassName: string
  repetitive?: boolean
}

export default function AnimateOnScrollObserver ({
  children,
  className,
  onScollViewdClassName,
  repetitive = false
}: AnimateOnScrollObserverProps) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = _createIntersectionObserver(onScollViewdClassName, repetitive)
    const element = ref.current

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [onScollViewdClassName, repetitive])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

const _createIntersectionObserver = (onScollViewdClassName: string, repetitive: boolean) => {
  const onIntersectionChange = repetitive
    ? (entry: IntersectionObserverEntry) => entry.target.classList.toggle(onScollViewdClassName, entry.isIntersecting)
    : (entry: IntersectionObserverEntry) => entry.isIntersecting && entry.target.classList.add(onScollViewdClassName)

  return new IntersectionObserver(entries => entries.map(entry => onIntersectionChange(entry)));
}
