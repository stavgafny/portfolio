import styles from './GithubPanel.module.css'
import Header, { HeaderProps } from './components/header/Header'
import Chart, { ChartCell, StateUpdater } from './components/chart/Chart'

import GithubApiHandler, {
  GithubContributionsData,
  GithubStargazersData
} from '@/utils/github_api_handler'
import { useEffect, useState } from 'react'

export interface GithubPanelProps {
  headerData: HeaderProps | null
  chartData: ChartCell[] | undefined | null
}

export default function GithubPanel (props: GithubPanelProps) {
  const { headerData, chartData } = props

  if (!chartData) {
    return (
      <div className={styles.github_panel}>
        <div className={styles.no_data}>
          {chartData === null ? <_PanelError /> : <_PanelLoadingIndicator />}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.github_panel}>
      <Header title={headerData?.title ?? ''} stars={headerData?.stars} />
      <Chart cells={chartData} />
    </div>
  )
}

function _PanelLoadingIndicator () {
  return (
    <>
      <h1>Loading My GitHub Dominance...</h1>
      <div className={styles.loading_indicator}>
        <svg className={styles.circular_loader} viewBox='25 25 50 50'>
          <circle
            className={styles.loader_path}
            cx='50'
            cy='50'
            r='20'
          ></circle>
        </svg>
      </div>
    </>
  )
}

function _PanelError () {
  return (
    <>
      <h1>Failed to load github chart :(</h1>
      <p>someoneone must be playing with the wires</p>
    </>
  )
}
