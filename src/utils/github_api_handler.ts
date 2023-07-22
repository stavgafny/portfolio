import CacheWrapper from "./cache_wrapper";


export interface Contribution { date: string; count: number; level: number }

export interface GithubContributionsData {
    readonly total: number
    readonly contributions: Contribution[]
}


export interface GithubStargazersData {
    readonly total: number
    readonly repos: { name: string, count: number }[]
}

export default class GithubApiHandler {
    private static readonly contributionsCacheExpirationDate = 6 * 3600000;
    private static readonly stargazersCacheExpirationDate = 4 * 3600000;

    private static readonly $contributionsData = new CacheWrapper<GithubContributionsData>({
        cacheName: "$contributions-cache",
        expirationDuration: GithubApiHandler.contributionsCacheExpirationDate,
        segmentBuilder: async () => _GithubApiMethods.fetchContributions()
    });

    private static readonly $stargazersData = new CacheWrapper<GithubStargazersData>({
        cacheName: "$stargazers-cache",
        expirationDuration: GithubApiHandler.stargazersCacheExpirationDate,
        segmentBuilder: async () => _GithubApiMethods.fetchStargazers()
    });


    static getContributions = async (): Promise<GithubContributionsData | null> => await this.$contributionsData.getData();
    static getStargazers = async (): Promise<GithubStargazersData | null> => await this.$stargazersData.getData();

    static getRepoLink = (repo: string) => `https://github.com/stavgafny/${repo}`;
}



class _GithubApiMethods {
    private static readonly api = "https://stavgafny-gh-api-proxy-server.vercel.app";
    private static readonly endpoints = {
        contributions: `${this.api}/contributions`,
        stargazers: `${this.api}/stargazers`
    };

    static async fetchContributions(): Promise<GithubContributionsData | null> {
        try {
            const response = await fetch(this.endpoints.contributions);

            if (response.status !== 200) throw null;

            const data: GithubContributionsData = await response.json();

            return data;
        } catch {
            return null;
        }
    }

    static async fetchStargazers(): Promise<GithubStargazersData | null> {

        try {
            const response = await fetch(this.endpoints.stargazers);

            if (response.status !== 200) throw null;

            const data: GithubStargazersData = await response.json();
            return data;

        } catch {
            return null;
        }
    }
}