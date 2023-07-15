import GraphqlQueries from "../graphql_queries";
import { QueryReturnType } from "../query_api";
import contributionHandler from "./handlers/contributions";
import stargazersHandler from "./handlers/stargazers";


export type EndpointReturnType<T> = {
    data: T
    status: 200
} | {
    data: "An error occurred",
    status: 500
}


interface Endpoint {
    readonly name: string,
    readonly handler: (returnedQuery: QueryReturnType<any>) => EndpointReturnType<any>,
    query: GraphqlQueries
}

const endpoints: Readonly<Record<string, Endpoint>> = {
    contributions: {
        name: "/contributions",
        handler: contributionHandler,
        query: GraphqlQueries.CONTRIBUTIONS
    },
    stargazers: {
        name: "/stargazers",
        handler: stargazersHandler,
        query: GraphqlQueries.STARGAZERS
    },
} as const;

export default endpoints;