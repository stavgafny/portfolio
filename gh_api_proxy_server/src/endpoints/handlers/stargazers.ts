import { EndpointReturnType } from "../endpoint";
import { QueryReturnType } from "../utils/query_api";



export interface StargazersQueryType {
    readonly data: {
        readonly viewer: {
            readonly repositories: {
                readonly edges: {
                    readonly node: {
                        readonly name: string;
                        readonly stargazers: {
                            readonly totalCount: number;
                        };
                    };
                }[];
            };
        };
    };
}

export interface StargazersEndpointType {
    readonly total: number;
    readonly repos: {
        readonly name: string;
        readonly count: number;
    }[];
}



export default function stargazersHandler({ data, status }: QueryReturnType<StargazersQueryType>): EndpointReturnType<StargazersEndpointType> {
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


const digestData = (returnedQueryData: StargazersQueryType): StargazersEndpointType => {
    const data = returnedQueryData.data.viewer.repositories.edges;
    const repos = data.map(({ node }) => {
        return {
            name: node.name,
            count: node.stargazers.totalCount
        }
    });
    const total = repos.reduce((sum, repo) => sum + repo.count, 0);

    return { total, repos };
}