'use client'

import { useState, useEffect } from 'react'
import ContributionFormatter from '@/utils/contribution_formatter';

const url = 'https://github-contributions-api.jogruber.de/v4/stavgafny?y=last'

const _tooltipPositionOverflow = {left: 365 * .15, right: 365 * .85};

interface githubApiData {
  contributions: { date: string; count: number; level: number }[]
  total: { lastYear: number }
}

export default function ContributionsChart () {
  const [chartData, setChartData] = useState<githubApiData | null>(null)

  useEffect(() => {
    fetch(url).then((response: Response) => response.json().then(setChartData))
  }, [])

  if (!chartData) {
    return (
      <div className='chart'>
        <h1>Loading My GitHub Dominance...</h1>
      </div>
    )
  }
  
  return (
    <div className='contributions_chart overflow-x-visible max-lg:overflow-x-scroll'>
      <div className='flex gap-4 items-center'>
        <span className='chart_title text-xl'>{chartData.total.lastYear} contributions</span>
        <span className='chart_sentence'>Sentence</span>
      </div>
      <div className='chart'>
        {chartData.contributions.map(({ date, count, level }, index) => (
          <_Contribution
          key={date}
          date={new Date(date)}
          count={count}
          level={level}
          position={index}
        />
        ))}
      </div>
    </div>
  )
}

function _Contribution ({ date, count, level, position }: { date: Date, count: number, level: number, position: number }) {
    let tooltipPosition: string = 'center';
    if (position < _tooltipPositionOverflow.left) tooltipPosition = 'left';
    if (position > _tooltipPositionOverflow.right) tooltipPosition = 'right';
  return (
    <div className={`contribution level${level} contribution_tooltip`}>
      <div className={`tooltip_text lg:text-md ${tooltipPosition}`}>
        {ContributionFormatter.format({ date, count })}
      </div>
    </div>
  )
}
