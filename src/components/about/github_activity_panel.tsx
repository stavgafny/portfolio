'use client'

import React, { useState, useEffect } from 'react'
import ContributionFormatter from '@/utils/contribution_formatter'
import { VscGithub } from 'react-icons/vsc'
import { AiOutlineStar } from 'react-icons/ai'
import GithubApiHandler, {
  GithubContributionsData,
  GithubStargazersData
} from '@/utils/github_api_handler'


class ChartCell {
  static readonly size = 6
  static readonly gap = 4
  static get step () {
    return this.size * 2 + this.gap
  }
}

const _tooltipPositionChartOverflow = { left: 365 * 0.125, right: 365 * 0.875 }

export default function GithubActivityPanel () {
  const [contributionsData, setContributionsData] = useState<
    GithubContributionsData | null | undefined
  >(undefined)
  const [stargazersData, setStargazersData] =
    useState<GithubStargazersData | null>(null)

  useEffect(() => {
    GithubApiHandler.getUserYearContributions().then(setContributionsData)
    GithubApiHandler.getAllUserStargazers().then(setStargazersData)
  }, [])

  if (!contributionsData) {
    return (
      <div className='github_activity_panel w-[910px] h-[228px]'>
        <div className='flex h-full flex-col justify-around items-center'>
          {contributionsData === undefined ? (
            <>
              <h1>Loading My GitHub Dominance...</h1>
              <_LoadingIndicator />
            </>
          ) : (
            <>
              <h1>Failed to load github chart :(</h1>
              <p>someoneone must be playing with the wires</p>
            </>
          )}
        </div>
      </div>
    )
  }

  const { contributions, total } = contributionsData

  return (
    <div className='github_activity_panel'>
      <_PanelHeader
        contributionsTotal={total}
        stargazersData={stargazersData}
      />

      <div className='contributions_chart overflow-x-hidden max-lg:overflow-x-auto'>
        <_ChartDates
          dates={contributions.map(contribution => contribution.date)}
        />
        <_ChartDays initialDate={contributions[0].date} />
        <_ChartCells contributions={contributions} />
      </div>
      <_PanelLevels />
    </div>
  )
}

function _PanelHeader ({
  contributionsTotal,
  stargazersData
}: {
  contributionsTotal: number
  stargazersData: GithubStargazersData | null
}) {
  return (
    <div className='flex sticky left-0 items-center px-2 justify-between'>
      <span className='chart_title text-xl'>
        {contributionsTotal} contributions this year
      </span>
      <div className='flex gap-x-4'>
        <div className={'stargazers px-2 ' + (stargazersData === null && 'py-1')}>
          {
            stargazersData && stargazersData.repos.length > 0 &&
          <div className='repos_dropdown'>
            <div className='repos'>
              {stargazersData?.repos.map(repo => (
                <React.Fragment key={repo.name}>
                  <span>{repo.name}</span>
                  <AiOutlineStar />
                  <span>{repo.stargazers}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
          }

          <div className='flex items-center gap-2'>
            <AiOutlineStar className='scale-125' />
            {stargazersData && <span>{stargazersData.total}</span>}
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <a href='https://github.com/stavgafny' className='scale-150'>
            <VscGithub />
          </a>
        </div>
      </div>
    </div>
  )
}

function _ChartDates ({ dates }: { dates: string[] }) {
  const getDateMonthNumber = (date: string) => new Date(date).getMonth()
  const months = dates
    .filter((_, index) => index % 7 === 0)
    .map(date => getDateMonthNumber(date))
  while (months.at(-1) === months.at(0)) months.pop()

  let pos = -1
  let currentMonth: number = -1
  return (
    <div className='dates relative flex items-center'>
      {months.map(month => {
        pos++
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
  )
}

function _ChartDays ({ initialDate }: { initialDate: string }) {
  let pos = -1
  const DayOfWeek = (day: number) => {
    pos += 2
    return (
      <span style={{ top: pos * ChartCell.step }} className='absolute text-xs'>
        {ContributionFormatter.getShortenDayOfWeek(day % 7)}
      </span>
    )
  }
  const initialDay = new Date(initialDate).getDay() + 1
  return (
    <div className='days relative flex flex-col items-center overflow-hidden top-[-2.5px]'>
      {DayOfWeek(initialDay)}
      {DayOfWeek(initialDay + 2)}
      {DayOfWeek(initialDay + 4)}
    </div>
  )
}

function _ChartCells ({
  contributions
}: {
  contributions: GithubContributionsData['contributions']
}) {
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

function _PanelLevels () {
  const Text = ({text}: {text: string}) => <span className='text-sm text-gray-500'>{text}</span>
  return (
    <div className='sticky left-0 flex gap-1 items-center justify-end mr-2'>
      <Text text='Less' />
      {new Array(5).fill(null).map((_, level) => (
        <div
          key={level}
          className={`contribution_cell level${level}`}
          style={{ padding: ChartCell.size }}
        ></div>
      ))}
      <Text text='More' />
    </div>
  )
}

function _Contribution ({
  date,
  count,
  level,
  position
}: {
  date: Date
  count: number
  level: number
  position: number
}) {
  let tooltipPosition: string = 'center'
  if (position < _tooltipPositionChartOverflow.left) tooltipPosition = 'left'
  if (position > _tooltipPositionChartOverflow.right) tooltipPosition = 'right'
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

function _LoadingIndicator () {
  return (
    <div className='loading'>
      <svg className='circular-loader' viewBox='25 25 50 50'>
        <circle className='loader-path' cx='50' cy='50' r='20'></circle>
      </svg>
    </div>
  )
}
