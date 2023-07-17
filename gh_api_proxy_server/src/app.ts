import express from 'express';
import endpoints from './endpoints';
import Logger from './endpoints/utils/logger';

const port = 4000;

const app = express();


for (const endpoint of Object.values(endpoints)) {
    app.get(endpoint.name, async (_req, res) => {
        const { data, status } = await endpoint.get();
        res.status(status).json(data);
        Logger.onEndpointVisit(endpoint, status);
    });
    Logger.createdEndpoint(endpoint);
}


app.listen(port, () => {
    Logger.serverInitialized(port);
});
