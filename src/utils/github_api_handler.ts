export interface Contribution { date: string; count: number; level: number }

export interface GithubContributionsData {
    contributions: Contribution[]
    total: number //! Not the same as `contributions.length`
}


export interface GithubStargazersData {
    repos: {name: string, stargazers: number}[]
    total: number
}


export default class GithubApiHandler {
    static async getUserYearContributions(username: string): Promise<GithubContributionsData | null> {
        try {
            const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;

            const response = await fetch(url);

            if (response.status !== 200) throw null;

            const data:
                { contributions: GithubContributionsData["contributions"], total: { lastYear: number } }
                = await response.json();

            return { contributions: data.contributions, total: data.total.lastYear };
        } catch (e) {
            return null;
        }
    }

    static async getAllUserStargazers(username: string): Promise<GithubStargazersData | null> {
        const url = `https://api.github.com/users/${username}/repos`;

        try {
            const response = await fetch(url);

            if (response.status !== 200) throw null;
    
            const userRepos = await response.json();
            
            const stargazersData: GithubStargazersData = {repos: [], total: 0};
    
            for (const repo of userRepos) {
                const name = repo.name;
                const stargazers = repo.stargazers_count;
                stargazersData.repos.push({name, stargazers});
            }
            stargazersData.total = stargazersData.repos.reduce((sum, repo) => sum + repo.stargazers, 0);
            return stargazersData;
        } catch (e) {
            return null;
        }
    } 
}