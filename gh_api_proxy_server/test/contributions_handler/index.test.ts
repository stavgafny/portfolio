import contributions_mock from "./contributions_mock";
import contributions_answer from "./contributions_answer";
import endpoints from "../../src/endpoints";
import { QueryReturnType } from "../../src/endpoints/utils/query_api";
import { ContributionQueryType } from "../../src/endpoints/handlers/contributions";

describe("contributions handler", () => {


    test('check handler data equality', () => {
        const queryReturnedData: QueryReturnType<ContributionQueryType> = {
            data: contributions_mock as ContributionQueryType,
            status: "OK"
        }

        const handledData = endpoints.contributions.handler(queryReturnedData).data;

        expect(handledData).toEqual(contributions_answer);
    })
});

