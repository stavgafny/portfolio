import GraphqlQueries from "./utils/graphql_queries";
import Endpoint from "./endpoint";
import contributionHandler, { ContributionQueryType, ContributionEndpointType } from "./handlers/contributions";
import stargazersHandler, { StargazersQueryType, StargazersEndpointType } from "./handlers/stargazers";
import Duration from "./utils/duration";


type Endpoints = {
    readonly contributions: Endpoint<ContributionQueryType, ContributionEndpointType>;
    readonly stargazers: Endpoint<StargazersQueryType, StargazersEndpointType>;
}



const endpoints: Endpoints = {
    contributions: new Endpoint({
        name: "/contributions",
        query: GraphqlQueries.CONTRIBUTIONS,
        handler: contributionHandler,
        cacheExpirationAge: Duration.toMS({ h: 3 })
    }),
    stargazers: new Endpoint({
        name: "/stargazers",
        query: GraphqlQueries.STARGAZERS,
        handler: stargazersHandler,
        cacheExpirationAge: Duration.toMS({ h: 2 })
    }),
}



export default endpoints;