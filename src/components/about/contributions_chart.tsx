'use client'

import { useState, useEffect } from 'react'
import ContributionFormatter from '@/utils/contribution_formatter';
import { VscGithub } from "react-icons/vsc";

const url = 'https://github-contributions-api.jogruber.de/v4/stavgafny?y=last'


const _chartCell = {size: 6, gap: 4} as const;

const _tooltipPositionOverflow = {left: 365 * .125, right: 365 * .875};

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
      <div className='contributions_chart w-[868px] h-[170px]'>
        <h1 className='text-center'>Loading My GitHub Dominance...</h1>
        <_LoadingIndicator />
      </div>
    )
  }
  
  return (
    <div className='contributions_chart overflow-x-hidden max-lg:overflow-x-auto'>
      <div className='flex sticky left-0 gap-4 items-center justify-between'>
        <span className='chart_title text-xl'>{chartData.total.lastYear} contributions this year</span>
        <a href='https://github.com/stavgafny' className='scale-150'><VscGithub /></a>
      </div>
      
      <_Dates dates={chartData.contributions.map(contribution => contribution.date)} />
      <div className='chart' style={{gap: _chartCell.gap}}>
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
  );
}
function _LoadingIndicator() {
  return (
    <div className='loading'>
      <svg className='circular-loader' viewBox='25 25 50 50'>
        <circle className='loader-path' cx='50' cy='50' r='20'></circle>
      </svg>
    </div>
  );
}

function _Dates({dates}: {dates: string[]}) {
  const getDateMonthNumber = (date: string) => new Date(date).getMonth();


  const months = dates
    .filter((_, index) => index % 7 === 0)
    .map(date => getDateMonthNumber(date));
  while (months.at(-1) === months.at(0)) months.pop();
  
  const step = (_chartCell.size * 2) + _chartCell.gap;
  let pos = -step;
  let currentMonth: number = -1;
  return (
    <div className='dates absolute pb-2'>
      {
        months.map(month => {
          pos += step;
          if (month !== currentMonth) {
            currentMonth = month;
            return (
              <span key={month} className='text-xs absolute' style={{ left: `${pos}px` }}>
                {ContributionFormatter.getShortenMonth(currentMonth)}
              </span>
            );
          }
        })
      }
    </div>
);
}

function _Contribution ({ date, count, level, position }: { date: Date, count: number, level: number, position: number }) {
    let tooltipPosition: string = 'center';
    if (position < _tooltipPositionOverflow.left) tooltipPosition = 'left';
    if (position > _tooltipPositionOverflow.right) tooltipPosition = 'right';
  return (
    <div className={`contribution_cell level${level} contribution_tooltip`} style={{padding: _chartCell.size}}>
      <div className={`tooltip_text text-sm ${tooltipPosition}`}>
        {ContributionFormatter.format({ date, count })}
      </div>
    </div>
  )
}