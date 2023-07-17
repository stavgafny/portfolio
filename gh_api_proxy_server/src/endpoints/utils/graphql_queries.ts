enum GraphqlQueries {
    CONTRIBUTIONS = `
      query {
        viewer {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }
    `,
    STARGAZERS = `
      query {
        viewer {
          repositories(first: 100) {
            edges {
              node {
                name
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
      }
    `
}

export default GraphqlQueries;