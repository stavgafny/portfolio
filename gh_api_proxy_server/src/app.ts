import express, { Response } from 'express';
import endpoints, { endpointsInfo } from './endpoints';
import Logger from './endpoints/utils/logger';

const port = 4000;

const app = express();


const _setResHeaders = (res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
}


app.get("/", async (_req, res) => {
    _setResHeaders(res);
    res.status(200).send(JSON.stringify(endpointsInfo, null, 2));
});


for (const endpoint of Object.values(endpoints)) {
    app.get(endpoint.name, async (_req, res) => {
        const { data, status } = await endpoint.get();
        _setResHeaders(res);
        res.status(status).json(data);
        Logger.onEndpointVisit(endpoint, status);
    });
    Logger.createdEndpoint(endpoint);
}


app.listen(port, () => {
    Logger.serverInitialized(port);
});
