import CacheHandler from "./cache_handler";

export interface Contribution { date: string; count: number; level: number }

export interface GithubContributionsData {
    readonly contributions: Contribution[]
    readonly total: number //! Not the same as `contributions.length`
}


export interface GithubStargazersData {
    readonly repos: { name: string, stargazers: number }[]
    readonly total: number
}

export default class GithubApiHandler {
    private static readonly githubUsername = "stavgafny";
    private static readonly contributionsCacheExpirationDate = 6 * 3600000;
    private static readonly stargazersCacheExpirationDate = 4 * 3600000;

    private static readonly $contributionsData = new CacheHandler<GithubContributionsData>({
        cacheName: "$contributions-cache",
        expirationDuration: GithubApiHandler.contributionsCacheExpirationDate,
        segmentBuilder: async () => GithubApiHandler.fetchUserYearContributions(GithubApiHandler.githubUsername)
    });

    private static readonly $stargazersData = new CacheHandler<GithubStargazersData>({
        cacheName: "$stargazers-cache",
        expirationDuration: GithubApiHandler.stargazersCacheExpirationDate,
        segmentBuilder: async () => GithubApiHandler.fetchAllUserStargazers(GithubApiHandler.githubUsername)
    });

    private static async fetchUserYearContributions(username: string): Promise<GithubContributionsData | null> {
        try {
            const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;

            const response = await fetch(url);

            if (response.status !== 200) throw null;

            const data:
                {
                    contributions: GithubContributionsData["contributions"],
                    total: { lastYear: number }
                } = await response.json();

            return { contributions: data.contributions, total: data.total.lastYear };
        } catch {
            return null;
        }
    }

    private static async fetchAllUserStargazers(username: string): Promise<GithubStargazersData | null> {
        const url = `https://api.github.com/users/${username}/repos`;

        try {
            const response = await fetch(url);

            if (response.status !== 200) throw null;

            const userRepos = await response.json();

            const repos: GithubStargazersData["repos"] = [];

            for (const repo of userRepos) {
                const name = repo.name;
                const stargazers = repo.stargazers_count;
                repos.push({ name, stargazers });
            }
            return {
                repos: repos,
                total: repos.reduce((sum, repo) => sum + repo.stargazers, 0)
            }
        } catch {
            return null;
        }
    }

    static getUserYearContributions = async (): Promise<GithubContributionsData | null> => await this.$contributionsData.getData();
    static getAllUserStargazers = async (): Promise<GithubStargazersData | null> => await this.$stargazersData.getData();
    
}