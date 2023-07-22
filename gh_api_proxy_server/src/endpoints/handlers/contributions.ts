import { EndpointReturnType } from "../endpoint";
import { QueryReturnType } from "../utils/query_api";


export interface ContributionQueryType {
    readonly data: {
        readonly viewer: {
            readonly contributionsCollection: {
                readonly contributionCalendar: {
                    readonly totalContributions: number;
                    readonly weeks: {
                        readonly contributionDays: {
                            readonly date: string;
                            readonly contributionCount: number;
                            readonly contributionLevel: ContributionLevel;
                        }[];
                    }[];
                };
            };
        };
    };
}

export interface ContributionEndpointType {
    readonly total: number;
    readonly contributions: {
        readonly date: string;
        readonly count: number;
        readonly level: number;
    }[]
}

export default function contributionHandler({ data, status }: QueryReturnType<ContributionQueryType>): EndpointReturnType<ContributionEndpointType> {
    try {
        if (status === "ERROR") {
            throw null;
        }

        return {
            data: digestData(data),
            status: 200
        }

    } catch {
        return {
            data: "An error occurred",
            status: 500
        }
    }
}

const digestData = (returnedQueryData: ContributionQueryType): ContributionEndpointType => {
    const data = returnedQueryData.data.viewer.contributionsCollection.contributionCalendar;

    return {
        total: data.totalContributions,
        contributions: data.weeks.map(week => week.contributionDays).flat().map(day => {
            return {
                date: day.date,
                count: day.contributionCount,
                level: convertLevelToNumber(day.contributionLevel),
            }
        })
    };
}



type ContributionLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";


const levels: readonly ContributionLevel[] = [
    "NONE",
    "FIRST_QUARTILE",
    "SECOND_QUARTILE",
    "THIRD_QUARTILE",
    "FOURTH_QUARTILE",
] as const;


const convertLevelToNumber = (level: ContributionLevel): number => levels.indexOf(level);

