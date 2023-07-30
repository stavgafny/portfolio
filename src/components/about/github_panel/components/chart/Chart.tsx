'use client'

import { ReactNode, useState } from 'react'
import styles from './Chart.module.css'
import ContributionFormatter from '@/utils/contribution_formatter'

class ChartCellStyle {
  static readonly size = 6
  static readonly gap = 4
  static get step () {
    return this.size * 2 + this.gap
  }
}

export interface StateUpdater {
  update: (cells: ChartProps['cells']) => void
}

export interface ChartCell {
  date: string
  count: number
  level: number //! 0 | 1 | 2 | 3 | 4 | 5
}

export interface ChartProps {
  cells: ChartCell[]
  // stateUpdater: StateUpdater
  footer?: ReactNode
}

export default function Chart ({ cells, footer }: ChartProps) {
  const dates = cells.map(cell => cell.date)
  return (
    <>
      <div
        className={styles.chart + ' overflow-x-hidden max-lg:overflow-x-auto'}
      >
        <_ChartDates dates={dates} />
        <_ChartDays initialDate={dates[0]} />
        <_ChartCells initialCells={cells} /*stateUpdater={stateUpdater} */ />
      </div>
      <_Levels>{footer}</_Levels>
    </>
  )
}

function _ChartDates ({ dates }: { dates: string[] }) {
  const getDateMonthNumber = (date: string) => new Date(date).getMonth()
  const months = dates
    .filter((_, index) => index % 7 === 0)
    .map(date => getDateMonthNumber(date))

  let pos = -1
  let currentMonth: number = -1
  return (
    <div className={styles.chart_dates + ' relative flex items-center'}>
      {months.map(month => {
        pos++
        if (month !== currentMonth) {
          currentMonth = month
          return (
            <span
              key={`${month}~${pos}`}
              className='absolute text-xs'
              style={{ left: `${pos * ChartCellStyle.step}px` }}
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
      <span
        style={{ top: pos * ChartCellStyle.step }}
        className='absolute text-xs'
      >
        {ContributionFormatter.getShortenDayOfWeek(day % 7)}
      </span>
    )
  }
  const initialDay = new Date(initialDate).getDay() + 1
  return (
    <div
      className={
        styles.chart_days +
        ' relative flex flex-col items-center overflow-hidden top-[-2.5px]'
      }
    >
      {DayOfWeek(initialDay)}
      {DayOfWeek(initialDay + 2)}
      {DayOfWeek(initialDay + 4)}
    </div>
  )
}

function _ChartCells ({
  initialCells
}: // stateUpdater
{
  initialCells: ChartProps['cells']
  // stateUpdater: ChartProps['stateUpdater']
}) {
  const [cells, setCells] = useState(initialCells)
  // stateUpdater.update = setCells;

  return (
    <div className={styles.chart_cells} style={{ gap: ChartCellStyle.gap }}>
      {cells.map(({ date, count, level }, index) => (
        <_Cell
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

function _Cell ({
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
  const tooltipPositionChartOverflow = { left: 365 * 0.125, right: 365 * 0.875 }

  let tooltipPosition: string = styles.tooltip_align_center
  if (position < tooltipPositionChartOverflow.left)
    tooltipPosition = styles.tooltip_align_left
  if (position > tooltipPositionChartOverflow.right)
    tooltipPosition = styles.tooltip_align_right

  return (
    <div
      className={`
        ${styles.cell} ${_getCellLevelStyle(level)} ${styles.cell_tooltip}`}
      style={{ padding: ChartCellStyle.size }}
    >
      <div className={styles.tooltip_text + ' text-sm ' + tooltipPosition}>
        {ContributionFormatter.format({ date, count })}
      </div>
    </div>
  )
}

function _Levels ({ children }: { children?: ReactNode }) {
  const Text = ({ text }: { text: string }) => (
    <span className='text-sm text-gray-500'>{text}</span>
  )
  return (
    <div className='sticky flex gap-1 items-center'>
      {children}
      <div className='w-full h-auto flex justify-end items-center gap-1 mr-2'>
        <Text text='Less' />
        {new Array(5).fill(null).map((_, level) => (
          <div
            key={level}
            className={styles.cell + ' ' + _getCellLevelStyle(level)}
            style={{ padding: ChartCellStyle.size }}
          ></div>
        ))}
        <Text text='More' />
      </div>
    </div>
  )
}

const _getCellLevelStyle = (level: number): string => {
  switch (level) {
    case 1:
      return styles.cell_level1
    case 2:
      return styles.cell_level2
    case 3:
      return styles.cell_level3
    case 4:
      return styles.cell_level4
    case 5:
      return styles.cell_level5
    default:
      return styles.cell_level0
  }
}
