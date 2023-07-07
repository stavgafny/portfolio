export interface Contribution { date: string; count: number; level: number }

export interface GithubContributionsData {
    contributions: Contribution[]
    total: number //! Not the same as `contributions.length`
}

export default class GithubApiHandler {
    static async getUserYearContributions(user: string): Promise<GithubContributionsData | null> {
        try {
            const url = `https://github-contributions-api.jogruber.de/v4/${user}?y=last`;

            const response = await fetch(url);

            if (response.status !== 200) return null;

            const data:
                { contributions: GithubContributionsData["contributions"], total: { lastYear: number } }
                = await response.json();

            return { contributions: data.contributions, total: data.total.lastYear };
        } catch (e) {
            return null;
        }
    }
}