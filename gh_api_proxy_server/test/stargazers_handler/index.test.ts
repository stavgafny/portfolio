import stargazers_mock from "./stargazers_mock";
import stargazers_answer from "./stargazers_answer";
import { QueryReturnType } from "../../src/query_api";
import { StargazersQueryType } from "../../src/endpoints/handlers/stargazers";
import endpoints from "../../src/endpoints";



describe("stargazers handler", () => {
    test('check handler data equality', () => {
        const queryReturnedData: QueryReturnType<StargazersQueryType> = {
            data: stargazers_mock as StargazersQueryType,
            status: "OK"
        }

        const handledData = endpoints.stargazers.handler(queryReturnedData).data;

        expect(handledData).toEqual(stargazers_answer);
    })
})