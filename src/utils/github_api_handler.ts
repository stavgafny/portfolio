import CacheWrapper from "./cache_wrapper";

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

    private static readonly $contributionsData = new CacheWrapper<GithubContributionsData>({
        cacheName: "$contributions-cache",
        expirationDuration: GithubApiHandler.contributionsCacheExpirationDate,
        segmentBuilder: async () => _GithubApiMethods.fetchUserYearContributions(GithubApiHandler.githubUsername)
    });

    private static readonly $stargazersData = new CacheWrapper<GithubStargazersData>({
        cacheName: "$stargazers-cache",
        expirationDuration: GithubApiHandler.stargazersCacheExpirationDate,
        segmentBuilder: async () => _GithubApiMethods.fetchAllUserStargazersRepos(GithubApiHandler.githubUsername)
    });


    static getUserYearContributions = async (): Promise<GithubContributionsData | null> => await this.$contributionsData.getData();
    static getAllUserStargazersRepos = async (): Promise<GithubStargazersData | null> => await this.$stargazersData.getData();

    static getRepoLink = (repo: string) => `https://github.com/stavgafny/${repo}`;
}



class _GithubApiMethods {
    static async fetchUserYearContributions(username: string): Promise<GithubContributionsData | null> {
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

    static async fetchAllUserStargazersRepos(username: string): Promise<GithubStargazersData | null> {
        const url = `https://api.github.com/users/${username}/repos`;

        try {
            const response = await fetch(url);

            if (response.status !== 200) throw null;

            const userRepos = await response.json();

            const repos: GithubStargazersData["repos"] = [];

            for (const repo of userRepos) {
                const name = repo.name;
                const stargazers = repo.stargazers_count;
                if (stargazers > 0) {
                    repos.push({ name, stargazers });
                }
            }
            return {
                repos: repos.sort((a, b) => b.stargazers - a.stargazers),
                total: repos.reduce((sum, repo) => sum + repo.stargazers, 0)
            }
        } catch {
            return null;
        }
    }
}