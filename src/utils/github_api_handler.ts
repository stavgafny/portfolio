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
    private static readonly cacheExpirationMinutes = 1 * (60 * 1000);
    private static readonly $cacheExpirationName = "$github-handler-cache-expiration";
    private static readonly $contributionsCacheName = "$contributions-cache";
    private static readonly $stargazersCacheName = "$stargazers-cache";

    private static get isCacheExpired(): boolean {
        try {
            const cacheDateData = localStorage.getItem(this.$cacheExpirationName);
            if (cacheDateData === null) throw null;
            const cacheDate = new Date(parseInt(cacheDateData));
            const currentDate = new Date();
            return currentDate >= cacheDate;
        } catch {
            return true;
        }
    }

    private static loadCache<CacheDataType>(cacheName: string): CacheDataType | null {
        const cache = localStorage.getItem(cacheName);
        if (cache === null) return null;
        try {
            return JSON.parse(cache) as CacheDataType;
        } catch {
            return null;
        }
    };

    private static storeCache<CacheDataType>(cacheName: string, data: CacheDataType): boolean {
        console.info(`storing ${cacheName}`);
        try {
            localStorage.setItem(cacheName, JSON.stringify(data));
            const currentDate = new Date();
            const cacheDate = new Date(currentDate.getTime() + this.cacheExpirationMinutes);
            localStorage.setItem(this.$cacheExpirationName, cacheDate.getTime().toString());
            return true;
        } catch {
            return false;
        }
    }

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

    static async getUserYearContributions(username: string): Promise<GithubContributionsData | null> {
        if (this.isCacheExpired) {
            const data = await this.fetchUserYearContributions(username);
            if (data) {
                this.storeCache<GithubContributionsData>(this.$contributionsCacheName, data);
                return data;
            }
        }
        return this.loadCache<GithubContributionsData>(this.$contributionsCacheName);
    }

    static async fetchAllUserStargazers(username: string): Promise<GithubStargazersData | null> {
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

    static async getAllUserStargazers(username: string): Promise<GithubStargazersData | null> {
        if (this.isCacheExpired) {
            const data = await this.fetchAllUserStargazers(username);
            if (data) {
                this.storeCache<GithubStargazersData>(this.$stargazersCacheName, data);
                return data;
            }
        }
        return this.loadCache<GithubStargazersData>(this.$stargazersCacheName);
    }
}