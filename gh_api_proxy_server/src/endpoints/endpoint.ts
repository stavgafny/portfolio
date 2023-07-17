import GraphqlQueries from "./utils/graphql_queries"
import queryApi, { QueryReturnType } from "./utils/query_api"
import Logger from "./utils/logger"


export type EndpointReturnType<T> = {
    data: T
    status: 200
} | {
    data: "An error occurred",
    status: 500
}

export type EndpointCacheType<T> = {
    snapshot: EndpointReturnType<T>,
    timestamp: number
}

/**
 * Q = query data type
 * 
 * E = endpoint data type
 */
/// 
export default class Endpoint<Q, E> {

    readonly name: string;
    readonly query: GraphqlQueries;
    readonly handler: (returnedQuery: QueryReturnType<Q>) => EndpointReturnType<E>;

    readonly cacheExpirationAge: number;
    protected cache: EndpointCacheType<E> | null;

    constructor({ name, query, handler, cacheExpirationAge }: {
        name: string,
        query: GraphqlQueries,
        handler: (returnedQuery: QueryReturnType<Q>) => EndpointReturnType<E>,
        cacheExpirationAge: number
    }) {
        this.name = name;
        this.query = query;
        this.handler = handler;
        this.cacheExpirationAge = cacheExpirationAge;
        this.cache = null;
    }

    private get isCacheValid(): boolean {
        return this.cache !== null && this.cache.timestamp - Date.now() > 0
    }

    private setCache(snapshot: EndpointCacheType<E>["snapshot"]) {
        const timestamp = Date.now() + this.cacheExpirationAge;
        this.cache = { snapshot, timestamp }
    }

    public get cacheTTL(): number {
        if (!this.isCacheValid) return -1;
        return this.cache!.timestamp - Date.now();
    }

    public async get(): Promise<EndpointReturnType<E>> {
        if (this.isCacheValid) {
            return this.cache!.snapshot;
        }
        const returnedQueryData = await queryApi<Q>(this.query);
        const resolvedData = this.handler(returnedQueryData);
        let cached = false;
        if (returnedQueryData.status === "OK" && resolvedData.status === 200) {
            this.setCache(resolvedData);
            cached = true;
        }
        Logger.onEndpointApiQuery(this, returnedQueryData.status, cached);
        return resolvedData;
    }
}