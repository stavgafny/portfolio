'use client'

import GithubPanel from '../GithubPanel'
import { useEffect, useState } from 'react'

import GithubApiHandler, {
  GithubContributionsData,
  GithubStargazersData
} from '@/utils/github_api_handler'

export default function GithubActivityPanel () {
  const [contributionsData, setContributionsData] = useState<
    GithubContributionsData | null | undefined
  >(undefined)
  const [stargazersData, setStargazersData] =
    useState<GithubStargazersData | null>(null)

  useEffect(() => {
    GithubApiHandler.getContributions().then(setContributionsData)
    GithubApiHandler.getStargazers().then(setStargazersData)
  }, [])

  return (
    <GithubPanel
      headerData={{
        title: `${contributionsData?.total ?? 'My'} contributions this year`,
        stars: {
          collapsed: stargazersData?.total.toString(),
          expanded:
            stargazersData?.repos.map(repo => {
              return {
                label: repo.name,
                count: repo.count,
                link: GithubApiHandler.getRepoLink(repo.name)
              }
            }) ?? []
        }
      }}
      chartData={
        contributionsData
          ? contributionsData.contributions.map(contribution => {
              return {
                date: contribution.date,
                count: contribution.count,
                level: contribution.level
              }
            })
          : contributionsData
      }
    />
  )
}
