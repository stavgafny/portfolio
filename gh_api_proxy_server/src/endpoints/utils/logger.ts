import Endpoint, { EndpointReturnType } from "../endpoint";
import Duration from "./duration";
import { QueryReturnType } from "./query_api";


enum LogSymbols {
    INIT = "@",
    CREATE = "/",
    VISIT = ">",
    QUERY = "$",
}


export default class Logger {
    private static _log = console.log;
    private static _error = console.error;


    /**
    * Logs the server initialization message.
    * @param port The port number on which the server is running.
    */
    static serverInitialized(port: number): void {
        this._log(`[${LogSymbols.INIT}][INIT] Server is running on port ${port}`);
    }

    /**
    * Logs the creation of an endpoint.
    * @param endpoint The created endpoint.
    */
    static createdEndpoint(endpoint: Endpoint<any, any>): void {
        const { name, cacheExpirationAge } = endpoint;
        this._log(`[${LogSymbols.CREATE}][ENDPOINT-CREATE] "${name}" (cache expiration age: ${Duration.format(cacheExpirationAge)})`);
    }

    /**
    * Logs the visit to an endpoint.
    * @param visitedEndpoint The visited endpoint.
    * @param responseStatus The status of the endpoint visit.
    */
    static onEndpointVisit(visitedEndpoint: Endpoint<any, any>, responseStatus: EndpointReturnType<any>["status"]): void {
        const { name, cacheTTL } = visitedEndpoint;
        const logFunction = responseStatus === 200 ? this._log : this._error;
        logFunction(`[${LogSymbols.VISIT}][ENDPOINT-VISIT] "${name}" [${responseStatus}] (cache TTL: ${Duration.format(cacheTTL)})`);
    }

    /**
    * Logs an API query to an endpoint.
    * @param queriedEndpoint The queried endpoint.
    * @param responseStatus The status of the API query.
    * @param isCached Specifies if the response is cached.
    */
    static onEndpointApiQuery(queriedEndpoint: Endpoint<any, any>, responseStatus: QueryReturnType<any>["status"], isCached: boolean): void {
        const { name } = queriedEndpoint;
        const cacheMessage = isCached ? "(recached successfully)" : "(failed to recache)";
        const logFunction = responseStatus === "OK" ? this._log : this._error;

        logFunction(`[${LogSymbols.QUERY}][ENDPOINT-QUERY] "${name}" [${responseStatus}] ${cacheMessage}`);
    }
}