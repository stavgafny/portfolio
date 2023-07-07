'use client'

import { useState, useEffect } from 'react'
import ContributionFormatter from '@/utils/contribution_formatter';
import { VscGithub } from "react-icons/vsc";


const contributionsUrl = 'https://github-contributions-api.jogruber.de/v4/stavgafny?y=last'



class ChartCell {
  static readonly size = 6;
  static readonly gap = 4;
  static get step() { return this.size * 2 + this.gap; }
}

const _tooltipPositionOverflow = {left: 365 * .125, right: 365 * .875};

interface githubApiData {
  contributions: { date: string; count: number; level: number }[]
  total: { lastYear: number }
}

export default function ContributionsChart () {
  const [chartData, setChartData] = useState<githubApiData | null>(null);

  useEffect(() => {
      (async () => {
        (await fetch(contributionsUrl)).json().then(setChartData);
      })();
  }, []);

  if (!chartData) {
    return (
      <div className='contributions_chart w-[912px] h-[224px]'>
        <h1 className='text-center'>Loading My GitHub Dominance...</h1>
        <_LoadingIndicator />
      </div>
    )
  }

  const [contributions, total] = [chartData.contributions, chartData.total.lastYear];
  
  return (
    <div className='contributions_chart'>
      
      <div className='flex sticky left-0 items-center px-2 justify-between'>
        <span className='chart_title text-xl'>{total} contributions this year</span>
        <a href='https://github.com/stavgafny' className='scale-150'><VscGithub /></a>
      </div>

      <div className='chart overflow-x-hidden max-lg:overflow-x-auto'>
        <_Dates dates={contributions.map(contribution => contribution.date)} />
        <_Days initialDate={contributions[0].date} />
        <_Cells contributions={contributions} />
      </div>
      <_Levels />
    </div>
  );
}

function _Contribution ({ date, count, level, position }: { date: Date, count: number, level: number, position: number }) {
  let tooltipPosition: string = 'center'
  if (position < _tooltipPositionOverflow.left) tooltipPosition = 'left'
  if (position > _tooltipPositionOverflow.right) tooltipPosition = 'right'
  return (
    <div
      className={`contribution_cell level${level} contribution_tooltip`}
      style={{ padding: ChartCell.size }}
    >
      <div className={`tooltip_text text-sm ${tooltipPosition}`}>
        {ContributionFormatter.format({ date, count })}
      </div>
    </div>
  )
}


function _Dates ({ dates }: { dates: string[] }) {
  const getDateMonthNumber = (date: string) => new Date(date).getMonth()
  const months = dates
    .filter((_, index) => index % 7 === 0)
    .map(date => getDateMonthNumber(date))
  while (months.at(-1) === months.at(0)) months.pop();

  let pos = -1;
  let currentMonth: number = -1;
  return (
    <div className='dates relative flex items-center'>
      {months.map(month => {
        pos++;
        if (month !== currentMonth) {
          currentMonth = month
          return (
            <span
              key={month}
              className='absolute text-xs'
              style={{ left: `${pos * ChartCell.step}px` }}
            >
              {ContributionFormatter.getShortenMonth(currentMonth)}
            </span>
          )
        }
      })}
    </div>
  );
}

function _Days({initialDate}: {initialDate: string}) {
  let pos = -1;
  const DayOfWeek = (day: number) => {
    pos += 2;
    return <span style={{top: pos * ChartCell.step}} className='absolute text-xs'>{ContributionFormatter.getShortenDayOfWeek(day % 7)}</span>
  }
  const initialDay = new Date(initialDate).getDay() + 1;
  return <div className='days relative flex flex-col items-center overflow-hidden top-[-2.5px]'>
    {DayOfWeek(initialDay)}
    {DayOfWeek(initialDay + 2)}
    {DayOfWeek(initialDay + 4)}
  </div>
}

function _Cells ({contributions}: {contributions: githubApiData["contributions"]}) {
  return (
    <div className='cells' style={{ gap: ChartCell.gap }}>
      {contributions.map(({ date, count, level }, index) => (
        <_Contribution
          key={date}
          date={new Date(date)}
          count={count}
          level={level}
          position={index}
        />
      ))}
    </div>
  )
}

function _Levels () {
  const Text = () => <span className='text-sm text-gray-500'>Less</span>;
  return (
    <div className='sticky left-0 flex gap-1 items-center justify-end mr-2'>
      <Text />
      {
        new Array(5).fill(null).map((_, level) => 
        <div key={level} className={`contribution_cell level${level}`} style={{ padding: ChartCell.size }}></div>
        )
      }
      <Text />
    </div>
  )
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